var APP_PREFIX = 'secure-wallet'
var VERSION = '0.0.0.2'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
  '/secure-wallet/',
  '/secure-wallet/index.html',
  '/secure-wallet/main.css',
  '/secure-wallet/main.js',
  '/secure-wallet/manifest.json',
  '/secure-wallet/images/favicon-16x16.png',
]

self.addEventListener('fetch', function (e) {
  console.log('sw[fetch]')
  e.respondWith(
    caches.match(e.request).then(function (request) {
      return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  console.log('sw[install]')
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS).then(function(){self.skipWaiting()})
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  console.log('sw[activate]')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
