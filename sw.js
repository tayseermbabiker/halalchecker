const CACHE_VERSION = '1.0.1'; // Increment this for updates
const CACHE_NAME = `halalchecker-v${CACHE_VERSION}`;
const STATIC_CACHE = `halalchecker-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `halalchecker-dynamic-v${CACHE_VERSION}`;

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Resources that can be cached dynamically
const CACHEABLE_DOMAINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'api.openai.com'
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
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
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
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip caching for non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip caching for Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle API requests specially
  if (url.hostname === 'api.openai.com') {
    event.respondWith(handleAPIRequest(request));
    return;
  }
  
  // Handle static assets
  if (STATIC_ASSETS.includes(url.pathname) || url.pathname === '/') {
    event.respondWith(handleStaticRequest(request));
    return;
  }
  
  // Handle other requests
  event.respondWith(handleDynamicRequest(request));
});

// Handle static asset requests (network first for main HTML, then cache)
async function handleStaticRequest(request) {
  try {
    // For the main HTML file, try network first to get updates
    if (request.url.includes('index.html') || request.url.endsWith('/')) {
      try {
        console.log('[SW] Checking for updates:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
          const cache = await caches.open(STATIC_CACHE);
          cache.put(request, networkResponse.clone());
          
          // Notify clients about the update
          notifyClientsOfUpdate();
          
          return networkResponse;
        }
      } catch (networkError) {
        console.log('[SW] Network failed, falling back to cache');
      }
    }
    
    // For other assets or if network fails, use cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
    
    console.log('[SW] Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Static request failed:', error);
    
    // Return offline fallback for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
      return new Response(
        getOfflineFallbackHTML(),
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Handle dynamic requests (network first, fallback to cache)
async function handleDynamicRequest(request) {
  try {
    console.log('[SW] Dynamic request:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses from cacheable domains
    if (networkResponse.ok && CACHEABLE_DOMAINS.some(domain => request.url.includes(domain))) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Handle API requests (network only with error handling)
async function handleAPIRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.error('[SW] API request failed:', error);
    
    // Return structured error response for API failures
    return new Response(
      JSON.stringify({
        error: 'Network error',
        message: 'Unable to connect to the service. Please check your internet connection.',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
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
        <title>HalalChecker - Offline</title>
        <style>
            body {
                font-family: 'Segoe UI', sans-serif;
                text-align: center;
                padding: 2rem;
                background: #f5f5f5;
                color: #333;
            }
            .offline-container {
                max-width: 400px;
                margin: 0 auto;
                background: white;
                padding: 2rem;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .offline-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .retry-btn {
                background: #2E7D32;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                cursor: pointer;
                margin-top: 1rem;
                font-size: 1rem;
            }
            .retry-btn:hover {
                background: #1B5E20;
            }
        </style>
    </head>
    <body>
        <div class="offline-container">
            <div class="offline-icon">🕌</div>
            <h1>HalalChecker</h1>
            <h2>You're Offline</h2>
            <p>Please check your internet connection and try again.</p>
            <p>Some features may be available offline including previously scanned ingredients.</p>
            <button class="retry-btn" onclick="window.location.reload()">Retry</button>
        </div>
    </body>
    </html>
  `;
}

// Handle push notifications (future feature)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: 'halalchecker-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'HalalChecker', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync for failed API requests (future feature)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync logic
      console.log('[SW] Background sync triggered')
    );
  }
});

// Periodic background sync (future feature)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-ingredient-database') {
    event.waitUntil(
      // Update local ingredient database
      console.log('[SW] Periodic sync: updating ingredient database')
    );
  }
});

// Notify clients about updates
function notifyClientsOfUpdate() {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'UPDATE_AVAILABLE',
        message: 'New version available! Reload to get the latest features.'
      });
    });
  });
}

console.log('[SW] Service worker loaded successfully');