module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'comma-dangle': 0,
    'eol-last': 0,
    'no-shadow': 0,
    quotes: 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': ['error', { code: 160 }],
    'no-underscore-dangle': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};