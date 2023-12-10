import { config } from '@netlify/remix-adapter';

/** @type {import('@remix-pwa/dev').WorkerConfig} */
export default {
  //
  // Netlify Settings
  //
  ...(process.env.NODE_ENV === 'production' ? config : undefined),
  //
  // Remix Settings
  //
  serverDependenciesToBundle: [
    '@remix-pwa/cache',
    '@remix-pwa/sw',
    '@remix-pwa/strategy',
  ],
  future: {},
  //
  // Remix PWA Settings
  //
  workerName: 'sw',
  workerMinify: true,
};
