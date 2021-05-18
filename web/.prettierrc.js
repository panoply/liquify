module.exports = {
  overrides: [
    {
      files: ["*.json", ".liquidrc"],
      options: {
        parser: "json",
        arrowParens: "avoid",
        bracketSpacing: true,
        htmlWhitespaceSensitivity: "css",
        insertPragma: false,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 80,
        proseWrap: "preserve",
        quoteProps: "as-needed",
        requirePragma: false,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false
      }
    }
  ]
};