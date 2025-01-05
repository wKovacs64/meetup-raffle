/// <reference lib="WebWorker" />

const CURRENT_CACHE_VERSION = 'v3';

const DOCUMENT_CACHE_NAME = 'document-cache';
const ASSET_CACHE_NAME = 'asset-cache';
const DATA_CACHE_NAME = 'data-cache';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  console.log('Simple service worker installed');

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Simple service worker activated');

  event.waitUntil(
    Promise.all([
      clearUpOldCaches(
        [DOCUMENT_CACHE_NAME, DATA_CACHE_NAME, ASSET_CACHE_NAME],
        CURRENT_CACHE_VERSION,
      ),
      self.clients.claim(),
    ]),
  );
});

async function clearUpOldCaches(cacheNames: string[], version?: string) {
  if (version) {
    cacheNames = cacheNames.map((cacheName) => `${cacheName}-${version}`);
  }

  const allCacheNames = await caches.keys();
  const deletePromises: Promise<boolean>[] = [];

  for (const cacheName of cacheNames) {
    const { cacheActualName } = getCacheNameAndVersion(cacheName);
    const cachesToDelete = allCacheNames.filter(
      (cache) => cache.startsWith(cacheActualName) && cache !== cacheName,
    );
    for (const oldCacheName of cachesToDelete) {
      deletePromises.push(caches.delete(oldCacheName));
    }
  }

  return Promise.all(deletePromises);
}

function getCacheNameAndVersion(cacheName: string) {
  const [cacheActualName, ...rest] = cacheName.split('-');
  const version = rest.at(-1);

  return { cacheActualName, version };
}

export {};
