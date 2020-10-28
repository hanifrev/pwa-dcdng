const CACHE_NAME = "opethevo-v9.3";
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/icon.png",
  "/manifest.json",
  "/sw-register.js",
  "/assets/dates_flyer.jpg?lastmod=123",
  "/assets/home_flyer.jpg?lastmod=123",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/setlist.html",
  "/pages/dates.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
