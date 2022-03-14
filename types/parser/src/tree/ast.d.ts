import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument';
import { ParseError } from '../lexical/errors';
import { IDiagnostic } from '../lexical/diagnostics';
import { TextEdit } from 'vscode-languageserver-types';
import { Node } from '../tree/nodes';
import { Embed } from '../tree/embed';
/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
export declare class IAST {
    /**
     * The documents URI identifier
     */
    uri: string;
    /**
     * The documents language identifier
     */
    languageId: string;
    /**
     * The document version
     */
    version: number;
    /**
     * The document text content in string form
     */
    content: string;
    constructor(
    /**
     * The documents URI identifier
     */
    uri: string, 
    /**
     * The documents language identifier
     */
    languageId: string, 
    /**
     * The document version
     */
    version: number, 
    /**
     * The document text content in string form
     */
    content: string);
    /**
     * The content string length
     */
    get size(): number;
    /**
     * The abstract syntax tree.
     */
    get nodes(): Node[];
    /**
     * The error diagnostics consumed by LSP
     */
    get diagnostics(): IDiagnostic[];
    /**
     * The error diagnostics consumed by LSP
     */
    selection: Range;
    /**
     * Line offsets for the document
     */
    private lines;
    /**
     * The cursor offset index, which is generated from
     * a start and end range position each incremental parse.
     */
    cursor: number;
    /**
     * Boolean value used to enable formatting
     */
    format: {
        enable: boolean;
        error?: IDiagnostic;
    };
    /**
     * List of parsing errors and validations
     * encountered while scanning the document.
     */
    errors: IDiagnostic[];
    /**
     * List of indexes where embedded nodes
     * exist on the tree
     */
    variables: object;
    /**
     * Returns the node at the current cursor location or null
     * if the cursor is not located within a node on the tree.
     */
    root: Node;
    /**
     * Returns the node at the current cursor location or null
     * if the cursor is not located within a node on the tree.
     */
    node: Node & Embed;
    /**
     * List of embedded language regions contained within the
     * document. Respects version control in virtual documents.
     */
    regions: Embed[];
    /**
     * Returns the node at the current cursor location or null
     * if the cursor is not located within a node on the tree.
     */
    linting: TextEdit[];
    /**
     * Reference to the most recent document changes provided
     * via the language server.
     */
    changes: Array<{
        range: Range;
        text: string;
    }>;
    /**
     * Error Reporter. Generates the diagnostics which are
     * consumed within LSP.
     */
    report(error: ParseError): (location?: Range | undefined) => void;
    /**
     * Generates a document literal of current
     * textDocument. This allows us to create a quick
     * temporary literal for features like formatting.
     *
     * @default 'tmp'
     */
    literal(extension?: string): TextDocument;
    /**
     * Converts a location offset to position via
     * textDocument instance method: `positionAt()`
     */
    positionAt(offset: number): Position;
    /**
     * Converts a position to an offset via
     * textDocument instance method `offsetAt()`
     */
    offsetAt(position: Position): number;
    /**
     * Returns `start` and `end` range information. Defaults
     * to the streams current cursor and offset locations if
     * no params are passed,
     */
    getRange(start?: number, end?: number): Parser.Range;
    /**
     * Converts range to offset location. The returning value is of
     * type array, where the first item is `start` offset and second
     * value is `end` offset.
     */
    getRangeOffsets(location: Range): [number, number];
    getLineOffsets(): number[];
    /**
     * Generates a line Range from either a position or an offset.
     * The return value is a Range the will begin at start of the
     * line where the location was passed and finish at the end of
     * the line (character `0` of next line).
     */
    getLineRange(location: number | Position): Range;
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
    increment(edits: {
        range: Range;
        text: string;
    }[], version: number): string;
    /**
     * Returns text string at offset locations. You can optionally
     * provide an `end` offset index, when non is provided, current
     * index position is used. So treat the `start` param as a backtrack
     * position.
     */
    getText(location: Range | number | undefined, endOffset?: number | undefined): string;
    /**
     * Attempts to find a node at either a position or offset and
     * returning the first match found between start and end location.
     * If successful, returns the Node and also updates the `node`
     * cursor property, unless false is passed as second parameter
     */
    getNodeAt(location: Position | number): Node;
    isCodeChar(code: number, offset: number): boolean;
    isPrevCodeChar(code: number, offset: number): boolean;
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
    private within;
    /**
     * Checks the passed in position of offset is within
     * an end token tag. It will preface the `node` value
     * assigned by either the previous document change or method event.
     */
    withinEndToken(location: Position | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * a node between the start and end locations. It will
     * preface the `node` value assigned by either the previous
     * document change or method event.
     */
    withinNode(location: Position | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * the body of a node, between ending start token and start of
     * end token. It will preface the `node` value assigned
     * by either the previous document change or method event.
     */
    withinContent(location: Position | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * a start or singular based token. It will preface
     * the `node` value assigned by either the previous
     * document change or method event.
     */
    withinToken(location: Position | number, node?: Node): boolean;
}
