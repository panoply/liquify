import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
import { ParseError } from 'lexical/errors';
// import { NodeLanguage } from 'lexical/language';
// import { Config } from 'config';
// import { NodeKind } from 'lexical/kind';
// import inRange from 'lodash.inrange';
import { Root, Node } from 'tree/nodes';
import { Embed } from 'tree/embed';
import { GetFormedRange } from 'parser/utils';
import { Diagnostics, IDiagnostic } from 'lexical/diagnostics';
import * as s from 'parser/stream';
// import { spec, Type } from '@liquify/liquid-language-specs';

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
  get nodes (): Node[] { return this.root.children; };

  /**
   * The error diagnostics consumed by LSP
   */
  get diagnostics () { return this.errors; }

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
   * Boolean value used to enable formatting
   */
  public format: boolean = true

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
  public root: Root = null;

  /**
   * Returns the node at the current cursor location or null
   * if the cursor is not located within a node on the tree.
   */
  public node: Node | Embed;

  /**
   * List of embedded language regions contained within the
   * document. Respects version control in virtual documents.
   */
  public regions: Embed[] = [];

  /**
   * Reference to the most recent document changes provided
   * via the language server.
   */
  public changes: Array<{ range: Range, text: string }> = [];

  /**
   * Error Reporter. Generates the diagnostics which are
   * consumed within LSP.
   */
  public report (error: ParseError): (location?: Range | undefined) => void {

    const diagnostic: IDiagnostic = Object.assign({}, Diagnostics[error]);

    return (location?: Range | undefined) => {

      if (!diagnostic.data.doFormat && this.format) this.format = false;

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
  public increment (edits: { range: Range, text: string}[], version: number): string {

    this.cursor = NaN;
    this.version = version;
    this.changes = edits;
    this.format = true;
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
  public getText (location: Range | number | undefined, endOffset?: number | undefined) {

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
  public getNodeAt (location: Position | number): Node {

    const offset = typeof location === 'number'
      ? location
      : this.offsetAt(location);

    return this.root.getNodeAt(offset);

  }

}
