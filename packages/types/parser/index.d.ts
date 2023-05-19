import { Type, Engine } from '@liquify/specs';
import { Range as Range$1, TextDocument, Position as Position$1 } from 'vscode-languageserver-textdocument';
export { Position, Range, TextDocument } from 'vscode-languageserver-textdocument';
import { N as NodeKind, a as NodeType, b as NodeLanguage, T as TagType, P as ParseError } from './language-425603bb.js';

/**
 * A tagging type for string properties that are actually document URIs.
 */
declare type DocumentUri = string;
declare namespace DocumentUri {
    function is(value: any): value is DocumentUri;
}
/**
 * A tagging type for string properties that are actually URIs
 *
 * @since 3.16.0
 */
declare type URI = string;
declare namespace URI {
    function is(value: any): value is URI;
}
/**
 * Defines an integer in the range of -2^31 to 2^31 - 1.
 */
declare type integer = number;
declare namespace integer {
    const MIN_VALUE = -2147483648;
    const MAX_VALUE = 2147483647;
    function is(value: any): value is integer;
}
/**
 * Defines an unsigned integer in the range of 0 to 2^31 - 1.
 */
declare type uinteger = number;
declare namespace uinteger {
    const MIN_VALUE = 0;
    const MAX_VALUE = 2147483647;
    function is(value: any): value is uinteger;
}
/**
 * The LSP any type.
 *
 * In the current implementation we map LSPAny to any. This is due to the fact
 * that the TypeScript compilers can't infer string access signatures for
 * interface correctly (it can though for types). See the following issue for
 * details: https://github.com/microsoft/TypeScript/issues/15300.
 *
 * When the issue is addressed LSPAny can be defined as follows:
 *
 * ```ts
 * export type LSPAny = LSPObject | LSPArray | string | integer | uinteger | decimal | boolean | null | undefined;
 * export type LSPObject = { [key: string]: LSPAny };
 * export type LSPArray = LSPAny[];
 * ```
 *
 * Please note that strictly speaking a property with the value `undefined`
 * can't be converted into JSON preserving the property name. However for
 * convenience it is allowed and assumed that all these properties are
 * optional as well.
 *
 * @since 3.17.0
 */
declare type LSPAny = any;
/**
 * Position in a text document expressed as zero-based line and character
 * offset. Prior to 3.17 the offsets were always based on a UTF-16 string
 * representation. So a string of the form `a𐐀b` the character offset of the
 * character `a` is 0, the character offset of `𐐀` is 1 and the character
 * offset of b is 3 since `𐐀` is represented using two code units in UTF-16.
 * Since 3.17 clients and servers can agree on a different string encoding
 * representation (e.g. UTF-8). The client announces it's supported encoding
 * via the client capability [`general.positionEncodings`](#clientCapabilities).
 * The value is an array of position encodings the client supports, with
 * decreasing preference (e.g. the encoding at index `0` is the most preferred
 * one). To stay backwards compatible the only mandatory encoding is UTF-16
 * represented via the string `utf-16`. The server can pick one of the
 * encodings offered by the client and signals that encoding back to the
 * client via the initialize result's property
 * [`capabilities.positionEncoding`](#serverCapabilities). If the string value
 * `utf-16` is missing from the client's capability `general.positionEncodings`
 * servers can safely assume that the client supports UTF-16. If the server
 * omits the position encoding in its initialize result the encoding defaults
 * to the string value `utf-16`. Implementation considerations: since the
 * conversion from one encoding into another requires the content of the
 * file / line the conversion is best done where the file is read which is
 * usually on the server side.
 *
 * Positions are line end character agnostic. So you can not specify a position
 * that denotes `\r|\n` or `\n|` where `|` represents the character offset.
 *
 * @since 3.17.0 - support for negotiated position encoding.
 */
interface Position {
    /**
     * Line position in a document (zero-based).
     *
     * If a line number is greater than the number of lines in a document, it defaults back to the number of lines in the document.
     * If a line number is negative, it defaults to 0.
     */
    line: uinteger;
    /**
     * Character offset on a line in a document (zero-based).
     *
     * The meaning of this offset is determined by the negotiated
     * `PositionEncodingKind`.
     *
     * If the character value is greater than the line length it defaults back to the
     * line length.
     */
    character: uinteger;
}
/**
 * The Position namespace provides helper functions to work with
 * {@link Position} literals.
 */
