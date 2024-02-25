/// <reference lib="WebWorker" />

import {
  EnhancedCache,
  logger,
  clearUpOldCaches,
  NavigationHandler,
} from '@remix-pwa/sw';

declare let self: ServiceWorkerGlobalScope;

const CURRENT_CACHE_VERSION = 'v2';

// const assetCache = new EnhancedCache('remix-assets', {
//   version: CURRENT_CACHE_VERSION,
//   strategy: 'CacheFirst',
//   strategyOptions: {
//     maxEntries: 2,
//     maxAgeSeconds: 60,
//     cacheableResponse: false,
//   },
// });

self.addEventListener('install', (event: ExtendableEvent) => {
  logger.log('installing service worker');
  event.waitUntil(
    Promise.all([
      self.skipWaiting(),
      // assetCache.preCacheUrls(['/entry.worker.css']),
    ]),
  );
});

self.addEventListener('activate', (event) => {
  logger.log(self.clients, 'manifest:\n', self.__workerManifest);
  event.waitUntil(
    Promise.all([
      clearUpOldCaches(['remix-assets'], CURRENT_CACHE_VERSION),
    ]).then(() => {
      self.clients.claim();
    }),
  );
});

new NavigationHandler({
  documentCache: new EnhancedCache('remix-document', {
    version: CURRENT_CACHE_VERSION,
    strategy: 'CacheFirst',
    strategyOptions: {
      maxEntries: 10,
      maxAgeSeconds: 60,
      cacheableResponse: {
        statuses: [200],
      },
    },
  }),
});
