const CACHE_NAME = 'minha-liturgia-v90';
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
  './viasacra.js',
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
  './icons/home/via-sacra.png',
  './icons/home/hora-santa.png',
  './icons/home/santo-do-dia.png',
  './icons/home/oracoes-diversas.png',
  './icons/home/quaresma-sao-miguel.png',
  './icons/home/preciosas-promessas.png',
  './icons/home/catecismo.png',
  './icons/home/santa-se.png',
  './icons/home/liturgia-das-horas.png',
];

// Todos os áudios de orações e mistérios ficam disponíveis offline desde a
// primeira visita — sem isso, a narração guiada (Terço, Via Sacra) para no
// meio quando a internet cai antes de um áudio específico ter sido tocado
// (e cacheado) pelo menos uma vez. Ver cache-first no fetch handler abaixo.
const AUDIO_SHELL = [
  './audio/misterios/dezena-1.mp3',
  './audio/misterios/dezena-2.mp3',
  './audio/misterios/dezena-3.mp3',
  './audio/misterios/dezena-4.mp3',
  './audio/misterios/dezena-5.mp3',
  './audio/misterios/dolorosos-1.mp3',
  './audio/misterios/dolorosos-2.mp3',
  './audio/misterios/dolorosos-3.mp3',
  './audio/misterios/dolorosos-4.mp3',
  './audio/misterios/dolorosos-5.mp3',
  './audio/misterios/gloriosos-1.mp3',
  './audio/misterios/gloriosos-2.mp3',
  './audio/misterios/gloriosos-3.mp3',
  './audio/misterios/gloriosos-4.mp3',
  './audio/misterios/gloriosos-5.mp3',
  './audio/misterios/gozosos-1.mp3',
  './audio/misterios/gozosos-2.mp3',
  './audio/misterios/gozosos-3.mp3',
  './audio/misterios/gozosos-4.mp3',
  './audio/misterios/gozosos-5.mp3',
  './audio/misterios/libertacao-1.mp3',
  './audio/misterios/libertacao-2.mp3',
  './audio/misterios/libertacao-3.mp3',
  './audio/misterios/libertacao-4.mp3',
  './audio/misterios/libertacao-5.mp3',
  './audio/misterios/luminosos-1.mp3',
  './audio/misterios/luminosos-2.mp3',
  './audio/misterios/luminosos-3.mp3',
  './audio/misterios/luminosos-4.mp3',
  './audio/misterios/luminosos-5.mp3',
  './audio/misterios/sao-miguel-coro-1.mp3',
  './audio/misterios/sao-miguel-coro-2.mp3',
  './audio/misterios/sao-miguel-coro-3.mp3',
  './audio/misterios/sao-miguel-coro-4.mp3',
  './audio/misterios/sao-miguel-coro-5.mp3',
  './audio/misterios/sao-miguel-coro-6.mp3',
  './audio/misterios/sao-miguel-coro-7.mp3',
  './audio/misterios/sao-miguel-coro-8.mp3',
  './audio/misterios/sao-miguel-coro-9.mp3',
  './audio/notas/abertura-tres-ave-marias.mp3',
  './audio/notas/chagas-oracao-final.mp3',
  './audio/notas/fechamento-versiculo.mp3',
  './audio/notas/intro-chagas.mp3',
  './audio/notas/intro-dolorosos.mp3',
  './audio/notas/intro-gloriosos.mp3',
  './audio/notas/intro-gozosos.mp3',
  './audio/notas/intro-libertacao.mp3',
  './audio/notas/intro-luminosos.mp3',
  './audio/notas/intro-rosario-completo.mp3',
  './audio/notas/intro-sao-miguel.mp3',
  './audio/notas/intro-terco-misericordia.mp3',
  './audio/notas/nome-dolorosos.mp3',
  './audio/notas/nome-gloriosos.mp3',
  './audio/notas/nome-gozosos.mp3',
  './audio/notas/nome-luminosos.mp3',
  './audio/notas/sao-miguel-quatro-arcanjos.mp3',
  './audio/oracoes/acao-de-gracas.mp3',
  './audio/oracoes/ave-maria.mp3',
  './audio/oracoes/confio-em-vos.mp3',
  './audio/oracoes/credo.mp3',
  './audio/oracoes/fatima.mp3',
  './audio/oracoes/gloria.mp3',
  './audio/oracoes/oferecimento.mp3',
  './audio/oracoes/oferta-chagas.mp3',
  './audio/oracoes/oferta-misericordia.mp3',
  './audio/oracoes/oracao-final-rosario.mp3',
  './audio/oracoes/oracao-sao-miguel.mp3',
  './audio/oracoes/pai-nosso.mp3',
  './audio/oracoes/pedido-chagas.mp3',
  './audio/oracoes/pedido-misericordia.mp3',
  './audio/oracoes/salve-rainha.mp3',
  './audio/oracoes/santo-imortal.mp3',
  './audio/oracoes/sinal-da-cruz.mp3',
  './audio/oracoesdiversas/a-santo-antonio-contra-o-mal.mp3',
  './audio/oracoesdiversas/alma-de-cristo.mp3',
  './audio/oracoesdiversas/antes-de-sair-de-casa.mp3',
  './audio/oracoesdiversas/ato-de-contricao.mp3',
  './audio/oracoesdiversas/consagracao-diaria-a-nossa-senhora.mp3',
  './audio/oracoesdiversas/oracao-a-sao-miguel-arcanjo.mp3',
  './audio/oracoesdiversas/oracao-de-sao-bento.mp3',
  './audio/oracoesdiversas/oracao-de-sao-francisco-de-assis.mp3',
  './audio/oracoesdiversas/pequeno-exorcismo-de-santo-antonio.mp3',
  './audio/oracoesdiversas/suplica-de-libertacao.mp3',
  './audio/oracoesdiversas/para-caminhar-na-luz.mp3',
  './audio/oracoesdiversas/para-pedir-animo.mp3',
  './audio/oracoesdiversas/pela-bencao-da-familia.mp3',
  './audio/oracoesdiversas/por-trabalho-e-sustento.mp3',
  './audio/oracoesdiversas/de-consagracao-da-familia-a-jesus-e-maria.mp3',
];

// Conteúdo grande e praticamente estático: cache-first para não baixar de novo a cada visita.
const CACHE_FIRST_HOSTS = ['raw.githubusercontent.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).then(() =>
        // Cacheia os áudios um a um e tolera falhas individuais (rede
        // instável durante a instalação não deve derrubar o app inteiro) —
        // por isso não usa addAll aqui, que é tudo-ou-nada.
        Promise.allSettled(AUDIO_SHELL.map((url) => cache.add(url)))
      )
    )
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
    // App shell, áudios e Bíblia (texto estático grande): cache-first
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
