<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-parser

An incremental parser for the Liquid Templating Language written in JavaScript and is used by the [Liquify IDE](#) text editor plugin to construct a workable AST in documents that contain Liquid syntax. The parser is used in combination with the [Node LSP](#) (Language Server Protocol) implementation.

> This parser is used to construct an AST, not perform actions on parsed code. Please use [liquidjs](#) by [Harttle](#) for engine support in JavaScript.

## Why?

In order to facilitate modern IDE capabilties when working with the Liquid Templating Language in text editors like vscode, sublime, atom etc. The parser provides a detailed representation of Liquid syntax contained in documents.

## Install

```cli
<pnpm|npm|yarn> i @liquify/liquid-parser --save
```

## Usage

Please note that there would be very little use cases where you would require this parser. Generally speaking, the Liquify IDE plugin which consumes this package should suffice and facilitate most if not all your requirements when working with Liquid.

```js
import LiquidParser from "@liquify/liquid-parser";

const parse = new LiquidParser();

// Full Document Parse
const { ast } = await parse.full(String);

// Incremental Document Parse
const { ast } = await parse.increment(String, { changes });
```

### AST Nodes

Nodes contained on the AST will return an object. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below:

```ts
[
  {
    name: string
    token: string[]
    type: number
    tag: number
    offset: number[]
    languageId?: string
    lineOffset?: number
    embeddedDocument?: number
    children?: [
      {
        name: string
        token: string
        offset: number[]
        type: number
        tag: number
        objects?: objects
      }
    ]
    diagnostics: Promise< null | [
      {
        range: object;
        severity?: number;
        code?: number | string;
        source?: string;
        message: string;
      }
    ]>
    objects?: Promise< null | {
      [string: number]: [
        string
      ]
    }>
  }
]
```

## Tests

Tests are provided using [AVA](#).

`pnpm test`

## License
