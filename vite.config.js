import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // This makes the theme-ui `sx` prop work, but we still import React in
    // every component to make jest work. :\
    jsxFactory: 'jsx',
    jsxInject: 'import { jsx } from "theme-ui"',
  },
  plugins: [
    reactRefresh(),
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
      '~normalize.css': './node_modules/normalize.css/normalize.css',
    },
  },
});
