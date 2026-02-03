const CACHE_NAME = 'chess-pro-v3-neon-ui-fix';
const ASSETS = [
    './',
    './index.html',
    './auth.js',
    './client.js',
    './server.js',
    './style.css',
    './auth_styles.css',
    './components.css',
    './mobile-nav.css',
    './board_stability.css',
    './mobile_tabs.css',
    './academy.css',
    './puzzles_data.js',
    './openings_enhanced.js',
    './knowledge_base.js',
    'https://code.jquery.com/jquery-3.7.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.0/stockfish.js'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
