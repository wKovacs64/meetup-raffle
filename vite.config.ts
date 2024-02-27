import path from 'node:path';
import { vitePlugin as remix } from '@remix-run/dev';
import { unstable_RemixPWA as remixPwa } from '@remix-pwa/dev';
import { defineConfig, normalizePath } from 'vite';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "Module level directives cause errors when bundled" warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    holdUntilCrawlEnd: true,
  },
  plugins: [
    remix({
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
    netlifyPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'app/images/favicon.ico',
          dest: normalizePath(path.resolve('./build/client')),
        },
      ],
    }),
    tsconfigPaths(),
  ],
});