declare namespace Position {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line: uinteger, character: uinteger): Position;
    /**
     * Checks whether the given literal conforms to the {@link Position} interface.
     */
    function is(value: any): value is Position;
}
/**
 * A range in a text document expressed as (zero-based) start and end positions.
 *
 * If you want to specify a range that contains a line including the line ending
 * character(s) then use an end position denoting the start of the next line.
 * For example:
 * ```ts
 * {
 *     start: { line: 5, character: 23 }
 *     end : { line 6, character : 0 }
 * }
 * ```
 */
interface Range {
    /**
     * The range's start position.
     */
    start: Position;
    /**
     * The range's end position.
     */
    end: Position;
}
/**
 * The Range namespace provides helper functions to work with
 * {@link Range} literals.
 */
declare namespace Range {
    /**
     * Create a new Range literal.
     * @param start The range's start position.
     * @param end The range's end position.
     */
    function create(start: Position, end: Position): Range;
    /**
     * Create a new Range literal.
     * @param startLine The start line number.
     * @param startCharacter The start character.
     * @param endLine The end line number.
     * @param endCharacter The end character.
     */
    function create(startLine: uinteger, startCharacter: uinteger, endLine: uinteger, endCharacter: uinteger): Range;
    /**
     * Checks whether the given literal conforms to the {@link Range} interface.
     */
    function is(value: any): value is Range;
}
/**
 * Represents a location inside a resource, such as a line
 * inside a text file.
 */
interface Location {
    uri: DocumentUri;
    range: Range;
}
/**
 * The Location namespace provides helper functions to work with
 * {@link Location} literals.
 */
declare namespace Location {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri: DocumentUri, range: Range): Location;
    /**
     * Checks whether the given literal conforms to the {@link Location} interface.
     */
    function is(value: any): value is Location;
}
/**
 * Represents a related message and source code location for a diagnostic. This should be
 * used to point to code locations that cause or related to a diagnostics, e.g when duplicating
 * a symbol in a scope.
 */
interface DiagnosticRelatedInformation {
    /**
     * The location of this related diagnostic information.
     */
    location: Location;
    /**
     * The message of this related diagnostic information.
     */
    message: string;
}
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * {@link DiagnosticRelatedInformation} literals.
 */
declare namespace DiagnosticRelatedInformation {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location: Location, message: string): DiagnosticRelatedInformation;
    /**
     * Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
     */
    function is(value: any): value is DiagnosticRelatedInformation;
}
/**
 * The diagnostic's severity.
 */
declare namespace DiagnosticSeverity {
    /**
     * Reports an error.
     */
    const Error: 1;
    /**
     * Reports a warning.
     */
    const Warning: 2;
    /**
     * Reports an information.
     */
    const Information: 3;
    /**
     * Reports a hint.
     */
    const Hint: 4;
}
declare type DiagnosticSeverity = 1 | 2 | 3 | 4;
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
declare namespace DiagnosticTag {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    const Unnecessary: 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    const Deprecated: 2;
}
declare type DiagnosticTag = 1 | 2;
/**
 * Structure to capture a description for an error code.
 *
 * @since 3.16.0
 */
interface CodeDescription {
    /**
     * An URI to open with more information about the diagnostic error.
     */
    href: URI;
}
/**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */
declare namespace CodeDescription {
    function is(value: any): value is CodeDescription;
}
/**
 * Represents a diagnostic, such as a compiler error or warning. Diagnostic objects
 * are only valid in the scope of a resource.
 */
interface Diagnostic {
    /**
     * The range at which the message applies
     */
    range: Range;
    /**
     * The diagnostic's severity. Can be omitted. If omitted it is up to the
     * client to interpret diagnostics as error, warning, info or hint.
     */
    severity?: DiagnosticSeverity;
    /**
     * The diagnostic's code, which usually appear in the user interface.
     */
    code?: integer | string;
    /**
     * An optional property to describe the error code.
     * Requires the code field (above) to be present/not null.
     *
     * @since 3.16.0
     */
    codeDescription?: CodeDescription;
    /**
     * A human-readable string describing the source of this
     * diagnostic, e.g. 'typescript' or 'super lint'. It usually
     * appears in the user interface.
     */
    source?: string;
    /**
     * The diagnostic's message. It usually appears in the user interface
     */
    message: string;
    /**
     * Additional metadata about the diagnostic.
     *
     * @since 3.15.0
     */
    tags?: DiagnosticTag[];
    /**
     * An array of related diagnostic information, e.g. when symbol-names within
     * a scope collide all definitions can be marked via this property.
     */
    relatedInformation?: DiagnosticRelatedInformation[];
    /**
     * A data entry field that is preserved between a `textDocument/publishDiagnostics`
     * notification and `textDocument/codeAction` request.
     *
     * @since 3.16.0
     */
    data?: LSPAny;
}
/**
 * The Diagnostic namespace provides helper functions to work with
 * {@link Diagnostic} literals.
 */
