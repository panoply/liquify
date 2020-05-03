# @liquify/liquid-tmlanguage

This directory contains Liquid [TextMate Language Grammars](https://macromates.com/manual/en/language_grammars) which are used to provide Liquid syntax highlighting support in text editors that use the [Liquify](#) extension/package.

### Installation

```cli
npm i @liquify/liquid-tmlanguage --dev
```

### Building

By default, all grammars extend the [Liquid Standard](#) variation TextMate grammar. You can extend and generate variation grammars by supplying

### Grammar Variations

There are 3 syntax languages generated, each of which will extend the `default.jsonc` standard Liquid variation grammar.

- [Liquid Standard](#)
- [Liquid Shopify](#)
- [Liquid Jekyll](#)

> If you're a [licensed](#) user of Liquify you can extend grammars to support custom variations of Liquid.

### Commands

| Command        | Description                                           |
| -------------- | ----------------------------------------------------- |
| `pnpm run cli` | Launches debugger and bundler for the language client |
| `pnpm run dev` | Launches debugger and bundler for the language client |
| `pnpm run cdn` | Launches debugger and bundler for the language client |

### CDN
