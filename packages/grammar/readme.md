## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/language-grammars

Liquid templating language [TextMate](https://macromates.com/manual/en/language_grammars) grammar generator. Used by [Liquify](#) IDE extension/package to generate syntax support for multiple variations of the Language.

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

By default, all grammars extend the [Liquid Standard](#) variation TextMate grammar which is located in the root of the `src` directory. If you would like to contribute or create a new Liquid variaton/injection grammars you can use the `build.config.json` configuration file. There are 2 types of grammars that can be generated:

#### Includes

Grammars located within the `syntax/include` directory are extendable grammar modules that will be included as pattern references when generating additional variations or injections.

#### Injects

Grammars located within the `syntax/injects` directory are injection grammars.

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