declare namespace Diagnostic {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range: Range, message: string, severity?: DiagnosticSeverity, code?: integer | string, source?: string, relatedInformation?: DiagnosticRelatedInformation[]): Diagnostic;
    /**
     * Checks whether the given literal conforms to the {@link Diagnostic} interface.
     */
    function is(value: any): value is Diagnostic;
}
/**
 * A text edit applicable to a text document.
 */
interface TextEdit {
    /**
     * The range of the text document to be manipulated. To insert
     * text into a document create a range where start === end.
     */
    range: Range;
    /**
     * The string to be inserted. For delete operations use an
     * empty string.
     */
    newText: string;
}
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
declare namespace TextEdit {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range: Range, newText: string): TextEdit;
    /**
     * Creates an insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position: Position, newText: string): TextEdit;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range: Range): TextEdit;
    function is(value: any): value is TextEdit;
}
/**
 * An item to transfer a text document from the client to the
 * server.
 */
interface TextDocumentItem {
    /**
     * The text document's uri.
     */
    uri: DocumentUri;
    /**
     * The text document's language identifier.
     */
    languageId: string;
    /**
     * The version number of this document (it will increase after each
     * change, including undo/redo).
     */
    version: integer;
    /**
     * The content of the opened text document.
     */
    text: string;
}
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * {@link TextDocumentItem} literals.
 */
declare namespace TextDocumentItem {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri: DocumentUri, languageId: string, version: integer, text: string): TextDocumentItem;
    /**
     * Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
     */
    function is(value: any): value is TextDocumentItem;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface IDiagnostic extends Omit<Diagnostic, 'range'> {
    range?: Range | {
        start: number;
        end: number;
    };
    data?: {
        offset?: number;
        doFormat?: boolean;
        isEmbed?: boolean;
    };
}

/**
 * The publish diagnostic notification's parameters.
 */
