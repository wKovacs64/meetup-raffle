/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  postcss: true,
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? './server.ts'
      : undefined,
  serverBuildPath: '.netlify/functions-internal/server.js',
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverModuleFormat: 'cjs',
  future: {},
};
