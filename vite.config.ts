import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
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
}));