interface PublishDiagnosticsParams {
    /**
     * The URI for which diagnostic information is reported.
     */
    uri: DocumentUri;
    /**
     * Optional the version number of the document the diagnostics are published for.
     *
     * @since 3.15.0
     */
    version?: integer;
    /**
     * An array of diagnostic information items.
     */
    diagnostics: Diagnostic[];
}
interface INode {
    /**
     * The name of the node, ie: tag name
     */
    tag: string;
    /**
     * The node kind reference
     */
    kind: NodeKind;
    /**
     * HTML Attributes
     */
    attributes?: object;
    /**
     * Node Type
     */
    type: Type | NodeType;
    /**
     * Language ID
     */
    languageId?: NodeLanguage;
    /**
     * The ROOT Node index
     */
    root: number;
    /**
     * The Node index
     */
    index: number;
    /**
     * The Parent of this node
     */
    parent: INode;
    /**
     * Children contained within this node
     */
    children: INode[];
    /**
     * Whether or not the not is a singular type
     */
    singular: boolean;
    /**
     * Line number
     */
    line: number;
    /**
     * The parse error indexes of the node
     */
    errors: number[];
    /**
     * The nodes arguments. This typically going hold reference
     * to parameters and arguments. Similar to `filters` and `objects`
     * this key value is an object type who's properties are offset
     * indexes which point to a `string[]` list. In parameter structures
     * the list will hold 2 entries.
     */
    arguments?: {
        [offset: number]: string[] | number;
    };
    /**
     * Holds the offset indexes of the opening and closing
     * locations of the node. The offsets property will either
     * have `2` or `4` values. Singular type nodes will have `2`
     * whereas Start/End type tokens will hold `4`.
     *
     * ---
     *
     * This is the what each offset infers:
     *
     * ```javascript
     *
     * [0]          [1]
     *  |            |
     *  {{ singular }}
     *
     * //---------------------------------------
     *
     * [0]        [1]
     *  |          |
     *  {%  tag   %}
     *
     *  {% endtag %}
     *  |          |
     * [2]        [3]
     * ```
     *
     */
    offsets: [number?, number?, number?, number?];
    /**
     * The var property holds the **keyword** value of an
     * assignment variable like that of `assign` and `capture`
     */
    variable?: string;
    /**
     * Objects this tag contains. Each property contained on the
     * object is an offset location, the value of each property will either
     * be a string array or a number.
     *
     * When the value of the property is type number, its value will point to
     * an offset property which contains the string values. When property values
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
     *   4: [ 'object', 'prop', 'foo' ],
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
    objects?: {
        [offset: number]: Array<string | number> | number;
    };
    /**
     * Filters work in an almost identical manner to `objects` with some
     * slight differences overall.
     */
    filters?: {
        [offset: number]: string[] | number;
    };
    /**
     * Tag scopes represent references and assignments. The information
     * contained on the scope property differs depending on the type of tag we
     * are dealing with.
     */
    scope?: {
        [tag: string]: any;
    } | undefined;
    /**
     * Returns the token (tag) inner contents as string with the `open`
     * and `close` delimiters characters removed. For example, take the
     * following tag:
     *
     * `{%- if foo == bar -%}`
     *
     * This getter will return:
     *
     * ` if foo == bar `
     *
     * Notice how the deimiters are omitted, this is the intended behaviour.
     * This getter differs from `innerContent` in the sense that does not return
     * the content of the contained region.
     *
     * Use the `startToken` getter to return the full contents with delimiters.
     */
    get tokenContent(): string;
    /**
     * Returns the token (tag) inner contents contained between a `start` and `end`
     * tag region as a string. This getter cannot be used on singular tag types.
     *
     *```javascript
  
     * {% tag %}
     *
     * // This content will be returned, the {% tag %} and {% endtag %} excluded
     *
     * {% endtag %}
     *
     *```
     *
     */
    get innerContent(): string;
    /**
     * Returns the starting offset index of this node
     */
    get tagType(): TagType;
    /**
     * Returns the starting offset index of this node
     */
    get start(): number;
    /**
     * Returns the start token as a string
     */
    get startToken(): string;
    /**
     * Returns the ending offset index of this node
     */
    get end(): number;
    /**
     * Returns the end token as a string
     */
    get endToken(): string;
    /**
     * The start and end Range position of the node.
     */
    get range(): Range$1;
    /**
     * Returns the previous sibling immediately preceding this node.
     * If the previous node is the fist child of this parent then
     * `null` is returned.
     */
    get prevSibling(): INode | null;
    /**
     * Returns the next sibling immediately following this node.
     * If the next node is the last child of this parent then
     * `null` is returned.
     */
    get nextSibling(): INode | null;
    /**
     * Returns the first child in this nodes tree. Returns `null`
     * if the node has no children or is a void/singular type.
     */
    get firstChild(): INode | null;
    /**
     * Returns the previous child in the node tree. When only 1 child
     * exists within the tree the parent is returned, else we return
     * the previous child
     */
    get prevChild(): INode;
    /**
     * Returns the last child in this nodes tree. Returns `null`
     * if the node has no children or is a void/singular type.
     */
    get lastChild(): INode | undefined;
    /**
     * Returns the last word from the current cursor position.
     * If no word is found, returns
     */
    get lastWord(): string;
    /**
     * Validates a node tag and kind. This is used by the parser
     * to detect parent nodes.
     */
    isSameNode(tag: string, kind: NodeKind): boolean;
    /**
     * Returns node at the provided offset location.
     * Use the AST `getNodeAt()` method to convert from
     * a position to offset and return this method.
     */
    getNodeAt(offset: number): INode;
}

/**
 * AST Node
 *
 * Creates token nodes on the AST
 */
declare class Node implements INode {
    kind: NodeKind;
    offsets: [number?, number?, number?, number?];
    attributes?: object;
    type: Type | NodeType;
    languageId?: NodeLanguage;
    line: number;
    tag: string;
    variable?: string;
    root: number;
    index: number;
    parent: INode;
    children: INode[];
    scope: {};
    objects?: {};
    filters?: {};
    arguments?: {};
    singular: boolean;
    errors: number[];
    constructor(type: NodeType, start?: number, parent?: INode, kind?: NodeKind);
    get tagType(): TagType;
    get start(): number;
    get startToken(): string;
    get end(): number;
    get endToken(): string;
    get tokenContent(): string;
    get innerContent(): string;
    get range(): Range$1;
    get prevSibling(): INode;
    get nextSibling(): INode;
    get firstChild(): INode;
    get prevChild(): INode;
    get lastChild(): INode;
    get lastWord(): string;
    isSameNode(tag: string, kind: NodeKind): boolean;
    /**
     * Returns node at the provided offset location.
     * Use the AST `getNodeAt()` method to convert from
     * a position to offset and return this method.
     *
     * - Lifted from vscode-html-languageservice
     */
    getNodeAt(offset: number): INode | this;
}

