import inRange from 'lodash/inRange';
import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
import { NodeType } from 'lexical/types';
import { NodeKind } from 'lexical/kind';
import { Config } from 'config';
import { Context } from 'tree/context';
import { Stream as stream } from 'parser/stream';
import { INode } from 'tree/node';

/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
export class IAST {

  /**
   * Sets the TextDocument literal for the AST instance
   * This is modified for every for each content change.
   * In addition, when an AST is created a new `stream `
   * is intialized in preparation for parsing.
   */
  constructor (textDocument: TextDocument) {
    this.textDocument = textDocument;
    stream.create();
  }

  /**
   * The TextDocument literal for the AST instance.
   * For every document, this value is unique.
   */
  public textDocument: TextDocument;

  /**
   * List of parsing errors and validations
   * encountered while scanning the document.
   */
  public errors: Parser.Diagnostic[] = [];

  /**
   * The cursor offset index, which is generated from
   * a start and end range position each incremental parse.
   */
  public cursor: number = NaN;

  /**
   * List of indexes where embedded nodes
   * exist on the tree
   */
  public embeds: number[] = [];

  /**
   * List of indexes where comment nodes
   * exist on the tree
   */
  public comments: number[] = [];

  /**
   * List of indexes where embedded nodes
   * exist on the tree
   */
  public variables: object = {};

  /**
   * The abstract syntax tree.
   */
  public nodes: INode[] = [];

  /**
   * Returns the node at the current cursor location or null
   * if the cursor is not located within a node on the tree.
   */
  public node: INode = null;

  /**
   * Generates a document literal of current
   * textDocument. This allows us to create a quick
   * temporary literal for features like formatting.
   *
   * @default 'tmp'
   */
  public literal (extension: string = 'tmp'): TextDocument {
    return TextDocument.create(
      this.textDocument.uri + '.' + extension,
      this.textDocument.languageId,
      this.textDocument.version,
      this.textDocument.getText()
    );
  }

  /**
   * Converts a location offset to position via
   * textDocument instance method: `positionAt()`
   */
  public positionAt (offset: number): Position {
    return this.textDocument.positionAt(offset);
  }

  /**
   * Converts a position to an offset via
   * textDocument instance method `offsetAt()`
   */
  public offsetAt (location: Position): number {
    return this.textDocument.offsetAt(location);
  }

  /**
   * Converts a offset/s to range location.
   * If Niether `start`or `end` params are passed,
   * the full document range is returned.
   */
  public toRange (
    start: number = 0,
    end: number = this.textDocument.getText().length
  ): Range {
    return {
      start: this.textDocument.positionAt(start),
      end: this.textDocument.positionAt(end)
    };
  }

  /**
   * Converts range to offset location. The returning value is of
   * type array, where the first item is `start` offset and second
   * value is `end` offset.
   */
  public toRangeOffset (location: Range): [number, number] {
    return [
      this.textDocument.offsetAt(location.start),
      this.textDocument.offsetAt(location.end)
    ];
  }

  /**
   * Generates a line Range from either a position or an offset.
   * The return value is a Range the will begin at start of the
   * line where the location was passed and finish at the end of
   * the line (character `0` of next line).
   */
  public toLineRange (location: number | Position): Range {
    const range = {
      start: {
        character: 0,
        line: 0
      },
      end: {
        character: 0,
        line: 0
      }
    };

    if (typeof location === 'number') {
      const { line } = this.textDocument.positionAt(location);
      range.start.line = line;
      range.end.line = line + 1;
      return range;
    }

    range.start.line = location.line;
    range.end.line = location.line + 1;

    return range;
  }

  /* -------------------------------------------- */
  /* NODE QUERIES                                 */
  /* -------------------------------------------- */

  /**
   * Executes a reset on tracked nodes and data within the AST.
   * Used when executing a full document parse.
   */
  private clear () {
    this.embeds = [];
    this.errors = [];
    this.nodes = [];
    this.comments = [];

    Context.reset();
  }

