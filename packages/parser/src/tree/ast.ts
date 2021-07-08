import inRange from 'lodash.inrange';
import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
import { NodeType } from 'lexical/types';
import { NodeKind } from 'lexical/kind';
import { ParseError } from 'lexical/errors';
import { Config } from 'config';
import { INode } from 'tree/nodes';
import { GetFormedRange } from 'parser/utils';
import { Diagnostics, IDiagnostic } from 'lexical/diagnostics';
import * as s from 'parser/stream';

/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
export class IAST {

  constructor (

    /**
     * The documents URI identifier
     */
    public uri: string,

    /**
     * The documents language identifier
     */
    public languageId: string,

    /**
     * The document version
     */
    public version: number,

    /**
     * The document text content in string form
     */
    public content: string

  ) {

    this.uri = uri;
    this.languageId = languageId;
    this.version = version;
    this.content = s.Create(content);
    this.lines = s.ComputeLineOffsets(this.content, true);

  }

  /**
   * The content string length
   */
  get size () { return s.size; }

  /**
   * The abstract syntax tree.
   */
  get nodes (): INode[] { return this.root.children; };

  /**
   * The error diagnostics consumed by LSP
   */
  get diagnostics () { return [ ...this.errors ]; }

  /**
   * Line offsets for the document
   */
  private lines: number[] | undefined

  /**
   * The cursor offset index, which is generated from
   * a start and end range position each incremental parse.
   */
  public cursor: number = NaN;

  /**
   * List of parsing errors and validations
   * encountered while scanning the document.
   */
  public errors: IDiagnostic[] = []

  /**
   * List of indexes where embedded nodes
   * exist on the tree
   */
  public variables: object = Object.create(null);

  /**
   * Returns the node at the current cursor location or null
   * if the cursor is not located within a node on the tree.
   */
  public root: INode = null;

  /**
   * Returns the node at the current cursor location or null
   * if the cursor is not located within a node on the tree.
   */
  public node: INode;

  /**
   * Error Reporter. Generates the diagnostics which are
   * consumed within LSP.
   */
  public report (error: ParseError): (location?: Range | undefined) => void {

    const diagnostic = { ...Diagnostics[error] };

    return (location?: Range | undefined) => {

      diagnostic.range = location === undefined
        ? this.getRange()
        : location;

      this.errors.push(diagnostic);

    };
  }

  /**
   * Generates a document literal of current
   * textDocument. This allows us to create a quick
   * temporary literal for features like formatting.
   *
   * @default 'tmp'
   */
  get HTMLDocument (): TextDocument {

    return this.documents.html;

  }

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
  public positionAt (offset: number): Position {

    offset = Math.max(Math.min(offset, this.content.length), 0);

    const lineOffsets = this.getLineOffsets();

    let low = 0;
    let high = lineOffsets.length;

    if (high === 0) return { line: 0, character: offset };

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) high = mid; else low = mid + 1;
    }

    const line = low - 1;

    return {
      line,
      character: offset - lineOffsets[line]
    };

  }

  /**
   * Converts a position to an offset via
   * textDocument instance method `offsetAt()`
   */
  public offsetAt (position: Position): number {

    const lineOffsets = this.getLineOffsets();

    if (position.line >= lineOffsets.length) return this.content.length;
    else if (position.line < 0) return 0;

    const lineOffset = lineOffsets[position.line];
    const nextLineOffset = (position.line + 1 < lineOffsets.length)
      ? lineOffsets[position.line + 1]
      : this.content.length;

    return Math.max(
      Math.min(lineOffset + position.character, nextLineOffset),
      lineOffset
    );

  }

  /**
   * Returns `start` and `end` range information. Defaults
   * to the streams current cursor and offset locations if
   * no params are passed,
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
   * Converts range to offset location. The returning value is of
   * type array, where the first item is `start` offset and second
   * value is `end` offset.
   */
  public getRangeOffsets (location: Range): [number, number] {
    return [
      this.offsetAt(location.start),
      this.offsetAt(location.end)
    ];
  }

  public getLineOffsets (): number[] {

    if (this.lines === undefined) {
      this.lines = s.ComputeLineOffsets(this.content, true);
    }

    return this.lines;

  }

  /**
   * Generates a line Range from either a position or an offset.
   * The return value is a Range the will begin at start of the
   * line where the location was passed and finish at the end of
   * the line (character `0` of next line).
   */
  public getLineRange (location: number | Position): Range {

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
   * **INCREMENTAL TEXT UPDATE**
   *
   * Updates the document content string and line offsets
   * are incremental. This logic is lifted from `vscode-languageserver-node`
   * module. The vscode team chooses line/column locations opposed to
   * offsets which makes applying incremental updates to the AST difficult
   * and somewhat extrenous so only partial updates are applied to the AST
   * following content string update.
   *
   * @see https://git.io/Jnsql
   *
   * **PARTIAL AST UPDATES**
   *
   * The AST is updated directly after document content changes have
   * been applied. A _partial_ incremental update is applied to the tree
   * wherein nodes are split at the change location and re-parsed from
   * a root/singular node position existing 2 levels up in the tree.
   */
  public increment (
    edits: {
      range: Range,
      text: string
    }[],
    version: number
  ): string {

    this.cursor = NaN;
    this.version = version;
    this.errors = [];

    /* -------------------------------------------- */
    /* CONTENT UPDATE                               */
    /* -------------------------------------------- */

    for (const change of edits) {

      const range = GetFormedRange(change.range);
      const startoffset = this.offsetAt(range.start);
      const endoffset = this.offsetAt(range.end);

      this.content = (
        this.content.substring(0, startoffset) +
        change.text +
        this.content.substring(endoffset, this.content.length)
      );

      const startline = Math.max(range.start.line, 0);
      const endline = Math.max(range.end.line, 0);
      const newlines = s.ComputeLineOffsets(change.text, false, startoffset);
      const linecount = newlines.length;

      let lines = this.lines!;

      if (endline - startline === linecount) {
        for (let i = 0; i < linecount; i++) lines[i + startline + 1] = newlines[i];
      } else {
        if (linecount < 10000) lines.splice(startline + 1, endline - startline, ...newlines);
        else {
          this.lines = lines = lines
            .slice(0, startline + 1)
            .concat(newlines, lines.slice(endline + 1));
        }
      }

      const diff = change.text.length - (endoffset - startoffset);

      if (diff !== 0) {
        for (let i = startline + 1 + linecount
          , s = lines.length; i < s; i++) lines[i] = lines[i] + diff;
      }

      if (isNaN(this.cursor)) this.cursor = startoffset;

    }

    this.node = this.root.getNodeAt(this.cursor);

    return s.Create(this.content);

  }

  /**
   * Returns text string at offset locations. You can optionally
   * provide an `end` offset index, when non is provided, current
   * index position is used. So treat the `start` param as a backtrack
   * position.
   */
  public getText (
    location: Range | number | undefined,
    endOffset?: number | undefined
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
   * Attempts to find a node at either a position or offset and
   * returning the first match found between start and end location.
   * If successful, returns the Node and also updates the `node`
   * cursor property, unless false is passed as second parameter
   */
  public getNodeAt (location: Position | number): INode {

    const offset = typeof location === 'number'
      ? location
      : this.offsetAt(location);

    return this.root.getNodeAt(offset);

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
