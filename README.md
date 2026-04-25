# E-Commerce Website

React + TypeScript + Vite storefront app.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This project is configured for repository pages at:

- https://aniruddha-25.github.io/E-Commerce-Website/

Deployment command:

```bash
npm run deploy
```

What this does:

- builds with the Vite base path `/E-Commerce-Website/`
- generates `dist/404.html` for SPA deep-link support on GitHub Pages
- publishes `dist` to the `gh-pages` branch

## Font Awesome

Font Awesome is loaded from npm (node modules), not CDN:

- package: `@fortawesome/fontawesome-free`
- stylesheet import: `@fortawesome/fontawesome-free/css/all.min.css` in `src/main.tsx`
