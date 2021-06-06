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
/**
 * Creates an instance of Liquid parser and returns
 * methods to work within a Language Server.
 */
export function LiquidParser(options: Options): {
  /**
   * Returns the `Documents` Map.
   */
  get Documents(): Documents;
  /**
   * Specification Handling, exposes methods we will
   * use in the Language Server when dealing with the spec.
   */
  Spec: {
    /**
     * Defines a Liquid variation specification engine.
     * The parameter value will swap the specification.
     */
    engine(engine: Specs.Engine): void;
    /**
     * Returns the current variation being used, this will
     * align with the specified engine.
     */
    get variant(): Variation;
    /**
     * Returns each grouped spec as an `entries` array type.
     */
    get entries(): VariationEntries
  };
  /**
   * The Parser instance exposes methods we will use in
   * the language
   */
  Parser: {
    /**
     * Executes a full document scan
     */
    scan: typeof DocumentScan;
    /**
     * Returns a TextDocument Instance by its URI
     */
    document: typeof DocumentGet;
    /**
     * Updates a document, execute partial scans and
     * manages an existing text document literal.
     */
    update: typeof DocumentUpdate;
    /**
     * Executes an regular expression test at a range offset
     * location. You can use the AST method to get a range offset.
     */
    isRegExp(regex: RegExp, offset: [number, number]): boolean;
    /**
     * Validates character code matches a condition
     * at specific offset location.
     */
    isCodeChar(code: number, offset: number): boolean;
    /**
     * Validates character code matches a condition
     * at the previous offset location, (moves 2 steps back)
     */
    isPrevCodeChar(code: number, offset: number): boolean;
    /**
     * Validates character code matches a condition
     * at the next offset location, (moves 1 step forward)
     */
    isNextCodeChar(code: number, offset: number): boolean;
  };
};
```

### AST

```typescript
export class AST {
  /**
   * The TextDocument literal for the AST instance
   * We will reset this for every document change, a private
   * is assigned and maintained for each content change.
   * In addition, the `Stream` is intialized.
   *
   */
  constructor(textDocument: TextDocument);

  /**
   * Getter/Setter for the Text Document Literal,
   * its return value is a private property. The private
   * is using the private property class proposal which
   * transpile via babel.
   */
  get textDocument(): TextDocument;
  set textDocument(newDocument: TextDocument);

  /**
   * List of parsing errors and validations
   * encountered while scanning the document.
   */
  errors: Diagnostic[];

  /**
   * The cursor offset index, which is generated from
   * a start and end range position each incremental parse.
   */
  cursor: number;

  /**
   * List of indexes where embedded nodes
   * exist on the tree
   */
  embeds: number[];

  /**
   * List of indexes where comment nodes
   * exist on the tree
   */
  comments: number[];

  /**
   * List of indexes where embedded nodes
   * exist on the tree
   */
  variables: {};

  /**
   * The abstract syntax tree.
   */
  nodes: ASTNode[];

  /**
   * Returns the node at the current cursor location or null
   * if the cursor is not located within a node on the tree.
   */
  node: ASTNode;

  get lastNode(): ASTNode;
  get nextNode(): ASTNode;
  get prevNode(): ASTNode;

  /**
   * Executes a reset on tracked nodes and data within the AST.
   * Used when executing a full document parse.
   */
  clear(): void;

  /**
   * Updates the tree when a change is performed on the document.
   * The `contentChanges` event from the Language Server is
   * passed as the parameter.
   */
  update(change: TextDocumentContentChangeEvent): void;

  /**
   * Generates a document literal of current textDocument,
   *
   * @default 'tmp'
   */
  literal(extension?: string): TextDocument;

  /**
   * Converts a location offset to position via
   * textDocument instance method: `positionAt()`
   */
  positionAt(location: number): Position;
  /**
   * Converts a position to an offset via
   * textDocument instance method `offsetAt()`
   */
  offsetAt(location: Position): number;