declare class Embed extends Node {
    constructor({ start, parent, kind, tag, type }: INode);
    /**
     * The index reference of the embedded region on `AST.regions[]`
     */
    regionIndex: number;
    /**
     * The line offset number of the embedded region. This points to
     * the start range line number and used to align features in LSP.
     */
    regionOffset: number;
    /**
     * Embedded Language ID. This value excludes `HTML` and `Liquid` and
     * used to identify the language
     */
    languageId: Exclude<NodeLanguage, NodeLanguage.liquid | NodeLanguage.html>;
    /**
     * The TextDocument literal reference. This value is passed to Language
     * service within LSP.
     */
    textDocument: TextDocument;
    /**
     * Region
     *
     * Typically generated on the first parse. Creates an embedded document
     * region TextDocument. The embed is stored on the AST `embedded` array
     * and a reference to its index is added on the node.
     */
    region(index: number, literal: TextDocument): number;
    /**
     * Parses the inner contents of the node and returns a workable
     * strucuture for usage in the Language Server. Typically used
     * for `{% schema %}` and `---` YAML Frontmatter regions.
     */
    parse<T>(): T;
    compatible(): TextDocument;
    /**
     * Create
     *
     * Typically generated on the first parse. Creates an embedded document
     * region TextDocument. The embed is stored on the AST `embedded` array
     * and a reference to its index is asserts on the node.
     */
    private create;
    /**
     * Update
     *
     * Updates an embedded region text document. The inner contents
     * of the embeds will remain untouched, retaining a their versions
     * unless adjustments are detected within the nodes.
     */
    private update;
}

