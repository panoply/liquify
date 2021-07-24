<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/parser

An incremental parser/scanner for the Liquid Template Language. Developed for use with the [Liquify IDE](https://liquify.dev) text editor plugin to construct a detailed workable Abstract Syntax Tree. The parser is used in combination with the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) implementation. The Liquify parser adopts the same pattern and its scanning approach is loosely based on the [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice) and borrows logic found within [vscode-languageserver-node](https://github.com/microsoft/vscode-languageserver-node) in order to interface text documents with the LSP.

###### IMPORTANT

**This parser is used to construct and query an AST, it is not capable of performing actions on parsed code. Use [liquidjs](https://github.com/harttle/liquidjs) by [Harttle](https://github.com/harttle) for a Liquid rendering engine support with JavaScript.**

## Why?

Facilitating modern IDE capabilities for the Liquid Template Language required a performant parser to construct a detailed representation of Liquid syntax contained in text documents. The parser needed to work together with different languages like HTML and also be aware of embedded regions contained in markup while at the same time handle consistent changes.

## Install

```cli
<pnpm|npm|yarn> i @liquify/parser --save
```

## Usage

There are only few use cases where you would require this parser outside of the Liquify IDE plugin. The parser is specifically designed to work within a Language Server but nothing is stopping one from appropriating elsewhere.

```ts
import { LiquidParser } from '@liquify/liquid-parser'

const Parser  = new LiquidParser(options: Options)

/**
 * Full Document Scan. In LSP this is called at
 * `onDocumentOpen` this must be executed first.
 */
Parser.scan(textDocument: TextDocument): AST

/**
 * Document update. In LSP this is called on document
 * change event. It incrementally updates the document.
 */
Parser.update (contentChanges): AST

/**
 * String scan, different from `Parser.create()` and
 * `Parser.update()` wherein it accepts a string not document.
 */
Parser.parse(content: string): AST

/**
 * Returns a Document AST via a URI identifier. In LSP
 * this is called for different capabilities.
 */
Parser.get (uri: string): AST

/**
 * Deletes a document record from the AST
 */
Parser.delete(uri: string): void

/**
 * Updates/changes the specification variation engine
 */
Parser.engine(engine: IEngine): void

```

### AST

Each text document stores in the `Documents` Map hold an AST instance reference. The AST
provides a methods and maintains a cache of all open documents in the editor.

<!-- prettier-ignore -->
```typescript
export class AST {

  // DOCUMENT

  public uri: string;
  public languageId: string;
  public version: number;
  public content: string;
  public lines = number[];

  // NODE

  public cursor: number = NaN;
  public variables: object;
  public root: Node = null;
  public node: Node;

  // DATA

  public errors: IDiagnostic[] = []
  public regions: Embed[] = [];
  public linting: TextEdit[] = []
  public changes: Array<{ range: Range, text: string }> = [];

  // UPDATES

  increment(extension?: string): TextDocument;

  // MISCELLANEOUS

  literal (extension: string = 'tmp'): TextDocument
  report (error: ParseError): (location?: Range | undefined) => void

  // LOCATION

  positionAt(location: number): Position;
  offsetAt(location: Position): number;
  getRange(start?: number, end?: number): Range;
  getRangeOffsets(location: Range): [number, number];
  getLineRange(location: Position | number): Range;

  // FINDERS

  getText(location?: Range | Position | number | [number, number]): string;
  getNodeAt(position: Position | number, updateNode?: boolean): INode | false;

  // QUERIES

  isCodeChar (code: number, offset: number): boolean;
  isPrevCodeChar (code: number, offset: number): boolean;
  withinEndToken (location: Position | number, node?: Node): boolean
  withinNode (location: Position | number, node?: Node): boolean
  withinContent (location: Position | number, node?: Node): boolean
  withinToken (location: Position | number, node?: Node): boolean

}
```

### Nodes

Each node contained on the AST is a class instance. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below.

<!-- prettier-ignore -->
````typescript
export class Node {

  // DATA

  public kind: NodeKind = NodeKind.Liquid
  public offsets: [number?, number?, number?, number?] = [];
  public objects?: object;
  public attributes?: object;
  public filters?: object;
  public type: Type | NodeType;
  public languageId?: NodeLanguage;
  public scope: string | number | IScopes;
  public tag: string;
  public root: number;
  public index: number;
  public parent: Node;
  public children: Node[] = [];
  public singular: boolean;
  public lastError: number;
  public errors: number[] = []

  // LOCATION

  get start(): number;
  get end(): number;
  get range():  { start?: Position; end?: Position };

  // NAVIGATE
  get nextSibling (): Node | null
  get prevSibling (): Node | null
  get firstChild (): Node | null
  get lastChild (): Node | null

  // TOKENS
  get startToken(): string;
  get endToken(): string | null;
  get innerContent(): string | null;

  // METHODS

  public getNodeAt (offset: number): Node
  public isSameNode (tag: string, kind: NodeKind): boolean

}
````

## Grammar

Liquid exists in a multitude of variations and no official grammar exists for the language outside of what one can find in its [standard](https://shopify.github.io/liquid/) open sourced variation. In order for the parser to compose a detailed AST it leverages a collection of grammars made available via variation specifications. These specs are data reference files that describe Liquid syntax structures.

- [Liquid Specifications](#)
- [HTML Specifications](#)

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

```cli

pnpm test **    --flags  Tests a file in watch mode
pnpm test:cases --flags  Runs all test which exists within /cases directory

```

## License

[CC BY-NC-ND 4.0](#LICENSE)

## Credits

This parser is made possible through the open sourced works of Microsoft, specifically that of [VSCode](https://code.visualstudio.com/). Patterns and logic implemented in this module have been loosely based upon and adapted from the following projects:

- [vscode-languageserver-node](https://github.com/microsoft/vscode-languageserver-node)
- [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice)
