module.exports = {
  extends: ['@wkovacs64/eslint-config-react'],
  plugins: ['emotion'],
  rules: {
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: { every: ['id'] },
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        controlComponents: ['Field'], // Formik
      },
    ],
  },
};
