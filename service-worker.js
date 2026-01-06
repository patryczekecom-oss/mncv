const CACHE_NAME = 'mobywatel-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/dashboard.html',
  '/generator.html',
  '/id.html',
  '/card.html',
  '/documents.html',
  '/document.html',
  '/assets/app/main.css',
  '/assets/app/id.css',
  '/assets/app/card.css',
  '/assets/app/document.css',
  '/assets/app/bar.js',
  '/assets/app/id.js',
  '/assets/app/card.js',
  '/assets/app/document.js',
  '/assets/pwa-register.js',
  '/assets/install-banner.js',
  '/assets/app/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only handle GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Cache successful basic responses
        if (response && response.status === 200 && response.type === 'basic') {
          const respClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, respClone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/id.html') || caches.match('/index.html');
        }
      });
    })
  );
});
