import rules from './eslint.rules'

export default {
  env: {
    browser: false,
    es6: true,
    jest: false,
    node: true
  },
  extends: [ 'standard' ],
  plugins: [ '@babel', 'import' ],
  settings: {
    'import/resolver': {}
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false
  },
  rules
}
