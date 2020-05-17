## <img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/language-grammars

Liquid Language [TextMate Grammar](https://macromates.com/manual/en/language_grammars) generator. Grammars contained in this repository are consumed by the [Liquify](#) text editor extension/package plugin and provide syntax support for multiple variations of the language.

## Why?

Liquid exists in a multitude of variations and while structurally consistent the context and functionality of the syntax changes depending on its implementation. This module generates Liquid TextMate grammars and provides a structured way to create and/or extend variations of the language.

## Supported

- [Liquid Standard](#)
- [Liquid 11ty](#)
- [Liquid Shopify](#)
- [Liquid Jekyll](#)

## Install

1. Clone/fork the repository
2. Run `pnpm install`

## Usage

The [grammars.json](#) file located in the root directory is used as the grammar generator from which all grammars will be created. The file references a JSON [Schema Store](http://schemastore.org/) which provides IntelliSense validation, completion and descriptives for the export configuration options.

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `pnpm run dev`   | Watches and builds grammar files        |
| `pnpm run build` | Build minified production grammar files |
| `pnpm run peep`  | View generated grammars via [fx](#)     |

## Generating

The project uses the [Liquify CLI](#) tool to process and build grammars. By default, all generated grammars extend upon the **[Standard](#)** Liquid variation grammar which is located at the root of the `syntax` directory. There are 2 types of grammars that can be generated.

#### Variation Grammars

Variation grammars will import pattern files contained within the `syntax/include` directory. Pattern files can be referenced to variations in the grammar generator config file and will either extend upon an already existing (standard variation) include pattern or be appended as a new include pattern.

#### Injection Grammars

Injection grammars will import patterns from the `syntax/inject` directory. Injection grammar patterns require an `injectionSelector` value which you can define in the grammar generator config file.

<img src="https://raw.githubusercontent.com/panoply/liquify/next/assets/line.svg?token=ABVXCLBQXPLFVBBTSGSXSSC6ZLPVA" />

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
