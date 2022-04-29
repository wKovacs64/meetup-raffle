// TODO: remove once eslint-plugin-wkovacs64 does this for us
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/jest',
    'plugin:wkovacs64/jest-dom',
    'plugin:wkovacs64/testing-library',
    'prettier',
  ],
  rules: {
    // doesn't work with vitest as it relies on jest version detection
    'jest/no-deprecated-functions': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
