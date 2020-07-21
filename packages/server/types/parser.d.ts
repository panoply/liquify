import { Scope, LanguageIds } from "./documents";
import { Diagnostic, Range, DocumentLink } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JSONDocument, ASTNode } from "vscode-json-languageservice";
import { Stylesheet } from "vscode-css-languageservice";

/**
 * Tags are captured and applied as an array of strings.
 * There should never be more than 2 values that exist
 * here. When the parser encounters tag blocks, value will be 2.
 */
export type Token = string[];

/**
 * Tags offsets reflect the positions of each captured token
 * in the document. Offsets will either have a value of 2 or 4.
 */
export type Offsets = number[];

/**
 * Object properties are the the index offset location for
 * the starting point of properties.
 */
export type Objects = { [offset: string]: string[] };

/**
 * Tag filters are parsed and applied when a `|` pipe character
 * is detected within a tag. Not all tags accept filter values
 * and the parser will refer to a tags specification reference before
 * it begins parsing filters.
 */
export type Filters = { [offset: string]: string[] };

/**
 * Tag Parameters are applied to the AST Node only when detected
 * or else this property will be undefined. Tag parameters are
 * rather hard to detect in the Liquid Language as they can be applied
 * and attach value with or without seperators character (eg: `,` )
 */
export type Parameters = { [offset: string]: string[] };

/**
 * Token Tags are number references to a certain type of Liquid tag.
 * There are 5 tags, start, child, end, singular pair. Only Pair and
 * Singular tags are valid.
 */
export enum TokenTags {
  start = 1,
  close = 2,
  child = 3,
  singular = 4,
  pair = 5,
}

/**
 * Token kinds are number references to the Language syntax used
 * by tag. The parser supports both Liquid and HTML tag kinds, ie:
 * `<>` or `{% tag %}` or `{{ tag }}`
 */
export enum TokenKinds {
  html = 1,
  liquid = 2,
}
/**
 * Token types are number references to tag types. Tag types are categorized
 * by their functionality and operation in the Liquid Language.
 */
export enum TokenTypes {
  associate = 1,
  control = 2,
  comment = 3,
  embedded = 4,
  include = 5,
  iteration = 6,
  object = 7,
  variable = 8,
  raw = 8,
}

/**
 * The Children property array contains the children contained
 * within a tag. It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 */
export interface Children {
  name: string;
  tag: TokenTags;
  token: Token;
  offset: Offsets;
  objects?: Objects;
}

/* -------------------------------------------- */
/*                      AST                     */
/* -------------------------------------------- */

export interface AST {
  name: string;
  token: Token;
  tag?: TokenTags;
  type: TokenTypes;
  kind?: TokenKinds;
  offset: Offsets;
  objects?: Objects;
  filters?: Filters;
  parameters?: Parameters;
  children?: Children[];
  languageId?: string;
  lineOffset?: number;
  embeddedId?: number;
  embeddedDocument?: TextDocument;
  linkedId?: number;
  linkedDocument?: DocumentLink;
  diagnostics?: Diagnostic[];
}

/* -------------------------------------------- */
/*                SCANNER OPTIONS               */
/* -------------------------------------------- */

export interface ScannerOptions {
  ast?: AST[];
  content?: string;
  isIncrement?: boolean;
  index?: undefined | number;
}

/* -------------------------------------------- */
/*              REGULAR EXPRESSIONS             */
/* -------------------------------------------- */

export type ParseExpressions = {
  frontmatter: RegExp;
  comment: RegExp;
  parsing: RegExp;
  objects: RegExp;
  filters: RegExp;
};

/* -------------------------------------------- */
/*                    PARSER                    */
/* -------------------------------------------- */

export type ContentChangeParams = {
  range: {
    start: number;
    end: number;
  };
  rangeLength: number;
  text: string;
};

/**
 * Token Types
 *
 * @export
 */
export type IncrementalExecute = (
  ASTNode: AST,
  contentChange: ContentChangeParams
) => (
  params: []
) => {
  ast: {
    index: number;
    items: AST[];
  };
  offsets: {
    index: number;
    items: number[];
  };
};

/**
 * Token Types
 *
 * @export
 */
export type IncrementalUpdate = (
  ASTNode: AST,
  contentChange: ContentChangeParams,
  from?: number
) => {
  index: number;
  items: AST[] | number[];
};

/**
 * Token Types
 *
 * @export
 */
export type GetOffsetNearChange = (
  ASTNode: AST,
  contentChange: ContentChangeParams
) => number | null;

/**
 * Token Types
 *
 * @export
 */
export type GetOffsetOfToken = (
  ASTNode: AST,
  contentChange: ContentChangeParams,
  offsetAt: number
) => {
  ASTNode: AST;
  nodeIndex: number;
  nodeOffset: number[];
  offsetKeys: number;
};

/* -------------------------------------------- */
/*                 TOKEN CONTEXT                */
/* -------------------------------------------- */

export type TokenContext = {
  delimeters: string[];
  content: string[];
};

/**
 * Parsed Diagnostics Array
 *
 * @export
 */
export type ParsedDiagnostics = [number, Promise<object[]>];

/* -------------------------------------------- */
/*                    EXPORT                    */
/* -------------------------------------------- */

export as namespace Parser;
