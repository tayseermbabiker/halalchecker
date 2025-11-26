const CACHE_VERSION = '2.0.0';
const CACHE_NAME = `halaldetect-v${CACHE_VERSION}`;
const STATIC_CACHE = `halaldetect-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `halaldetect-dynamic-v${CACHE_VERSION}`;

// Core resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/css/design-system.css',
    '/css/components.css',
    '/js/common.js',
    '/assets/favicon.svg'
];

// Pages to cache for offline access
const PAGES_TO_CACHE = [
    '/by-age.html',
    '/challenges.html',
    '/islamic-education.html',
    '/prophet-stories.html',
    '/free-resources.html',
    '/about.html',
    '/contact.html'
];

// Resources that can be cached dynamically
const CACHEABLE_DOMAINS = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(STATIC_CACHE).then(cache => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { credentials: 'same-origin' })));
        }).catch(error => {
            console.error('[SW] Failed to cache static assets:', error);
        })
    );

    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        Promise.all([
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET') return;
    if (url.protocol === 'chrome-extension:') return;

    // Handle HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(handlePageRequest(request));
        return;
    }

    // Handle static assets
    if (STATIC_ASSETS.includes(url.pathname)) {
        event.respondWith(handleStaticRequest(request));
        return;
    }

    // Handle other requests
    event.respondWith(handleDynamicRequest(request));
});

// Handle page requests (network first, fallback to cache, then offline page)
async function handlePageRequest(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed for page, trying cache:', request.url);

        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return offline page
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) {
            return offlinePage;
        }

        return new Response(getOfflineFallbackHTML(), {
            headers: { 'Content-Type': 'text/html' }
        });
    }
}

// Handle static asset requests (cache first, fallback to network)
async function handleStaticRequest(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Static request failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Handle dynamic requests (network first, fallback to cache)
async function handleDynamicRequest(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok && CACHEABLE_DOMAINS.some(domain => request.url.includes(domain))) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        return new Response('Offline', { status: 503 });
    }
}

// Offline fallback HTML
function getOfflineFallbackHTML() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - HalalDetect</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Inter', -apple-system, sans-serif;
                background: #FDF8F3;
                color: #5E5240;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            .container {
                max-width: 400px;
                text-align: center;
            }
            .logo {
                font-size: 1.5rem;
                margin-bottom: 2rem;
            }
            .logo-bold { font-weight: 700; color: #218089; }
            .logo-regular { font-weight: 400; color: #5E5240; }
            h1 {
                font-family: 'Poppins', sans-serif;
                color: #1A6873;
                margin-bottom: 1rem;
            }
            p {
                margin-bottom: 1.5rem;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                background: #218089;
                color: white;
                padding: 0.875rem 1.75rem;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 500;
                cursor: pointer;
                border: none;
                font-size: 1rem;
            }
            .btn:hover { background: #1A6873; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <span class="logo-bold">Halal</span><span class="logo-regular">Detect</span>
            </div>
            <h1>You're Offline</h1>
            <p>It looks like you've lost your internet connection. Please check your connection and try again.</p>
            <button class="btn" onclick="window.location.reload()">Try Again</button>
        </div>
    </body>
    </html>
    `;
}

// Handle push notifications
self.addEventListener('push', event => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/favicon.svg',
        badge: '/assets/favicon.svg',
        tag: 'halaldetect-notification',
        renotify: true
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'HalalDetect', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

// Notify clients about updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[SW] HalalDetect service worker loaded');
