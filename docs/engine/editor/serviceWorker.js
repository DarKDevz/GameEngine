const cacheName = "your-pwa-cache-v1";
const filesToCache = [
  "/",
  "../../map.html",
  "../../libs/p5.min.js",
  "../../libs/p5.camera.js",
  "../../libs/rapier2d.js",
  "../../rapier_wasm2d_bg.wasm",
  "../../engine/utils.js",
  "../../engine/engine.js",
  "../../engine/collision/p5.collide.js",
  "../../engine/collision/handler.js",
  "../../engine/objects/collision.js",
  "../../engine/components/component.js",
  "../../engine/components/scriptComponent.js",
  "../../engine/objects/object.js",
  "../../engine/objects/box.js",
  "../../engine/objects/player.js",
  "../../engine/objects/end.js",
  "../../engine/objects/text.js",
  "../../engine/objects/enemyBox.js",
  "../../engine/objects/interactive.js",
  "../../engine/objects/bullet.js",
  "../../engine/objects/movingPlatform.js",
  "../../loader/level.js",
  "../../loader/support.js",
  "../../engine/objects/collisionChecker.js"
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
