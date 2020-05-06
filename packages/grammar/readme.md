# @liquify/language-grammars

☔ Liquid templating language [TextMate](https://macromates.com/manual/en/language_grammars) grammar generator. Used by [Liquify](#) IDE extension/package to generate syntax support for multiple variations of the Language.

## Why?

Liquid exists in a multitude of variations and while structurally consistent the context and functionality of the syntax changes. This tool will generate Liquid TextMate grammars and provides a structured way to create and/or extend variations of the language.

## Install

PNPM

```bash
pnpm add @liquify/language-grammars -D
```

NPM:

```bash
npm install @liquify/language-grammars --save-dev
```

Yarn:

```bash
yarn add @liquify/language-grammars --dev
```

## Usage

By default, all grammars extend the [Liquid Standard](#) variation TextMate grammar which is located in the root of the `src` directory. If you would like to contribute or create a new Liquid variaton/injection grammars you can use the `bundle.jsonc` configuration file. There are 2 types of grammars that can be generated:

#### Includes

Grammars located within the `src/include` directory are extendable grammar modules that will be included as pattern references when generating additional variations or injections.

#### Injects

Grammars located within the `src/injects` directory are injection grammars.

## Commands

| Command        | Description                                           |
| -------------- | ----------------------------------------------------- |
| `pnpm run cli` | Launches debugger and bundler for the language client |
| `pnpm run dev` | Launches debugger and bundler for the language client |
| `pnpm run cdn` | Launches debugger and bundler for the language client |

### Variations

There are 3 syntax languages generated, each of which will extend the `default.jsonc` standard Liquid variation grammar.

- [Liquid Standard](#)
- [Liquid Shopify](#)
- [Liquid Jekyll](#)

> If you're a [licensed](#) user of Liquify you can extend grammars to support custom variations of Liquid.

##
