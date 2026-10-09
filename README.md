# site-cours

Site élèves de Stanis Humez ([cours.siovision.fr](https://cours.siovision.fr)), construit avec
[Starlight](https://starlight.astro.build).

## Contrat avec le dépôt des cours

Le contenu n'est **pas** écrit ici. Le dépôt privé des cours l'exporte (`outils/site export`) et le
pousse à chaque modification. Seuls les supports marqués `publie: true` sont exportés.

| Chemin | Rôle | Écrit par |
|---|---|---|
| `contenu/manifeste.json` | supports, séquences, dates, natures, titres de section | export |
| `contenu/pages/*.html` | corps HTML de chaque support (`/` du chemin remplacé par `--`) | export |
| `public/<matiere>/` | PDF, pièces jointes, pages HTML autonomes | export |
| `src/` | pages, barre latérale, thème, script des QCM | ce dépôt |

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
