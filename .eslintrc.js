module.exports = {
  root: true,
  env: {
    node: true,
    'cypress/globals': true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  plugins: ['prettier', 'cypress'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
