import * as React from 'react';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';
import { loadServiceWorker } from '@remix-pwa/sw';
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

loadServiceWorker({ serviceWorkerUrl: '/sw.js' });
