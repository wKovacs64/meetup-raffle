module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['emotion'],
  rules: {
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'import/prefer-default-export': 'off',
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
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'valid-jsdoc': [
      'error',
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          return: 'returns',
        },
      },
    ],
  },
};
