<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-parser

An incremental parser/scanner for the Liquid Template Language. Written in pure JavaScript and used by the [Liquify IDE](#) text editor plugin to construct a workable Abstract Syntax Tree. The parser is used in combination with the [Node LSP](#) (Language Server Protocol) implementation.

> **IMPORTANT** This parser is used to construct and query an AST, not perform actions on parsed code. Use [liquidjs](#) by [Harttle](#) for Liquid engine support in JavaScript, and consider supporting that project or alternatively you can use the standard [liquid](#) ruby based engine.

## Why?

Facilitating modern IDE capabilities when working with the Liquid Template Language in text editors required a performant parser to construct a detailed representation of Liquid syntax contained in documents. Due to the unique manner in which Liquid is expressed and to seamlessly couple with the Language Server developing a parser that made interacting with LSP a whole lot easier.

## Install

```cli
<pnpm|npm|yarn> i @liquify/liquid-parser --save
```

## Usage

**Please note:** there are very little use cases where you would require this parser in the real world. The Liquify IDE plugin that consumes this package should suffice and facilitate most (if not all) your requirements when developing with Liquid.

```js
import { Parser } from "@liquify/liquid-parser";

const parser = new Parser("standard", {
  engine: "standard",
  license: "abcdefghijklmnopqrstuvwxyz",
  context: true,
  frontmatter: false,
  whitespace: true,
  newlines: false,
  range: true,
  offsets: true,
  process_unknown: true,
  parse_html: false,
  skip_strings: false,
  html_comments: false,
  multiline_comments: true,
  inline_comments: true,
  track_variables: true,
  error_tolerance: 1,
  exclude: [],
});

// Full Document Parse
const { ast } = await parser.parse(String);

// Incremental Document Parse
const { ast } = await parse.increment(String, { changes });
```

### AST Nodes

Each node contained on the AST is a class instance. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below:

```typescript
[
  Node {
    name: string,
    get start(): number,
    get end(): number,
    get errors(): IParseError[],
    get context(): number[],
    get document(): TextDocument,
    offset(offset: number): void,
    token: Token[],
    language: string & Languages,
    type: TokenType,
    index: number,
    kind: TokenKind,
    offsets: Offsets,
    range: Range,
    children?: Children[],
    content: string,
    singular: boolean,
    filters?: Map<number, string>,
    children?: [
      {
        name: string,
        token: string,
        offset: number[],
        type: number,
        tag: number,
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

## Grammar

Liquid exists in a multitude of variations and no official/formal grammar exists for the language outside of its [standard](https://shopify.github.io/liquid/) open sourced variation. In order for the parser to compose the AST it leverages a collection of grammars made available via _Liquid Language Variation Specifications_. These specs are data reference files that describe Liquid syntax and provide a way to compose formal grammars for the Liquid Language.

## Development

The Liquid Parser is written in ES2020 JavaScript with some TypeScript features that are using Babel for transpilation. Type checking is processed with [JSDocs](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc) and TypeScript declarations files are leveraged for the more complex structures. Declarations are declared globally and referenced where necessary in jsdoc comment/type params. TypeScript is also leveraged for numeric/string enums.

> TypeScript files are not processed with the TypeScript compiler but instead using Babel and Terser. The `tsconfig.json` located at root exists to provide vscode intellisense features, for bundle configuration, see the `rollup.config.js` file.

#### Why only partially TypeScript?

I love TypeScript but I generally just prefer to write pure JavaScript with a sprinkle of TypeScript. It is my personal preference and forces me to write detailed comments. If you reject that approach or idealogy, then maybe you should get a life.

## Tests

Tests are provided using [AVA](#) and can be found in the `/test` directory. When running `pnpm dev` and launching development, tests will run along side bundling.

`pnpm test`

## License

[CC BY-NC-ND 4.0](#)
