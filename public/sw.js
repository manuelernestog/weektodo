var cacheName = "v2.2.0";

var contentToCache = [
  "/",
  "js/app.js",
  "js/chunk-vendors.js",
  "/Avatar.webp",
  "/fonts/bootstrap-icons.1ed478a6.woff2",
  "/WeekToDo-Logo-Color.svg",
  "/manifest.json",
  "/fav_icons/android-chrome-192x192.png"
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cachedResponse = await caches.match(e.request);
      if (cachedResponse) return cachedResponse;

      return fetch(e.request).catch((error) => {
        console.log(error.message);
      });
    })()
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});
