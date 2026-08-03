// FlipMyCase service worker: bounded static caching and privacy-safe page fallback.

const CACHE_VERSION = "v2";
const CORE_CACHE = `fmc-core-${CACHE_VERSION}`;
const STATIC_CACHE = `fmc-static-${CACHE_VERSION}`;
const PAGE_CACHE = `fmc-pages-${CACHE_VERSION}`;
const STATIC_CACHE_LIMIT = 80;
const PAGE_CACHE_LIMIT = 20;

const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("fmc-") && ![CORE_CACHE, STATIC_CACHE, PAGE_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    // Query strings can contain private or one-time values. Never retain them.
    if (url.search) {
      event.respondWith(fetch(request));
      return;
    }
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstStatic(request));
  }
});

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/icons/") ||
    /\.(?:js|css|png|jpe?g|svg|webp|avif|woff2?)$/i.test(pathname)
  );
}

function canCache(response) {
  return (
    response.ok &&
    response.type === "basic" &&
    !/no-store/i.test(response.headers.get("Cache-Control") || "")
  );
}

async function trimCache(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - limit)).map((key) => cache.delete(key)));
}

async function cacheFirstStatic(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (canCache(response)) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, response.clone());
      await trimCache(STATIC_CACHE, STATIC_CACHE_LIMIT);
    }
    return response;
  } catch {
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function networkFirstPage(request) {
  try {
    const response = await fetch(request);
    if (canCache(response) && /text\/html/i.test(response.headers.get("Content-Type") || "")) {
      const cacheName = new URL(request.url).pathname === "/" ? CORE_CACHE : PAGE_CACHE;
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      if (cacheName === PAGE_CACHE) await trimCache(PAGE_CACHE, PAGE_CACHE_LIMIT);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    const fallback = await caches.match("/");
    if (fallback) return fallback;

    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
