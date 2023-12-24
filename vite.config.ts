import { installGlobals } from '@remix-run/node';
import { vitePlugin as remix } from '@remix-run/dev';
import { unstable_RemixPWA as remixPwa } from '@remix-pwa/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

// TODO: import from @netlify/remix-adapter once it supports Vite
const netlifyConfig = {
  serverBuildPath: './.netlify/functions-internal/server.mjs',
};

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    cssMinify: process.env.NODE_ENV === 'production',
  },
  plugins: [
    remix({
      ...(process.env.NODE_ENV === 'production' ? netlifyConfig : undefined),
      ignoredRouteFiles: ['**/.*'],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    remixPwa({
      workerName: 'sw',
      workerMinify: true,
    }),
    tsconfigPaths(),
  ],
});
