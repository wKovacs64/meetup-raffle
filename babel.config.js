// Note: this Babel config file is only used by Jest (babel-jest) when running
// tests. Any transformation configuration for build outputs would be handled by
// Vite (and esbuild) in vite.config.js.

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
};
