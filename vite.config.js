import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'M. Raffle',
        name: 'Meetup Raffle',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '48x48 32x32 16x16',
            type: 'image/x-icon',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: './index.html',
        display: 'standalone',
        theme_color: '#ff4136',
        background_color: '#f4f4f4',
      },
      workbox: {
        globIgnores: ['mockServiceWorker.js'],
      },
    }),
  ],
  resolve: {
    alias: {
      '~spinners-react': './node_modules/spinners-react',
    },
  },
  test: {
    setupFiles: './test/setup.js',
    coverage: {
      include: [
        'src/client/**/*.js{,x}',
        'src/functions/**/*.js',
        '!src/client/dev-tools/**/*.js{,x}',
        '!**/index.js',
      ],
      reporter: ['text', 'lcov', 'clover'],
    },
    globals: true,
    environment: 'jsdom',
  },
});
