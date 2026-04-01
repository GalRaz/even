const CACHE_NAME = 'halfsies-v1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/firebase-config.js',
  './js/exchange.js',
  './js/balance.js',
  './js/notifications.js',
  './js/duel.js',
  './js/recurring.js',
  './js/games/coin-flip.js',
  './js/games/wheel.js',
  './js/games/rps.js',
  './js/games/lucky-number.js',
  './js/games/scratch-card.js',
  './manifest.json',
  './assets/icons/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('firestore.googleapis.com') ||
      e.request.url.includes('frankfurter.app') ||
      e.request.url.includes('open.er-api.com') ||
      e.request.url.includes('googleapis.com/identitytoolkit') ||
      e.request.url.includes('gstatic.com/firebasejs') ||
      e.request.url.includes('cdn.jsdelivr.net') ||
      e.request.url.includes('api.emailjs.com')) {
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (e.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
