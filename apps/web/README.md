# OHINO-S Web App

This app boots the OHINO-S core and mounts the modular system as a PWA-capable web app.

Run in development:

  cd apps/web
  npm install
  npm run dev

Or from repo root (if you use a workspace-aware package manager):

  npm install
  npm run dev

Service Worker
- A minimal runtime service worker is available at /sw.js (apps/web/public/sw.js). It uses a network-first strategy for navigations and caches navigational assets for offline fallback.

Packaging
- Use `npm run build` to produce a production build (Vite). The output resides in dist/ and can be served as static files.
