import rules from './eslint.rules'

export default {
  env: {
    browser: false,
    es6: true,
    jest: false,
    node: true
  },
  extends: [ 'standard' ],
  parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint' ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false
  },
  rules
}
