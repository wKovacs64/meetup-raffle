import { installGlobals } from '@remix-run/node';
import { vitePlugin as remix } from '@remix-run/dev';
import { unstable_RemixPWA as remixPwa } from '@remix-pwa/dev';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
    viteStaticCopy({
      targets: [
        {
          src: 'app/images/favicon.ico',
          dest: normalizePath('../../build/client'),
        },
      ],
    }),
    tsconfigPaths(),
  ],
});