  /**
   * Updates the tree when a change is performed on the document.
   * The `contentChanges` event from the Language Server is
   * passed as the parameter.
   */
  public update (edits: any) {
    // Lets create a new stream
    stream.create();

    this.cursor = this.offsetAt(edits[edits.length - 1].range.start);

    if (edits.length > 1 || this.nodes.length === 0) return this.clear();

    let i = 0;

    while (this.nodes.length > i) {
      if (this.nodes[i].end > this.cursor) break;
      else i++;
    }

    if (i === 0) return this.clear();

    i = i - 1;

    const node =
      this.nodes[i].root === 0 &&
      this.nodes[i].parent === this.nodes[i].index &&
      this.nodes[i].index > 0
        ? this.nodes[i]
        : this.nodes[this.nodes[i].root];

    console.log(node);

    stream.Jump(node.start);

    if (this.errors.length > 0) this.errors.splice(node.error);
    if (this.embeds.length > 0) { this.embeds.splice(this.embeds.findIndex((n) => n >= i)); }
    if (this.comments.length > 0) { this.comments.splice(this.comments.findIndex((n) => n >= i)); }

    Context.remove(node.context[0]);

    this.nodes.splice(i);
  }

  /**
   * Returns text contents via the `textDocument` instance. Accepts
   * a Range, Position, offset or offset range and will return the
   * string value found at the location.
   */
  public getText (location = undefined) {
    if (typeof location === 'undefined') return this.textDocument.getText();
    if (typeof location === 'number') return stream.GetChar(location);
    if (typeof location === 'object') {
      return location?.start
        ? this.textDocument.getText(location)
        : stream.GetChar(this.offsetAt(location));
    }

    return this.textDocument.getText(this.toRange(location[0], location[1]));
  }

  /**
   * Returns the previous node from the current
   * node reference.
   */
  get prevNode (): INode {
    return this.nodes[this.node.index - 1];
  }

  /**
   * Returns the next node from the current
   * node reference.
   */
  get nextNode (): INode {
    return this.nodes[this.node.index + 1];
  }

  /**
   * Returns the very last node on the AST
   */
  get lastNode (): INode {
    return this.nodes[this.nodes.length - 1];
  }

  /**
   * Attempts to find a node at either a position or offset and
   * returning the first match found between start and end location.
   * If successful, returns the Node and also updates the `node`
   * cursor property, unless false is passed as second parameter
   */
  public getNodeAt (
    position: Position | number,
    updateNode: boolean = true
  ): INode | false {
    const offset =
      typeof position === 'number' ? position : this.offsetAt(position);

    let from = 0;

    if (this.node) {
      if (offset > this.node.end) from = this.node.index;
      else if (
        (this.node.type === NodeType.embedded &&
          inRange(offset, this.node.offsets[1], this.node.offsets[2])) ||
        inRange(offset, this.node.offsets[0], this.node.offsets[1]) ||
        inRange(offset, this.node.offsets[2], this.node.offsets[3])
      ) { return this.node; }
    }

    const node = this.nodes
      .slice(from)
      .find(
        ({ offsets, type }) =>
          inRange(offset, offsets[0], offsets[1]) ||
          (type === NodeType.embedded &&
            inRange(offset, offsets[1], offsets[2])) ||
          inRange(offset, offsets[2], offsets[3])
      );

    if (!node) return false;

    if (updateNode) {
      this.node = node;
      return this.node;
    }

    return node;
  }

  /**
   * Returns a node context information.
   *
   */
  public getNodeContext (
    position: Position | number,
    node: INode = this.node
  ) {
    const offset =
      typeof position === 'number' ? position : this.offsetAt(position);
    const token = this.withinEndToken(offset, node);
    const context = node.getContext()[token ? 1 : 0];

    return context;

    /* let i = 0;

    while (context.length > i) {
      if (inRange(offset, context[i].start, context[i].end)) return context[i];
      i++;
    } */
  }

  /**
   * Attempts to find an embed type node returning first match
   * found between the inner content start and end location.
   * If successful, returns the Node and also updates the `node`
   * cursor property.
   */
  public getEmbedAt (
    position: Position | number,
    updateNode: boolean = true
  ) {
    if (this.embeds.length === 0) return false;

    const offset =
      typeof position === 'number' ? position : this.offsetAt(position);

    const index = this.embeds.findIndex((i) =>
      inRange(offset, this.nodes[i].offsets[1], this.nodes[i].offsets[2]));

    if (index < 0) return false;

    if (updateNode) {
      this.node = this.nodes[index];
      return this.node;
    }

    return this.nodes[index];
  }