  /**
   * Converts a offset/s to range location.
   * If Niether `start`or `end` params are passed,
   * the full document range is returned.
   */
  toRange(start?: number, end?: number): Range;

  /**
   * Converts range to offset location. The returning value is of
   * type array, where the first item is `start` offset and second
   * value is `end` offset.
   */
  toRangeOffset(location: Range): [number, number];
  /**
   * Generates a line Range from either a position or an offset.
   * The return value is a Range the will begin at start of the
   * line where the location was passed and finish at the end of
   * the line (character `0` of next line).
   */
  toLineRange(location: Position | number): Range;

  /**
   * Returns text contents via the `textDocument` instance. Accepts
   * a Range, Position, offset or offset range and will return the
   * string value found at the location.
   */
  getText(location?: Range | Position | number | [number, number]): string;

  /**
   * Attempts to find a node at either a position or offset and
   * returning the first match found between start and end location.
   * If successful, returns the Node and also updates the `node`
   * cursor property, unless false is passed as second parameter
   */
  getNodeAt(
    position: Position | number,
    updateNode?: true | false
  ): ASTNode | false;

  /**
   * Attempts to find an embed type node returning first match
   * found between the inner content start and end location.
   * If successful, returns the Node and also updates the `node`
   * cursor property.
   */
  getEmbedAt(
    position: Position | number,
    updateNode?: true | false
  ): ASTNode | false;

  /**
   * Returns all the embed type nodes found on AST.
   */
  getEmbeds(languages?: string[]): ASTNode[] | false;

  /**
   * Returns all the comment type nodes found on the AST
   */
  getComments(languages?: string[]): ASTNode[] | [];

  /**
   * Accepts a list of indexes which point to nodes on the
   * AST. This is used to (for example) return childNodes.
   */
  getNodes(indexes: number[]): ASTNode[];

  /**
   * **NOT YET AVAILABLE**
   */
  getNodeContext(node?: ASTNode): {};

  /**
   * **NOT YET AVAILABLE**
   *
   * Returns all associated type nodes, like those defined within
   * a `.liquidrc` file.
   */
  getAssociates(names: string[]): ASTNode[];

  /**
   * **NOT YET AVAILABLE**
   */
  getVariables(): void;

  /**
   * **NOT YET AVAILABLE**
   */
  getScope(): void;

  /**
   * Check if position or offset location is within range.
   * This method is a shortcut to the lodash `inRange`. It will convert
   * a position if position is passed.
   *
   * The function will checks if `n` is between `start` and up to,
   * but not including, `end`. If end is not specified, it's set to start
   * with `start` then set to `0`. If `start` is greater than `end` the
   * params are swapped to support negative ranges.
   */
  within(location: Position | number, start: number, end?: number): boolean;

  /**
   * Checks the passed in position of offset is within
   * a node between the start and end locations. It will
   * preface the `node` value assigned by either the previous
   * document change or method event.
   */
  withinNode(location: Position | number, node?: ASTNode): boolean;

  /**
   * Checks the passed in position of offset is within
   * the body of a node, between ending start token and start of
   * end token. It will preface the `node` value assigned
   * by either the previous document change or method event.
   */
  withinBody(location: Position | number, node?: ASTNode): boolean;

  /**
   * **NOT YET AVAILABLE**
   */
  withinScope(location: Position | number, node?: ASTNode): boolean;

  /**
   * Checks the passed in position of offset is within
   * a start or singular based token. It will preface
   * the `node` value assigned by either the previous
   * document change or method event.
   */
  withinToken(location: Position | number, node?: ASTNode): boolean;

  /**
   * Checks the passed in position of offset is within
   * an end token tag. It will preface the `node` value
   * assigned by either the previous document change or method event.
   */
  withinEndToken(location: Position | number, node?: ASTNode): boolean;

