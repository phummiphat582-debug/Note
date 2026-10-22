// Force unregister and wipe all caches
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll())
      .then(clients => {
        clients.forEach(client => {
          client.navigate(client.url);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request, { cache: 'no-store' }));
});
