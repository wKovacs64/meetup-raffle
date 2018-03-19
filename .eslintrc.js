module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: { every: ['id'] },
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/no-did-mount-set-state': 'off',
  },
};
