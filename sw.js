const CACHE_NAME = 'chess-v2'; // CAMBIADO A V2
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/client.js',
    '/puzzles_data.js',
    '/stockfish.js'
];

self.addEventListener('install', (e) => {
    // Forzar que el nuevo SW tome el control inmediatamente
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    // Borrar versiones antiguas de la caché
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => {
                if (k !== CACHE_NAME) return caches.delete(k);
            })
        ))
    );
});

self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);
    // SI LA RUTA ES LA SECRETA, NO USAR CACHÉ, IR DIRECTO A INTERNET
    if (url.pathname.includes('ver-mis-correos-ya') || url.pathname.includes('secret')) {
        return;
    }

    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
