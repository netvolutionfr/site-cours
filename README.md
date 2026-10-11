# site-cours

Site élèves de Stanis Humez ([cours.siovision.fr](https://cours.siovision.fr)), construit avec
[Starlight](https://starlight.astro.build).

## Contrat avec le dépôt des cours

Les sources pédagogiques sont rédigées dans le dépôt Prof. Les activités web natives sont implémentées dans `src/` ici. Le dépôt privé des cours l'exporte (`outils/site export`) et le
pousse à chaque modification. Seuls les supports marqués `publie: true` sont exportés.

| Chemin | Rôle | Écrit par |
|---|---|---|
| `contenu/manifeste.json` | supports, séquences, dates, natures, titres de section | export |
| `contenu/pages/*.html` | corps HTML de chaque support (`/` du chemin remplacé par `--`) | export |
| `public/<matiere>/` | PDF, pièces jointes, anciens HTML autonomes en compatibilité | export |
| `src/` | pages et activités Astro, barre latérale, thème, scripts clients | ce dépôt |

Ne jamais modifier `contenu/` ni `public/<matiere>/` à la main : le prochain export les remplace.

## Développement

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

Les URL reprennent celles de l'ancien site (`/sio/1sio-bloc1/SQ03-P03-dom.html`, `/sio/1sio/`) :
les liens relatifs entre supports et les favoris des élèves restent valides.

## Déploiement

`.github/workflows/deploy.yml` construit le site et le synchronise par rsync. Secrets nécessaires :
`DEPLOY_SSH_KEY` et `DEPLOY_KNOWN_HOSTS`. Sans eux, la CI construit sans déployer.


## Publication — règle permanente

Tout nouveau contenu web est intégré nativement dans ce projet Astro/Starlight.
Ne plus générer de pages HTML autonomes pour la mise en ligne ni ajouter de nouvelles
activités en iframe. Les anciens supports restent compatibles jusqu'à leur migration.
Les sources pédagogiques, métadonnées, PDF et fichiers élèves restent dans
`/Users/stanis/Sites/Prof` ; son export ne doit pas écraser les composants de `src/`.
Une activité native porte `composant:` dans les métadonnées de Prof et utilise un
composant Astro dans `src/components/`, avec le thème et la navigation Starlight.
Le binaire du 12/10 utilise `Binaire.astro` et `/nsi/1g/SQ01-tp-binaire.html`.

Les supports textuels natifs utilisent `composant: Markdown` : l’export copie leur source dans `contenu/pages/*.md`, compilée par Astro et rendue dans Starlight avec ses ancres et son sommaire. Aucun HTML brut ni iframe pour un nouveau support.
