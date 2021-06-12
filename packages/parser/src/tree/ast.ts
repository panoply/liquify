import inRange from 'lodash/inRange';
import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
import { NodeType } from 'lexical/types';
import { NodeKind } from 'lexical/kind';
import { Config } from 'config';
import * as context from 'tree/context';
import * as s from 'parser/stream';
import { INode } from 'tree/node';
import { GetFormedRange } from 'parser/utils';
/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
export class IAST {

  constructor (uri: string, languageId: string, version: number, content: string) {

    this.uri = uri;
    this.languageId = languageId;
    this.version = version;
    this.content = s.Create(content);
    this.lines = this.getLineOffsets();

  }

  /**
   * The documents URI identifier
   */
  public uri: string;

  /**
   * The document version
   */
  public version: number;

  /**
   * The documents language identifier
   */
  public languageId: string;

  /**
   * The document text content in string form
   */
  public content: string;

  /**
   * Line offsets for the document
   */
  public lines: number[]

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
      this.uri + '.' + extension,
      this.languageId,
      this.version,
      this.content
    );
  }

  /**
   * Converts a location offset to position via
   * textDocument instance method: `positionAt()`
   */
  public positionAt (location: number): Position {

    location = Math.max(Math.min(location, this.content.length), 0);

    const lineOffsets = this.getLineOffsets();

    let low = 0; let high = lineOffsets.length;

    if (high === 0) return { line: 0, character: location };

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > location) high = mid; else low = mid + 1;
    }

    const line = low - 1;

    return {
      line,
      character: location - lineOffsets[line]
    };

  }

  /**
   * Converts a position to an offset via
   * textDocument instance method `offsetAt()`
   */
  public offsetAt (location: Position): number {

    const lineOffsets = this.getLineOffsets();

    if (location.line >= lineOffsets.length) return this.content.length;
    else if (location.line < 0) return 0;

    const lineOffset = lineOffsets[location.line];
    const nextLineOffset = (location.line + 1 < lineOffsets.length)
      ? lineOffsets[location.line + 1]
      : this.content.length;

    return Math.max(
      Math.min(lineOffset + location.character, nextLineOffset),
      lineOffset
    );

  }

  /**
   * Range
   *
   * Returns `start` and `end` range information
   *
   * **DOES NOT MODIFY**
   *
   * ---
   *
   * @param {number} [start] defaults to cursor
   * @param {number} [end] defaults to current index
   */
  public getRange (
    start: number = s.cursor,
    end: number = s.offset
  ): Parser.Range {

    return {
      start: this.positionAt(start),
      end: this.positionAt(end)
    };
  }

  /**
   * Converts a offset/s to range location.
   * If Niether `start`or `end` params are passed,
   * the full document range is returned.
   */
  public toRange (
    start: number = 0,
    end: number = this.content.length
  ): Range {
    return {
      start: this.positionAt(start),
      end: this.positionAt(end)
    };
  }

  public getLineOffsets (): number[] {

    if (this.lines === undefined) {
      this.lines = s.ComputeLineOffsets(this.content, true);
    }

    return this.lines;

  }

  /**
   * Converts range to offset location. The returning value is of
   * type array, where the first item is `start` offset and second
   * value is `end` offset.
   */
  public toRangeOffset (location: Range): [number, number] {
    return [
      this.offsetAt(location.start),
      this.offsetAt(location.end)
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
      const { line } = this.positionAt(location);
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

    context.reset();

    return 0;
  }

  public increment (
    edits: {
      range: Range,
      text: string
    }[],
    version: number
  ) {

    this.version = version;

    let index = 0;
    const length = edits.length;

    for (; index < length; index++) {

      const change = edits[index];
      const range = GetFormedRange(change.range);
      const start = this.offsetAt(range.start);
      const end = this.offsetAt(range.end);

      this.content = this.content.substring(0, start) +
        change.text +
        this.content.substring(end, this.content.length);

      const startLine = Math.max(range.start.line, 0);
      const enderLine = Math.max(range.end.line, 0);
      const newlines = s.ComputeLineOffsets(change.text, false, start);

      let lineoffset = this.lines!;

      if (enderLine - startLine === newlines.length) {

        let i = 0;
        const len = newlines.length;

        for (; i < len; i++) lineoffset[i + startLine + 1] = newlines[i];

      } else {

        if (newlines.length < 10000) {
          lineoffset.splice(startLine + 1, enderLine - startLine, ...newlines);
        } else {
          this.lines = lineoffset = lineoffset
            .slice(0, startLine + 1)
            .concat(newlines, lineoffset.slice(enderLine + 1));
        }

      }

      const diff = change.text.length - (end - start);

      if (diff !== 0) {
        let x = startLine + 1 + newlines.length;
        const linesize = lineoffset.length;
        for (; x < linesize; x++) lineoffset[x] = lineoffset[x] + diff;
      }

      if (length - 1 === index) this.cursor = start;

    }

    s.Create(this.content);

    if (edits.length > 1 || this.nodes.length === 0) this.clear();

    console.log(this.cursor);

    return this.update();

  }

  /**
   * Updates the tree when a change is performed on the document.
   * The `contentChanges` event from the Language Server is
   * passed as the parameter.
   */
  public update (): number {

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

    // console.log(node);

    if (this.errors.length > 0) {
      this.errors.splice(node.error);
    }

    if (this.embeds.length > 0) {
      this.embeds.splice(this.embeds.findIndex((n) => n >= i));
    }

    if (this.comments.length > 0) {
      this.comments.splice(this.comments.findIndex((n) => n >= i));
    }

    context.remove(node.context[0]);

    this.nodes.splice(i);

    s.Jump(node.start);

  }

  /**
     * Returns text string at offset locations. You can optionally
     * provide an `end` offset index, when non is provided, current
     * index position is used. So treat the `start` param as a backtrack
     * position.
   */
  public getText (
    location: Range | number | undefined,
    endOffset: number | undefined = undefined
  ) {

    if (typeof location === 'number') {
      return endOffset === undefined
        ? s.GetChar(location)
        : this.content.substring(location, endOffset);
    }

    if (typeof location === 'object') {
      return this.content.substring(
        this.offsetAt(location.start),
        this.offsetAt(location.end)
      );
    }

    return this.content;
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
        : this.offsetAt(position),
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
