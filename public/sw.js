/**
 * Service worker : consultation hors connexion.
 *
 * - Pages : réseau d'abord (contenu à jour), copie enregistrée si le réseau échoue
 *   ou ne répond pas dans le délai (réseaux lents), sinon page « Hors ligne ».
 * - Fichiers /_next/static (noms versionnés, immuables) : cache d'abord.
 * - À l'installation : HTML des pages principales, avec leurs CSS, polices et scripts
 *   (le socle JavaScript commun est déjà dans le cache du navigateur après la première visite ;
 *   seuls les petits scripts propres à chaque page sont téléchargés).
 *   Rien n'est pré-téléchargé en mode « économie de données ».
 *
 * - Une page servie depuis le cache reçoit <meta name="offline-copy" content="date d'enregistrement"> :
 *   components/OfflineBanner.tsx affiche alors un bandeau « version enregistrée ».
 *
 * PAGES doit rester aligné sur mainNav (lib/site.ts).
 * Changer VERSION vide les anciens caches à la prochaine visite.
 */
const VERSION = "v1";
const PAGES_CACHE = `pages-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const OFFLINE_URL = "/hors-ligne";
const PAGES = [
  "/",
  "/comprendre",
  "/depistage",
  "/videos",
  "/ressources",
  "/evenements",
  "/sources",
  "/a-propos",
];
const NETWORK_TIMEOUT_MS = 5000;
const STATIC_MAX_ENTRIES = 120;

/** Fichiers /_next/static (CSS, polices, scripts) référencés par une page HTML ou une feuille CSS. */
function extractAssets(text) {
  // Le backslash exclu évite de capturer les guillemets échappés (\") des données RSC incluses dans le HTML
  const matches = text.match(/\/_next\/static\/[^"'\s)\\]+\.(?:css|woff2|js)/g) || [];
  return [...new Set(matches)];
}

/** Copie de la réponse, datée de son enregistrement (en-tête x-saved-at). */
async function stampSavedAt(response) {
  const headers = new Headers(response.headers);
  headers.set("x-saved-at", new Date().toISOString());
  return new Response(await response.blob(), { status: response.status, statusText: response.statusText, headers });
}

/** Page enregistrée, marquée pour que le site affiche le bandeau « version enregistrée ». */
async function markAsOfflineCopy(cached) {
  const savedAt = (cached.headers.get("x-saved-at") || "").replace(/[^0-9TZ:.\-]/g, "");
  const html = (await cached.text()).replace("</head>", `<meta name="offline-copy" content="${savedAt}"></head>`);
  const headers = new Headers(cached.headers);
  headers.delete("content-length");
  return new Response(html, { status: cached.status, statusText: cached.statusText, headers });
}

/** Enregistre un fichier statique ; pour une feuille CSS, enregistre aussi les polices qu'elle déclare. */
async function cacheAsset(staticCache, asset) {
  if (await staticCache.match(asset)) return;
  // force-cache : réutilise le cache HTTP du navigateur (fichiers déjà téléchargés), sans réseau
  const response = await fetch(asset, { cache: "force-cache" });
  if (!response.ok) return;
  if (asset.endsWith(".css")) {
    const css = await response.clone().text();
    await Promise.allSettled(extractAssets(css).map((font) => cacheAsset(staticCache, font)));
  }
  await staticCache.put(asset, response);
}

async function cachePage(url, { skipIfCached = false } = {}) {
  const pagesCache = await caches.open(PAGES_CACHE);
  // Lors d'une mise à jour du service worker, inutile de retélécharger une page déjà enregistrée
  if (skipIfCached && (await pagesCache.match(url))) return;
  const response = await fetch(url, { cache: "no-cache", credentials: "same-origin" });
  if (!response.ok) throw new Error(`${url} : ${response.status}`);
  const html = await response.clone().text();
  await pagesCache.put(url, await stampSavedAt(response));
  const staticCache = await caches.open(STATIC_CACHE);
  await Promise.allSettled(extractAssets(html).map((asset) => cacheAsset(staticCache, asset)));
}

self.addEventListener("install", (event) => {
  const saveData = Boolean(self.navigator.connection && self.navigator.connection.saveData);
  event.waitUntil(
    (async () => {
      // La page hors ligne est indispensable : son échec fait échouer l'installation
      await cachePage(OFFLINE_URL);
      if (!saveData) await Promise.allSettled(PAGES.map((url) => cachePage(url, { skipIfCached: true })));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [PAGES_CACHE, STATIC_CACHE];
      const names = await caches.keys();
      await Promise.all(names.filter((name) => !keep.includes(name)).map((name) => caches.delete(name)));
      await self.clients.claim();
    })(),
  );
});

/** Limite la taille du cache statique (les plus anciennes entrées partent en premier). */
async function trimStaticCache() {
  const cache = await caches.open(STATIC_CACHE);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - STATIC_MAX_ENTRIES)).map((key) => cache.delete(key)));
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function handleNavigation(event) {
  const { request } = event;
  const cache = await caches.open(PAGES_CACHE);
  // no-cache : toujours revalider auprès du serveur (304 si inchangée). Sinon le cache HTTP du
  // navigateur peut servir une ancienne page (stale-while-revalidate des pages régénérées),
  // y compris hors connexion, sans que le bandeau « version enregistrée » s'affiche.
  // redirect: "manual" : une redirection est rendue telle quelle à la navigation.
  const network = fetch(request.url, { cache: "no-cache", credentials: "same-origin", redirect: "manual" }).then(async (response) => {
    // Enregistre la dernière version de la page (sans les paramètres, une copie par page)
    if (response.ok) {
      const url = new URL(request.url);
      await cache.put(url.pathname, await stampSavedAt(response.clone()));
    }
    return response;
  });
  // Même si la copie est servie (délai dépassé), la réponse réseau met le cache à jour
  event.waitUntil(network.catch(() => undefined));

  try {
    return await withTimeout(network, NETWORK_TIMEOUT_MS);
  } catch {
    const url = new URL(request.url);
    const cached = (await cache.match(url.pathname)) || (await cache.match(request, { ignoreSearch: true }));
    if (cached) return markAsOfflineCopy(cached);
    // Pas de copie : on attend encore le réseau s'il n'a pas échoué, sinon page hors ligne
    try {
      return await network;
    } catch {
      return (await cache.match(OFFLINE_URL)) || Response.error();
    }
  }
}

async function handleStatic(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    trimStaticCache();
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  // Autres domaines (YouTube, sources) et mesure d'audience : non gérés
  if (url.origin !== self.location.origin || url.pathname.startsWith("/_vercel/")) return;
  // Navigation interne de Next.js (données RSC) : réseau uniquement. Hors connexion,
  // Next.js recharge la page entière, qui est alors servie depuis le cache.
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleStatic(request));
  }
});
