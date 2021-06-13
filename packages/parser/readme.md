<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-parser

An incremental parser/scanner for the Liquid Template Language. Developed for the [Liquify IDE](https://liquify.dev) text editor plugin to construct a detailed workable Abstract Syntax Tree. The parser is used in combination with the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) implementation.

## Goals

- Speed, a text editor parser needs to be fast.
- Incremental, changes are constant.
- Fault Tolerant, errors handled gracefully.
- Language Aware, understand different languages.
- LSP friendly, easily integrate with a Language Server.

The parser performs well when changes are persisted to the AST. The incremental and partial updates to nodes allow changes to be applied exceptionally fast on the tree so features provided by the Language Server can execute quickly.

###### IMPORTANT

**This parser is used to construct and query an AST, not perform actions on parsed code. Use [liquidjs](https://github.com/harttle/liquidjs) by [Harttle](https://github.com/harttle) for Liquid engine support in JavaScript.**

## Why?

Facilitating modern IDE capabilities with the Liquid Template Language required a performant parser to construct a detailed representation of Liquid syntax contained in documents. The parser needed to work together with different languages like HTML and also be aware of embedded regions in those languages while at the same time handle consistent changes.

## Install

```cli
<pnpm|npm|yarn> i @liquify/liquid-parser --save
```

## Usage

There are only few use cases where you would require this parser outside of the Liquify IDE plugin. The parser is specifically designed to work within a Language Server but nothing is stopping one from appropriating elsewhere.

```ts
import { LiquidParser } from '@liquify/liquid-parser'

const { Documents, Spec, Parser } =  LiquidParser(options: Options)

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
Parser.get(uri: string): AST

/**
 * Deletes a document record from the AST
 */
Parser.delete(uri: string): AST

/**
 * Updates/changes the specification variation engine
 */
Parser.engine(engine: IEngine): void

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
 * Returns the current variation reference
 */
Parser.spec.variant

/**
 * Returns the entries mapping of specification items.
 * This is used in completions in LSP.
 */
Parser.spec.entries


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

Liquid exists in a multitude of variations and no official grammar exists for the language outside of what one can find in its [standard](https://shopify.github.io/liquid/) open sourced variation. In order for the parser to compose a detailed AST it leverages a collection of grammars made available via variation specifications. These specs are data reference files that describe Liquid syntax structures.

- [Liquid Language Specifications](#)

## Development

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](https://git-scm.com/)
- [Node v14^](https://nodejs.org/)
- [Pnpm v5^](https://pnpm.js.org/)
- [VSCode](https://code.visualstudio.com/)

</p>
</details>

The parser is written in [TypeScript](https://www.typescriptlang.org/) and compiled using [Rollup](https://rollupjs.org/guide/en/). You will need to have access to the [specifications](#) to preform any meaningful development as it depends those files to operate.

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
