import * as React from 'react';
import { HydratedRouter } from 'react-router/dom';
import { hydrateRoot } from 'react-dom/client';
import { requestIdleCallbackShim } from '~/core/request-idle-callback-shim';

requestIdleCallbackShim(() => {
  React.startTransition(() => {
    hydrateRoot(
      document,
      <React.StrictMode>
        <HydratedRouter />
      </React.StrictMode>,
    );
  });
});
