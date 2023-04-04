/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? './server.js'
      : undefined,
  serverBuildPath: '.netlify/functions-internal/server.js',

  // serverConditions: ['deno', 'worker'],
  // serverMainFields: ['main', 'module'],
  // serverModuleFormat: 'cjs',
  // serverPlatform: 'node',
  // serverMinify: false,

  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  future: {
    // unstable_dev: true,
    unstable_postcss: true,
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
