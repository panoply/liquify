
module.exports = {

  extends: [ '@liquify/eslint-config' ],
  plugins: [ '@babel', 'import' ],
  settings: {
    'import/resolver': {}
  },
  parser: '@babel/eslint-parser'
}