/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */
declare class AST {
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
    /**
     * The current document instance
     */
    static document: AST;
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
     * The content string length
     */
    get source(): string;
    /**
     * The abstract syntax tree.
     */
    get nodes(): INode[];
    /**
     * File context information which described the document
     *
     * @todo
     */
    readonly file: {
        type: 'snippet' | 'section' | 'template';
    };
    /**
     * The error diagnostics consumed by LSP
     */
    selection: Range$1;
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
     * Global scopes
     */
    scopes: {
        [name: string]: Node;
    };
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
        range: Range$1;
        text: string;
    }>;
    /**
     * Warning Reporter. Generates the warning diagnostics which are
     * consumed within LSP. This does not support curried callback
     */
    warning(warning: ParseError): void;
    /**
     * Error Reporter. Generates the diagnostics which are
     * consumed within LSP.
     */
    report(error: ParseError): (location?: Range$1 | undefined) => void;
    /**
     * The error diagnostics consumed by LSP
     */
    diagnostics(): PublishDiagnosticsParams;
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
    positionAt(offset: number): Position$1;
    /**
     * Converts a position to an offset via
     * textDocument instance method `offsetAt()`
     */
    offsetAt(position: Position$1): number;
    /**
     * Returns `start` and `end` range information. Defaults
     * to the streams current cursor and offset locations if
     * no params are passed,
     */
    getRange(start?: number, end?: number): Range$1;
    /**
     * Converts range to offset location. The returning value is of
     * type array, where the first item is `start` offset and second
     * value is `end` offset.
     */
    getRangeOffsets(location: Range$1): [number, number];
    getLineOffsets(): number[];
    /**
     * Generates a line Range from either a position or an offset.
     * The return value is a Range the will begin at start of the
     * line where the location was passed and finish at the end of
     * the line (character `0` of next line).
     */
    getLineRange(location: number | Position$1): Range$1;
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
        range: Range$1;
        text: string;
    }[], version: number): string;
    /**
     * Returns text string at offset locations. You can optionally
     * provide an `end` offset index, when non is provided, current
     * index position is used. So treat the `start` param as a backtrack
     * position.
     */
    getText(location: Range$1 | number | undefined, endOffset?: number | undefined): string;
    /**
     * Attempts to find a node at either a position or offset and
     * returning the first match found between start and end location.
     * If successful, returns the Node and also updates the `node`
     * cursor property, unless false is passed as second parameter
     */
    getNodeAt(location: Position$1 | number): INode;
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
    withinEndToken(location: Position$1 | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * a node between the start and end locations. It will
     * preface the `node` value assigned by either the previous
     * document change or method event.
     */
    withinNode(location: Position$1 | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * the body of a node, between ending start token and start of
     * end token. It will preface the `node` value assigned
     * by either the previous document change or method event.
     */
    withinContent(location: Position$1 | number, node?: Node): boolean;
    /**
     * Checks the passed in position of offset is within
     * a start or singular based token. It will preface
     * the `node` value assigned by either the previous
     * document change or method event.
     */
    withinToken(location: Position$1 | number, node?: Node): boolean;
}

interface IConfig {
    /**
     * The Liquid engine (the variation name).
     * Liquify supports multiple variations and different
     * variation require different actions from the parser.
     * This defaults to `standard`.
     *
     * Please note, that you cannot parse licensed variations
     * without a valid license key which you can obtain at
     * [https://liquify.dev/license](https://liquify.dev/license).
     *
     * @default 'standard'
     */
    engine?: Engine;
    /**
     * **NOT YET AVAILABLE**
     *
     * The license key to unlock specifications and
     * provide capabilities to Liquid variations.
     *
     * You can acquire a license key to unlock variations
     * at: [https://liquify.dev/license](https://liquify.dev/license).
     *
     * @default ''
     * @deprecated
     */
    license?: string;
    /**
     * Whether or not to parse HTML markup and include
     * tags in the generated AST.
     *
     * @default true
     */
    html?: boolean;
    /**
     * An LSP specific option which informs that we will
     * be persisting, ie: executing frequent parses in watch mode.
     *
     * By setting this option to `true` the parser will keep
     * an initialize its cache model and execute partial changes,
     * similar to incremental type updates.
     *
     * @default false
     */
    persist: boolean;
    /**
     * Whether or not frontmatter should be parsed and tracked.
     * When set to `true` frontmatter data is scoped.
     *
     * @default false
     */
    frontmatter?: boolean;
    /**
     * Whether or not to process unknown tags, filter or objects
     * encountered. If this option is set to `true` the parser
     * will perform in `strict` mode and throw warnings when it
     * ecounters tokens(tags/filters) not present in specifications.
     *
     * @default true
     */
    strict?: boolean;
    /**
     * Whether or not to parse HTML comments. In Liquify, you can
     * optionally supply linting, formatting and validation rules
     * inline within Liquid or HTML comments. Settings this to `false`
     * will ignore all comments and skip their contents for inline options.
     *
     * @default true
     */
    comments?: boolean;
    /**
     * Whether or not to track variables. This is an LSP specific option,
     * which will keep a record of defined variables in a documents local
     * scope and provide them as completions and/or validate them.
     *
     * @default true
     */
    variables?: boolean;
    /**
     * Linting rules the parser should validate against. The parser
     * validates while parsing. These rulesets are digested in the language
     * server and validation (diagnostics) are thrown if rules are broken.
     * By default all rules are not active.
     */
    validate?: {
        /**
         * Whether or not values should type checked
         *
         * @default false
         */
        extraneousWhitespace: boolean;
        /**
         * Whether or not values should type checked
         *
         * @default false
         */
        tagNames: boolean;
        /**
         * Whether or not values should type checked
         *
         * @default true
         */
        tagPlacement: boolean;
        /**
         * Whether or not values should type checked
         *
         * @default true
         */
        filterNames: boolean;
        /**
         * Whether or not values should type checked
         *
         * @default true
         */
        filterArguments: boolean;
        /**
         * Whether or not to warn about unknown properties
         *
         * @default true
         */
        unknownProperties: boolean;
        /**
         * Whether or not to warn about unknown objects
         *
         * @default true
         */
        unknownObjects: boolean;
        /**
         * Whether or not values should type checked
         *
         * @default false
         */
        valueTypeChecks: boolean;
        /**
         * Validate quotation characters
         *
         * @default false
         */
        quotationCharacters: 'single' | 'double' | 'off';
        /**
         * Whether or not to validate syntactic pairs
         *
         * @default false
         */
        syntacticPairs: boolean;
    };
    /**
     *
     */
    associates?: any;
}

declare type IEmbed = Node & Embed;
declare class LiquidParser {
    constructor(options: IConfig);
    get config(): IConfig;
    /**
     * Change Specification Engine
     */
    engine(engine: Engine): void;
    parse(text: string): AST;
    /**
     * Executes a full document scan. Call this method to create
     * a document reference and perform a full text scan.
     */
    scan(textDocument: TextDocumentItem): AST;
    reparse(uri?: string): void;
    get(uri: string): AST;
    delete(uri: string): void;
    update({ textDocument, contentChanges }: any): AST;
}

export { AST as IAST, IEmbed, INode, LiquidParser };
