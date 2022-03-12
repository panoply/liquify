/**
 * @type {import('prettier').Options}
 */
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 70,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  overrides: [
    {
      files: [ '**/*.md' ],
      options: {
        parser: 'markdown',
        printWidth: 100
      }
    },
    {
      files: [ '**/*.json', '**/*.jsonc' ],
      options: {
        parser: 'json',
        printWidth: 60
      }
    },
    {
      files: [ '**/package.json' ],
      options: {
        parser: 'json-stringify'
      }
    }
  ]
}
