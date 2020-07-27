<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-linter

Linting capabilties for the Liquid Templating Language that is used by [Liquify IDE](#) text editor plugin.

## Why

Liquid is a basic templating language which often leads to it being expressed by developers in a rather choatic or otherise exhaustive manner. This package will help prevent developers from writting invalid Liquid code and enforce rulesets that help bring some sanity to documents.

## Install

```cli
<pnpm|npm|yarn> i @liquify/liquid-linter --save-dev
```

## Usage

Create a `.liquidrc.json` file and and place it in the root of your project.

```json
{}
```

### AST Nodes

Each node contained on the AST is a class instance. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below:

```ts
```

## Development

The Liquid Parser is written in ES2020 JavaScript using a combination of Babel and Bublé for transpilation. Type checking is processed with JSDocs and TypeScript declarations files are leveraged for the more complex structures. Declarations are declared globally and referenced where necessary in jsdoc comment/type params. TypeScript is also leveraged for numeric/string enums.

> TypeScript files are not processed with the TypeScript compiler but instead using Babel and Terser. The `tsconfig.json` located at root exists to provide vscode intellisense features, for bundle configuration, see the `rollup.config.js` file.

## Tests

Tests are provided using [AVA](#) and can be found in the `/test` directory. When running `pnpm dev` and launching development, tests will run along side bundling.

`pnpm test`

## License

[CC BY-NC-ND 4.0](#)
