const CACHE_NAME = 'minha-liturgia-v62';
const APP_SHELL = [
  './',
  './index.html',
  './privacidade.html',
  './styles.css',
  './app.js',
  './narration.js',
  './bible.js',
  './eucharist.js',
  './catechism.js',
  './horasanta.js',
  './rosario.js',
  './santos.js',
  './homilia.js',
  './santase.js',
  './oracoesdiversas.js',
  './saomiguel.js',
  './liturgiadashoras.js',
  './promessas.js',
  './favoritos.js',
  './lembretes.js',
  './pdf.js',
  './manifest.json',
  './icons/icon-32.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/home/liturgia-do-dia.png',
  './icons/home/biblia-sagrada.png',
  './icons/home/oracoes-eucaristicas.png',
  './icons/home/santo-terco.png',
  './icons/home/hora-santa.png',
  './icons/home/santo-do-dia.png',
  './icons/home/oracoes-diversas.png',
  './icons/home/quaresma-sao-miguel.png',
  './icons/home/preciosas-promessas.png',
  './icons/home/catecismo.png',
  './icons/home/santa-se.png',
  './icons/home/liturgia-das-horas.png',
];

// Conteúdo grande e praticamente estático: cache-first para não baixar de novo a cada visita.
const CACHE_FIRST_HOSTS = ['raw.githubusercontent.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin || CACHE_FIRST_HOSTS.includes(url.hostname)) {
    // App shell e Bíblia (texto estático grande): cache-first
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        });
      })
    );
    return;
  }

  // Dados da liturgia (API externa): network-first, cai para cache se offline
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
