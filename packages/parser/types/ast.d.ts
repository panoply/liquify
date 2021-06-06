import { NodeKind } from "lexical/kind";
import { TokenContext } from "lexical/context";
import { NodeType } from "lexical/types";
import { NodeLanguage } from "lexical/language";
import {
  TextDocument,
  Position,
  Range,
} from "vscode-languageserver-textdocument";
import {
  TextDocumentContentChangeEvent,
  TextDocumentItem,
  VersionedTextDocumentIdentifier,
  Diagnostic,
} from "vscode-languageserver";
import { IParseError, Token, Offsets } from "./parser";

/**
 * Document Create
 *
 * Adds a document reference to `Documents` map, run a full document
 * scan on the passed in text document. This executes a parse
 */
export function DocumentScan(textDocumentItem: TextDocumentItem): AST;

/**
 * Document Get
 *
 * Returns a text document literal. We try to this as fast as possible,
 * within the Document manager a letting scope holds the most recent
 * text document instance, we check it before querying the `Documents` map.
 */
export function DocumentGet(uri: string): AST | Error;

/**
 * Document Changes
 *
 * Executes a partial scan and updates the document via the TextDocument
 * manager module. This executes a parse.
 */
export function DocumentUpdate(
  textDocument: VersionedTextDocumentIdentifier,
  contentChanges: {
    /**
     * The range of the document that changed.
     */
    range: Range;
    /**
     * The new text for the provided range.
     */
    text: string;
  }[]
): AST;

/* -------------------------------------------- */
/* AST                                          */
/* -------------------------------------------- */

/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
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
   * transplies via babel.
   */
  get textDocument(): TextDocument;
  set textDocument(newDocment: TextDocument);

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

/* -------------------------------------------- */
/* AST NODE                                     */
/* -------------------------------------------- */

/**
 * Node Children
 *
 * The Children property array contains the children contained
 * within a tag.
 *
 * **IMPORTANT**
 *
 * It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 */
export interface Children {
  name: string;
  token: string;
  offset: number[];
  range: Range;
  objects?: Specs.Objects;
}

/**
 * Node Context
 *
 * Decribes the inner context of each node token.
 */
export interface Context {
  type: TokenContext;
  value?: string | number;
  start: number;
  end: number;
}

/**
 * AST Node
 *
 * This instance is generated for every node we encounter. It
 * contains methods to interact with that specific node.
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

export function INode(document: AST): typeof ASTNode;