  public getScope (node = this.node) {
    if (node?.parent === node.index && node?.root === node.parent) return false;

    return this.nodes[node.parent];
  }

  /**
   * Returns a parent node from the current
   * node reference or from the passed in node.
   * A parent node is the closest node of a decendents,
   * essentially the one encapsulting it. This is
   * different from a root node.
   */
  public getParentNode (node = this.node): INode | false {
    return node.parent === node.index && node?.root === 0
      ? false
      : this.nodes[node.parent];
  }

  /**
   * Accepts a list of indexes which point to nodes on the
   * AST. This is used to (for example) return childNodes.
   */
  public getNodes (indexes: number[]): INode[] {
    return indexes.map((n) => this.nodes[n]);
  }

  /**
   * Returns all the comment type nodes found on the AST.
   * We need a method for this as comments may sometimes
   * contain rulesets or their contents used in features.
   */
  public getComments (): INode[] | false {
    if (this.comments.length === 0) return false;

    return this.comments.map((n) => this.nodes[n]);
  }

  /**
   * Returns all the embed type nodes found on AST.
   * Embeds are nodes that contain different languages
   * within thier contents. You can optionally past an
   * array list of languages to filter from results.
   */
  public getEmbeds (languages: string[] = undefined): INode[] | false {
    if (this.embeds.length === 0) return false;

    const embeds = this.embeds.map((n) => this.nodes[n]);

    return languages
      ? embeds.filter((n) => languages.includes(n.language))
      : embeds;
  }

  public getAssociates () {
    return [];
  }

  public getVariables () {
    return null;
  }

  /* -------------------------------------------- */
  /* WITHIN CHECKS                                */
  /* -------------------------------------------- */

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
  private within (
    position: Position | number,
    start: number,
    end?: number
  ): boolean {
    return inRange(
      typeof position === 'number'
        ? position
        : this.textDocument.offsetAt(position),
      start,
      end
    );
  }

  /**
   * Check if the node is within scope. This is executed at the parse
   * level and requires an expression `OR`.
   */
  public withinScope (node: INode, scope: RegExp): boolean {
    const parentNode = this.getParentNode(node);
    if (parentNode) return scope.test(parentNode.name);
  }

  /**
   * Checks the passed in position of offset is within
   * an end token tag. It will preface the `node` value
   * assigned by either the previous document change or method event.
   */
  public withinEndToken (
    position: Position | number,
    node: INode = this.node
  ): boolean {
    if (!node || node.singular) return false;

    return this.within(position, node.offsets[2], node.offsets[3]);
  }

  /**
   * Checks the passed in position of offset is within
   * a node between the start and end locations. It will
   * preface the `node` value assigned by either the previous
   * document change or method event.
   */
  public withinNode (
    position: Position | number,
    node: INode = this.node
  ): boolean {
    if (!node) return false;

    return this.within(position, node.start, node.end);
  }

  /**
   * Checks the passed in position of offset is within
   * the body of a node, between ending start token and start of
   * end token. It will preface the `node` value assigned
   * by either the previous document change or method event.
   */
  public withinBody (
    position: Position | number,
    node: INode = this.node
  ): boolean {
    if (!node || node.singular) return false;
    return this.within(position, node.offsets[1], node.offsets[2]);
  }

  /**
   * Checks the passed in position of offset is within
   * a start or singular based token. It will preface
   * the `node` value assigned by either the previous
   * document change or method event.
   */
  public withinToken (
    position: Position | number,
    node: INode = this.node
  ): boolean {
    if (!node) return false;
    return this.within(position, node.offsets[0], node.offsets[1]);
  }

  /**
   * Checks the passed in position of offset is within
   * an embed type node. It shortcuts to the `withinNode` method
   * but runs some addition checks. It will preface the `node`
   * value assigned by either the previous document change or
   * method event.
   */
  public withinEmbed (
    position: Position | number,
    node: INode = this.node
  ): boolean {
    if (!node || node.singular) return false;

    return (
      node.type === NodeType.embedded &&
      node.kind === NodeKind.Liquid &&
      Config.engine === 'shopify' &&
      this.within(position, node.start, node.end)
    );
  }

}
