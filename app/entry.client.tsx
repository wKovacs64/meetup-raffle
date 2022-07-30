import * as React from 'react';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { requestIdleCallbackShim } from '~/core/request-idle-callback-shim';

requestIdleCallbackShim(() => {
  React.startTransition(() => {
    hydrateRoot(
      document,
      <React.StrictMode>
        <RemixBrowser />
      </React.StrictMode>,
    );
  });
});

// credit: ShafSpecs/remix-pwa
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SYNC_REMIX_MANIFEST',
            manifest: window.__remixManifest,
          });
        } else {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            navigator.serviceWorker.controller?.postMessage({
              type: 'SYNC_REMIX_MANIFEST',
              manifest: window.__remixManifest,
            });
          });
        }
      })
      .catch((error) => {
        console.error('Service worker registration failed', error);
      });
  });
}
