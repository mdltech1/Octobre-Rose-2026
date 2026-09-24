# Octobre Rose Sénégal 2026

> S'informer. Se sensibiliser. Agir.

Plateforme digitale indépendante de sensibilisation au cancer du sein au Sénégal.
Initiative bénévole de **Mame Diarra**, développeuse Web Full-Stack freelance, fondatrice de [MdlTech](https://www.mdltech.site/).

Cette plateforme n'est pas un service médical : elle ne pose pas de diagnostic, n'interprète pas de symptômes et ne remplace pas un professionnel de santé. Elle n'est pas le site officiel de la LISCA, du Ministère de la Santé ou d'une autre organisation.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
npm run lint
npm run typecheck
```

Node.js 18.18 ou plus récent (20+ recommandé).

## Déployer sur Vercel

1. Importer le dépôt dans Vercel (framework détecté : Next.js, aucune configuration).
2. Variable d'environnement facultative : `NEXT_PUBLIC_SITE_URL` (ex. `https://octobre-rose-2026.vercel.app` ou votre domaine). Elle sert aux URL canoniques, au sitemap, à robots.txt et à l'Open Graph.

## Stack

- Next.js 15 (App Router, composants serveur par défaut), TypeScript strict
- Tailwind CSS v4 (jetons de couleur en variables CSS, mode clair et sombre)
- Icônes : `@phosphor-icons/react`
- Polices auto-hébergées via `next/font/local` (Bricolage Grotesque, Instrument Sans) : aucun appel à un service de polices externe

## Architecture

```
app/                 routes (App Router)
  page.tsx           accueil
  comprendre/        fiches pédagogiques + FAQ (JSON-LD FAQPage)
  depistage/         informations générales sur le dépistage
  videos/            bibliothèque vidéo (filtres + recherche synchronisés avec l'URL)
  ressources/        organismes et contacts vérifiés (filtre + recherche)
  evenements/        événements documentés (état vide si aucun)
  sources/           sources et méthode de vérification
  a-propos/          l'initiative
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon.tsx
components/          composants réutilisables (Header, Footer, Hero, VideoCard, VideoPlayer, ...)
data/                contenus locaux typés (videos, articles, resources, events, sources, guides)
lib/                 accès aux contenus, SEO, formatage, configuration du site
types/content.ts     modèle de données (Video, Article, Resource, Event, Source)
```

### Brancher une API ou un CMS plus tard

Les pages ne lisent jamais `/data` directement : elles passent par `lib/content.ts`
(`getVideos`, `getArticles`, `getResources`, `getEvents`, `getSources`...), déjà asynchrones.
Il suffit de remplacer l'implémentation de ces fonctions par des appels API en conservant les types de `types/content.ts`.

## Fonctionnalités

- **Orienteur « Où s'adresser, où s'informer »** (`components/ResourceGuide.tsx`, données dans `data/guides.ts`) : la personne choisit son besoin, le panneau affiche l'organisme compétent avec des actions directes (appeler, site web, voir sur la carte) et la source des coordonnées. Onglets accessibles au clavier. Présent sur l'accueil et sur /ressources.
- **Modes d'accès interactifs** (`components/AccessModes.tsx`) : Lire, Écouter (lecture vocale avec égaliseur animé), Regarder (lecteur vidéo), Vérifier (sources).
- **Rubrique wolof** (`components/WolofSection.tsx`) : affiche les vidéos publiées, ou l'état réel du référencement (repérées, en vérification, publiées), calculé depuis les données.
- **Vidéos** : lecteur en façade (miniature d'abord, iframe `youtube-nocookie` chargée seulement au clic), aucune vidéo téléchargée ni réhébergée. Filtres Toutes / Wolof / Français / Prévention / Dépistage / Comprendre / Sensibilisation, recherche plein texte, compteurs, URL partageables (`/videos?language=wo&category=depistage&q=lisca`).
- **Écouter** : chaque fiche de `/comprendre` peut être lue à voix haute par la synthèse vocale de l'appareil (Web Speech API, en français, rien n'est envoyé à un serveur). Le bouton n'apparaît que si l'appareil le permet.
- **Partage** : WhatsApp (`wa.me`), Facebook, LinkedIn, copie du lien (avec repli pour anciens navigateurs), partage natif sur mobile.
- **États** : chargement (squelettes), vide (vidéos wolof, filtres, événements 2026, ressources), erreur (`app/error.tsx`), 404, publié/vérifié.
- **SEO** : metadata par page (title, description, canonical, Open Graph, Twitter), image OG générée, sitemap, robots.txt, JSON-LD (WebSite, FAQPage).
- **Accessibilité** : HTML sémantique, lien d'évitement, focus visibles, navigation clavier, menu mobile (Échap, focus, verrouillage du défilement), `aria-pressed` sur les filtres, `aria-live` sur les résultats, langue affichée sur chaque vidéo, respect de `prefers-reduced-motion`.

## Règles éditoriales (à respecter pour toute contribution)

1. **Rien d'inventé** : ni chiffre, ni médecin, ni hôpital, ni numéro, ni événement, ni vidéo, ni témoignage, ni partenariat.
2. Chaque information médicale ou chiffrée référence une entrée de `data/sources.ts`.
3. Une vidéo n'est publiée (`status: "published"`) que si son auteur est identifiable. Sinon `status: "review"` : elle n'est pas affichée, mais comptée comme « en cours de vérification ».
4. Une ressource n'affiche que les champs publiés par sa `sourceUrl`. Un champ inconnu reste vide.
5. Les fiches portent `medicalReview: "pending"` tant qu'un professionnel de santé ne les a pas relues.

### Ajouter une vidéo

Dans `data/videos.ts`, ajouter une entrée avec `yt("video-00X", "<ID YouTube>", { ... })`.
Vérifier l'existence et la chaîne : `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`.

### Ajouter un événement

Dans `data/events.ts`, avec la date ISO, l'organisateur et l'URL de l'annonce officielle. Les événements passés basculent automatiquement dans « Éditions passées » (régénération quotidienne).

## État des contenus au 24 septembre 2026

- 4 vidéos publiées (INCa, APA News, Dakaractu TV, Actu Chrono TV), toutes vérifiées via oEmbed. La langue parlée des 3 reportages est indiquée « à confirmer » tant qu'elle n'a pas été vérifiée au visionnage.
- 1 vidéo en wolof en attente (auteur à identifier) : la rubrique « Comprendre en wolof » affiche l'état vide prévu.
- Événement 2026 : randonnée de lancement de la LISCA, dimanche 27 septembre 2026, Place de la Nation (ex-Obélisque), à partir de 7h30 (affiche officielle de la LISCA publiée sur LinkedIn).
- Fiches rédigées à partir de l'aide-mémoire OMS (3 juillet 2026) et de la fiche GLOBOCAN 2024 du CIRC. Relecture médicale : à faire.
- Coordonnées de la LISCA issues de l'annuaire de l'UICC (le site lisca.sn n'était pas accessible lors de la vérification) : à confirmer auprès de la LISCA.
# Octobre-Rose-2026
