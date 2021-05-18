import { TokenType } from "../src/enums/types";
import { TokenKind } from "../src/enums/kinds";
import { TokenContext } from "../src/enums/context";
import { ParseError } from "../src/enums/errors";
export { TokenTags } from "../src/enums/tags";
export { Options } from "./options";
export * from "@liquify/liquid-language-specs";
export { TokenContext } from "../src/enums/context";

/**
 * Tags are captured and applied as an array of strings.
 * There should never be more than 2 values that exist here.
 * When the parser encounters tag blocks, value will be 2.
 */
export type Token = string;

/**
 * Tags offsets reflect the positions of each captured token
 * in the document. Offsets will either have a value of 2 or 4.
 */
export type Offsets = number[];

/**
 * Line and Character position
 */
export type Location = { line: number; character: number };

/**
 * Line and Character starting point and end point position
 */
export type Range = { start?: Location; end?: Location };

/**
 * Line and Character position
 */
export type Cursor = Specs.IObject | Specs.IFilter | Specs.ITag;

/**
 * The Children property array contains the children contained
 * within a tag. It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 */
export interface Children {
  name: string;
  token: Token;
  offset: Offsets;
  range: Range;
  objects?: Specs.Objects;
}

/* -------------------------------------------- */
/*                  DIAGNOSTIC                  */
/* -------------------------------------------- */

/**
 * The diagnostic tags.
 */
export enum DiagnosticTag {
  /**
   * Unused or unnecessary code.
   *
   * Clients are allowed to render diagnostics with this tag faded out instead of having
   * an error squiggle.
   */
  Unnecessary = 1,
  /**
   * Deprecated or obsolete code.
   *
   * Clients are allowed to rendered diagnostics with this tag strike through.
   */
  Deprecated = 2,
}

/* -------------------------------------------- */
/*                      AST                     */
/* -------------------------------------------- */
export interface ASTNode {
  name: string;
  get start(): number;
  get end(): number;
  get contexts(): TokenContext
  get errors(): IParseError[]
  token: Token[];
  type: TokenType;
  kind: TokenKind;
  offsets: Offsets;
  range: Range;
  children?: Children[];
  content: string;
  objects?: Map<number, string>
  filters?: Map<number, string>
  offset(offset: number): void
  context(contextId: TokenContext): void
  error(errorId: number): void
  hierarch(nodeIndex: number):void;
}

export interface IParseError {
  /**
   * The range at which the message applies
   */
  range: Range;
  /**
   * The diagnostic's severity. Can be omitted. If omitted it is up to the
   * client to interpret diagnostics as error, warning, info or hint.
   */
  severity?: ParseError;
  /**
   * The diagnostic's message. It usually appears in the user interface
   */
  message: string;
  /**
   * Additional metadata about the diagnostic.
   */
  code?: DiagnosticTag[];
}

/**
 * IFIlter Specification tracker
 */
export interface IFilter {
  /**
   * The name of the filter
   */
  name: string;
  /**
   * If we are within a filter, used when we are parsing
   * a filter argument object.
   */
  within: boolean;
  /**
   * The Argument we are currently parsing, this is incremented
   * via the filter.next() method getter.
   */
  argument: number;
  /**
   * The specification reference for the filter. This is applied
   * when we encounter a filter in a token ad changes each
   * time a new filter identifier is detected.
   */
  spec: Specs.IFilter;
}

export interface IScanner {
  readonly index: number;
  readonly position: number;
  readonly token: string;
  readonly spec: Specs.Variation;
  readonly line: number;
  readonly error: number;
  getToken: () => string;
  getText: () => string;
  getRange: () => string;
}

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
