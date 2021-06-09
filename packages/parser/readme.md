<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-parser

An incremental parser/scanner for the Liquid Template Language. Developed for the [Liquify IDE](https://liquify.dev) text editor plugin to construct a detailed workable Abstract Syntax Tree. The parser is used in combination with the [Node LSP](https://microsoft.github.io/language-server-protocol/) (Language Server Protocol) implementation.

> **IMPORTANT** This parser is used to construct and query an AST, not perform actions on parsed code. Use [liquidjs](https://github.com/harttle/liquidjs) by [Harttle](https://github.com/harttle) for Liquid engine support in JavaScript and consider supporting that project. Alternatively you can use the standard [liquid](https://github.com/Shopify/liquid) ruby based engine.

## Why?

Facilitating modern IDE capabilities when working with the Liquid Template Language in text editors required a performant parser to construct a detailed representation of Liquid syntax contained in documents. The parser uses grammars known as Liquid [Variation Specifications](#) to provide parsing, validations, linting, completions and other various LSP capabilities. The grammars (specs) are basic JSON schemas so developers of all levels can compose, extend or leverage.

## Install

```cli
<pnpm|npm|yarn> i @liquify/liquid-parser --save
```

## Usage

**Please note:** there are very little use cases where you would require this parser in the real world. The Liquify IDE plugin that consumes this package should suffice and facilitate most (if not all) your requirements when developing with Liquid. The parser is specifically designed to work with a Language Server but can be appropriated to different use cases.

```ts
import { LiquidParser } from '@liquify/liquid-parser'

const {
  Documents,
  Spec,
  Parser
} =  LiquidParser(options: Options)


/* PARSER ------------------------------------- */

/**
 * Full Document Scan. In LSP this is called at
 * `onDocumentOpen` this must be executed first.
 */
Parser.scan(textDocument: TextDocument): AST

/**
 * Partial Document Scan (Incremental). In LSP
 * this is called at `onDocumentChange`
 */
Parser.update(textDocument: VersionedTextDocument, contentChanges): AST

/**
 * Returns a Document AST via a URI identifier. In LSP
 * this is called for different capabilities.
 */
Parser.document(uri: string): AST

/**
 * Executes an regular expression test at a range offset
 * location. You can use the AST method to get a range offset.
 */
Parser.isRegExp(regex: RegExp, offset: [number, number]): boolean;

/**
 * Validates character code matches a condition
 * at specific offset location.
 */
Parser.isCodeChar(code: number, offset: number): boolean;

/**
 * Validates character code matches a condition
 * at the previous offset location, (moves 2 steps back)
 */
Parser.isPrevCodeChar(code: number, offset: number): boolean;

/**
 * Validates character code matches a condition
 * at the next offset location, (moves 1 step forward)
 */
Parser.isNextCodeChar(code: number, offset: number): boolean;


/* SPEC ---------------------------------------- */

/**
 * Updates/changes the specification variation engine
 */
Spec.engine(engine: IEngine): void

/**
 * Returns the current variation reference
 */
Spec.variant

/**
 * Returns the entries mapping of specification items.
 * This is used in completions in LSP.
 */
Spec.entries

/* Documents ---------------------------------- */

/**
 * Returns a document AST via URI (Parser.document(uri) is faster)
 */
Documents.get(uri: string): AST

/**
 * Sets a document URI (Model)
 */
Documents.set(uri: string, AST): AST

/**
 * Removes document from model cache
 */
Documents.delete(uri: string, AST): boolean

/**
 * Purges the entire model cache
 */
Documents.clear(): boolean

// etc, etc

```

### AST

Each text document stores in the `Documents` Map hold an AST instance reference. The AST
provides a methods and maintains a cache of all open documents in the editor.

<!-- prettier-ignore -->
```typescript
export class AST {

  // DATA

  textDocument: TextDocument;
  errors: Diagnostic[];
  cursor: number;
  embeds: number[];
  comments: number[];
  variables: object;
  nodes: INode[];
  node: INode;

  // NAVIGATORS

  get lastNode(): ASTNode;
  get nextNode(): ASTNode;
  get prevNode(): ASTNode;

  // UPDATES

  update(change: TextDocumentContentChangeEvent): void;
  literal(extension?: string): TextDocument;

  // LOCATION

  positionAt(location: number): Position;
  offsetAt(location: Position): number;
  toRange(start?: number, end?: number): Range;
  toRangeOffset(location: Range): [number, number];
  toLineRange(location: Position | number): Range;

  // EXPLORERS

  getText(location?: Range | Position | number | [number, number]): string;
  getNodeAt(position: Position | number, updateNode?: true | false): INode | false;
  getEmbedAt(position: Position | number, updateNode?: true | false): INode | false;
  getEmbeds(languages?: string[]): INode[] | false;
  getComments(languages?: string[]): INode[] | [];
  getNodes(indexes: number[]): INode[];
  getNodeContext(node?: INode): {};
  getAssociates(names: string[]): INode[];
  getVariables(): void;
  getScope(): INode;

  // FINDERS

  withinNode(location: Position | number, node?: INode): boolean;
  withinBody(location: Position | number, node?: INode): boolean;
  withinScope(location: Position | number, node?: INode): boolean;
  withinToken(location: Position | number, node?: INode): boolean;
  withinEndToken(location: Position | number, node?: INode): boolean;
  withinEmbed(location: Position | number, node?: INode): boolean;

}
```

### AST Nodes

Each node contained on the AST is a class instance. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below.

<!-- prettier-ignore -->
````typescript
export class ASTNode {

  // DATA

  name: string;
  token: string[];
  language: string;
  type: number;
  error: number;
  root: number;
  parent: number;
  index: number;
  kind: number;
  offsets: number[];
  range: { start?: Position; end?: Position };
  children?: number[];
  singular: boolean;
  objects?: object | { [offset: number]: string[] | number };
  filters?: object | { [offset: number]: string };
  attributes?: object | { [attribute: string]: string; };

  // LOCATION

  get start(): number;
  get end(): number;
  get context(): number[];
  get content(): string | false;

  // METHODS

  public getErrors (): Array<Parser.Diagnostic>
  public getRoot (): INode;
  public getParent (): INode;
  public getContext (): Parser.Context[]
  public getDocument(): TextDocument | false;

}
````

## Node Context

The parser provides `contextual` parsing, which is disabled by default to improve speed. A context parse will compose a structure of the characters and tokens contained within a node. If `context` is set to `true` and you call the `node.getContext()` method, you will receive an array with the following data:

<!-- prettier-ignore -->
```typescript

/**
 * Singular / Output Tags
 *
 * Context for singular type tags. Where context contains only
 * 1 item in the array.
 *
 * @example
 *
 * {% if "foo" == bar.baz %} {% endif %}
 */
node.getContext(): [
  [
   {
      end: number,
      start: number,
      type: 'delimiter',
      value: '{{',
    },
    {
      end: number,
      start: number,
      type: 'keyword',
      value: 'foo',
    },
    {
      end: number,
      start: number,
      type: 'delimiter',
      value: '}}',
    }
  ]
]

/**
 * Tag Pairs
 *
 * Context for start/end type pair tags. Where
 * index 0 is start and 1 is end.
 *
 * @example
 *
 * {% if "foo" == bar.baz %} {% endif %}
 */
node.getContext(): [
  [
    {
      end: number,
      start: number,
      type: 'delimiter',
      value: '{%',
    },
    {
      end: number,
      start: number,
      type: 'identifier',
      value: 'if',
    },
    {
      end: number,
      start: number,
      type: 'string',
      value: '"foo"',
    },
    {
      end: number,
      start: number,
      type: 'operator',
      value: '==',
    },
    {
      end: number,
      start: number,
      type: 'object',
      value: 'bar',
    },
    {
      end: number,
      start: number,
      type: 'separator',
      value: '.',
    },
    {
      end: number,
      start: number,
      type: 'property',
      value: 'bar',
    },
    {
      end: number,
      start: number,
      type: 'delimiter',
      value: '%}',
    }
  ],
  [
    {
      end: number,
      start: number,
      type: 'delimiter',
      value: '{%',
    },
    {
      end: number,
      start: number,
      type: 'keyword',
      value: 'endif',
    },
    {
      end: number,
      start: number,
      type: 'delimiter',
      value: '%}',
    }
  ]
]
```

## Grammar

Liquid exists in a multitude of variations and no official/formal grammar exists for the language outside of its [standard](https://shopify.github.io/liquid/) open sourced variation. In order for the parser to compose the AST it leverages a collection of grammars made available via Variation Specifications. These specs are data reference files that describe Liquid syntax and provide a way to compose formal grammars for the Liquid Language.

## Development

The parser is written in [TypeScript](https://www.typescriptlang.org/) and compiled using [Rollup](https://rollupjs.org/guide/en/). You will need to have access to Specification to preform any meaningful development as it depends the Spec grammars to function.

1. Clone the Liquify Repository
2. Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
3. Clone this repository `git clone https://github.com/panoply/liquify.git`
4. Run `pnpm i`
5. Run `pnpm build`

Optionally, you can `cd` into this package from root and run `pnpm dev` (recommended approach). If you want to develop on the Language Server, changes made in dev mode sync to the Server when in Debug mode.

## Tests

Tests are provided using [AVA](https://github.com/avajs/ava) and can be found in the `/test` directory. When running `pnpm dev` and launching development, tests will run along side bundling.

`pnpm test`

## License

[CC BY-NC-ND 4.0](#)
