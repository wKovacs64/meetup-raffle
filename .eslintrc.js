module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/jest',
    'plugin:wkovacs64/jest-dom',
    'plugin:wkovacs64/testing-library',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
