module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: { every: ['id'] },
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/no-did-mount-set-state': 'off',
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