  /**
   * Checks the passed in position of offset is within
   * an embed type node. It shortcuts to the `withinNode` method
   * but runs some addition checks. It will preface the `node`
   * value assigned by either the previous document change or
   * method event.
   */
  withinEmbed(location: Position | number, node?: ASTNode): boolean;
}
```

### AST Nodes

Each node contained on the AST is a class instance. Depending on what type of node (tag) that is parsed some properties may differ, essentially it all boils down to the below:

````typescript
 */
export class ASTNode {
  /**
   * The name of the node
   */
  name: string;
  /**
   * The starting offset location of the node
   */
  get start(): number;
  /**
   * The ending offset location of the node
   */
  get end(): number;
  /**
   * The context indexes of the node
   */
  get context(): number[];
  /**
   * Returns a Text Document instance for embedded language
   * type nodes, else returns boolean false.
   */
  document(): TextDocument | false;
  /**
   * Returns the inner contents of the node when it is an
   * syntactic pair type, else returns a boolean false value.
   */
  get content(): string | false;
  /**
   * The string literal token value/s. When the tag is
   * syntactic the _end_ tag is the second value.
   */
  token: Token[];
  /**
   * The language pretaining to this node. This defaults
   * to a `liquid` value.
   */
  language: NodeLanguage;
  /**
   * The node type value, which is used to distinguish its
   * functionality and use, as described in Node Types.
   */
  type: NodeType;
  /**
   * The number of parsing errors encountered before this
   * node was consumed.
   */
  error: number;
  /**
   * The root node index position on the AST. It informs of
   * the parent index. If this is equal with `index` the node
   * is not a child of nested within a pair.
   */
  root: number;
  /**
   * The parent node index position on the AST. The parent index
   * is the tag which is encapsulating the node.
   */
  parent: number;
  /**
   * The index position of the node located on the AST.
   */
  index: number;
  /**
   * The nodes kind value, which is used to distinguish the
   * language it belongs to, as described in Node Kinds.
   */
  kind: NodeKind;
  /**
   * The offsets location. This contains a list of offsets,
   * starting from the open location of the node and finishing at
   * the closing location of the node. When this node is a
   * syntactic pair, it will contain `4` entries, the first `2`
   * are the starting node and the last `2` are the ending node.
   */
  offsets: Offsets;
  /**
   * The start and end Range position of the node.
   */
  range: { start?: Position; end?: Position };
  /**
   * The nodes children indexes
   *
   * **IMPORTANT**
   *
   * It's important to not that values here are only
   * applied to token that accept accept child tags, eg: `{% else %}`
   */
  children?: Children[];
  /**
   * Whether or not the node is a singular type node, ie:
   * is not syntactic.
   */
  singular: boolean;
  /**
   * Objects this tag contains. Each property contained on the
   * object is an offset location, the value of each property will either
   * be a string array or a number.
   *
   * When the value of the property is type number, is value will point to
   * offset property which contains the string values. When property values
   * are a string array, each items in that array is the property value
   * expressed.
   *
   * ----
   *
   * Example:
   *
   * `{{ object.prop.foo | filter: bar.baz }}`
   *
   * ```javascript
   * {
   *   4:[ 'object', 'prop', 'foo' ],
   *   11: 4,
   *   16: 4,
   *   30: ['bar', 'baz'],
   *   34: 30
   * }
   * ```
   *
   * Notice here how the offsets point back to the property where
   * the object began. The objects within Liquid tags are asserted
   * in this manner as we want to walk the specifications in the fasted
   * possible manner.
   */
  objects?: object | { [offset: number]: string[] | number };

  /**
   * Filters this tag contains. Each property contained on the
   * object is an offset location, its value is the name of the filter.
   *
   * @todo IMPROVE THIS LOGIC
   */
  filters?: object | { [offset: number]: string };

  /**
   * An object containing attribute values.
   *
   *  @todo IMPROVE THIS LOGIC
   */
  attributes?:
    | object
    | {
        [attribute: string]: string;
      };
}
````

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
