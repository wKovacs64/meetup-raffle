module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/jest',
    'prettier',
    'prettier/react',
  ],
  plugins: ['emotion'],
  rules: {
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Field'], // Formik
      },
    ],
  },
};
