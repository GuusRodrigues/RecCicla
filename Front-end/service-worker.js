// Nome do cache
const CACHE_NAME = 'v1_cache';

// Arquivos a serem armazenados no cache
const urlsToCache = [
  '/',
  '/Front-end/index.html',
  '/Front-end/cadastro.html',
  '/Front-end/contatos.html',
  '/Front-end/styles.css',
  '/Front-end/script.js',
  '/Front-end/manifest.json',
  '/Front-end/icons/rec.png',
  '/Front-end/IMG/Imagem de fundo.jpeg',
  '/Front-end/IMG/rec.png',
  '/Front-end/home.html',

];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação de requisições e fornecimento de recursos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache
        }
        return fetch(event.request); // Faz a requisição para a rede
      })
  );
});

// Atualização do Service Worker e remoção de caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
