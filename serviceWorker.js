const staticDevCoffee = "TimerRoundV1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/src/funciones.js",
  "/src/index.js",
  "/src/reloj.js",
  "/src/round.js",
  "/src/images/icon_boxing_timer.png",
  "/src/images/killerbeeslogo.png",

]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })