module.exports = {
  overrides: [
    {
      files: ['*.jsonc', '.liquidrc', '*.json'],
      options: {
        parser: 'json-stringify',
        arrowParens: 'avoid',
        bracketSpacing: true,
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 75,
        proseWrap: 'preserve',
        quoteProps: 'as-needed',
        requirePragma: false,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    }
  ]
}
