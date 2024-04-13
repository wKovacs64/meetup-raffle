/* eslint-disable no-underscore-dangle */
/// <reference lib="WebWorker" />

import {
  logger,
  EnhancedCache,
  isDocumentRequest,
  isLoaderRequest,
  clearUpOldCaches,
  type DefaultFetchHandler,
} from '@remix-pwa/sw';

const CURRENT_CACHE_VERSION = 'v3';

const DOCUMENT_CACHE_NAME = 'document-cache';
const ASSET_CACHE_NAME = 'asset-cache';
const DATA_CACHE_NAME = 'data-cache';

const documentCache = new EnhancedCache(DOCUMENT_CACHE_NAME, {
  version: CURRENT_CACHE_VERSION,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxEntries: 64,
  },
});

const assetCache = new EnhancedCache(ASSET_CACHE_NAME, {
  version: CURRENT_CACHE_VERSION,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 60 * 60 * 24 * 90, // 90 days
    maxEntries: 100,
  },
});

const dataCache = new EnhancedCache(DATA_CACHE_NAME, {
  version: CURRENT_CACHE_VERSION,
  strategy: 'NetworkFirst',
  strategyOptions: {
    networkTimeoutInSeconds: 10,
    maxEntries: 72,
  },
});

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  logger.log('Service worker installed');

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  logger.log('Service worker activated');

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

export const defaultFetchHandler: DefaultFetchHandler = async ({ context }) => {
  const { request } = context.event;
  const url = new URL(request.url);

  if (isDocumentRequest(request)) {
    return documentCache.handleRequest(request);
  }

  if (isLoaderRequest(request)) {
    return dataCache.handleRequest(request);
  }

  if (self.__workerManifest.assets.includes(url.pathname)) {
    return assetCache.handleRequest(request);
  }

  return fetch(request);
};
