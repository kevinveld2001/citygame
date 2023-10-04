const urlsToCache = ["/", "/static/js/bundle.js", "/favicon.ico", "/logo192.png", "/logo512.png"];
self.addEventListener("install", (event) => {
   event.waitUntil(async () => {
      const cache = await caches.open("pwa-assets");
      return cache.addAll(urlsToCache);
   });
});