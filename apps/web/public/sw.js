// Minimal runtime service worker skeleton for OHINO-S PWA
// This is intentionally small; add precaching and Workbox integration later.

const CACHE_NAME = 'ohino-runtime-cache-v1';
const RUNTIME_URLS = [ '/', '/index.html' ];

self.addEventListener('install', (event) => {
  // skipWaiting to activate faster during development; adjust for production
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(RUNTIME_URLS).catch(() => {});
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // simple network-first for navigation and API requests, fallback to cache
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // For other requests, try cache then network
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
