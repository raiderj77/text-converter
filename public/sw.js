// FlipMyCase Service Worker v1
// Cache-first for static assets, network-first for pages

const CACHE_NAME = "fmc-v1";

// Core assets to precache on install
const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.png",
  "/apple-touch-icon.png",
];

// Install: precache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip external requests (analytics, CDNs we don't control)
  if (url.origin !== self.location.origin) return;

  // Skip API routes
  if (url.pathname.startsWith("/api/")) return;

  // Static assets (JS, CSS, images, fonts) → Cache-first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages → Network-first with cache fallback
  event.respondWith(networkFirst(request));
});

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/icons/") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2")
  );
}

// Cache-first: return cached version, fall back to network and cache the response
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

// Network-first: try network, fall back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Offline fallback: return cached homepage
    const fallback = await caches.match("/");
    if (fallback) return fallback;

    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/html" },
    });
  }
}
