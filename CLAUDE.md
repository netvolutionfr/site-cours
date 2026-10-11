## Projet

Site élèves Starlight. `contenu/` et `public/<matiere>/` sont générés par le dépôt des cours
(`outils/site export`) : ne jamais les éditer ici. Contrat et déploiement : `README.md`.
Textes de l'interface en français.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


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
