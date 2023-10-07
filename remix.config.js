/** @type {import('@remix-pwa/dev').WorkerConfig} */
module.exports = {
  //
  // Remix Settings
  //
  ignoredRouteFiles: ['**/.*'],
  postcss: true,
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? './server.ts'
      : undefined,
  serverBuildPath: '.netlify/functions-internal/server.js',
  serverDependenciesToBundle: [
    '@remix-pwa/cache',
    '@remix-pwa/sw',
    '@remix-pwa/strategy',
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverModuleFormat: 'cjs',
  future: {},
  //
  // Remix PWA Settings
  //
  workerName: 'sw',
  workerMinify: true,
};
