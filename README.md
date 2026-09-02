# scopa-studio

Site vitrine de **SCOPA Studio**, espace de coworking à Villeurbanne (Gratte-Ciel).

En ligne sur <https://studio.scopa.co>

## Stack

React 19 + Vite, sans routeur ni backend — une page unique dont tout le contenu
éditorial vit dans [`src/data.js`](src/data.js).

## Développement

```bash
npm ci
npm run dev      # serveur local
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
```

## Modifier le contenu

Textes, tarifs, services et lieux du quartier : `src/data.js`.
Photos : `public/images/` (référencées par leur nom de fichier dans `data.js`).

## Déploiement

Automatique via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
à chaque push sur `main` : build Vite puis publication sur GitHub Pages.

Le domaine `studio.scopa.co` est configuré via `public/CNAME`.
