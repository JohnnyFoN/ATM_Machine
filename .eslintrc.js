module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prop-types": 0,
    "max-len": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-param-reassign": 0,
    "no-shadow": 0,
    "react/no-array-index-key": 0
  },
};
