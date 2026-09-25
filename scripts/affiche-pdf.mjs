/**
 * Génère public/affiche-octobre-rose-2026.pdf à partir de la page /affiche,
 * avec Chrome ou Edge en mode sans interface (aucune dépendance à installer).
 *
 * Usage (le site doit tourner, de préférence en production) :
 *   npm run build && npm run start      # dans un premier terminal
 *   npm run affiche:pdf                 # dans un second terminal
 *   npm run affiche:pdf -- http://localhost:3001/affiche   # autre adresse
 *
 * Navigateur : détecté automatiquement, ou imposé avec la variable CHROME_PATH.
 * À relancer chaque fois que le contenu de l'affiche change (fiches, LISCA, adresse du site).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const url = process.argv[2] ?? "http://localhost:3000/affiche";
const out = resolve("public/affiche-octobre-rose-2026.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/microsoft-edge",
].filter(Boolean);
const browser = candidates.find((path) => existsSync(path));
if (!browser) {
  console.error("Aucun navigateur Chrome ou Edge trouvé. Indiquez son chemin dans la variable CHROME_PATH.");
  process.exit(1);
}

// Le site doit répondre avant l'impression
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
} catch (error) {
  console.error(`La page ${url} ne répond pas (${error.message}). Lancez le site d'abord : npm run build && npm run start`);
  process.exit(1);
}

const before = existsSync(out) ? statSync(out).mtimeMs : 0;
// Profil temporaire : ne touche pas au profil personnel du navigateur
const profile = mkdtempSync(join(tmpdir(), "affiche-pdf-"));
const result = spawnSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--user-data-dir=${profile}`,
    "--no-pdf-header-footer",
    // Laisse le temps aux polices de se charger avant l'impression
    "--virtual-time-budget=8000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: "ignore", timeout: 60_000 },
);
rmSync(profile, { recursive: true, force: true });

if (result.error || !existsSync(out) || statSync(out).mtimeMs === before) {
  console.error("La génération du PDF a échoué.", result.error ?? "");
  process.exit(1);
}
console.log(`PDF généré : ${out} (${Math.round(statSync(out).size / 1024)} Ko), depuis ${url}`);
