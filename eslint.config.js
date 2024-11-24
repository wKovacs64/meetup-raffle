import baseConfig from '@wkovacs64/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...baseConfig,
  {
    ignores: ['public/**/*'],
  },
];

export default config;
