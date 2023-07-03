module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    eqeqeq: 'error',
    semi: ['error', 'always'],
    indent: ['warn', 2],
    'no-console': 'off',
  },
};
