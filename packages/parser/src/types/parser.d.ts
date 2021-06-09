import { Range } from 'vscode-languageserver-textdocument';
import { ErrorLevel } from '../lexical/errors';
import { NodeLanguage } from '../lexical/language';
import { Variation, VariationEntries } from '@liquify/liquid-language-specs';
import { AST, DocumentScan, DocumentUpdate, DocumentGet } from './ast';

/* -------------------------------------------- */
/* DOCUMENT                                     */
/* -------------------------------------------- */

/**
 * Documents
 *
 * Each document is stored within a map which uses its
 * URI as the key identifier.
 */
export declare type Documents = Map<string, AST>;

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
export type Cursor = Specs.IObject | Specs.IFilter | Specs.ITag;

export interface AssociateTags {
  language: NodeLanguage;
  kind: 'html' | 'liquid';
  name: string;
  attr?: string;
}
/* -------------------------------------------- */
/*                  DIAGNOSTIC                  */
/* -------------------------------------------- */

/**
 * The diagnostic tags.
 */
declare enum DiagnosticTag {
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

export interface IParseError {
  /**
   * The range at which the message applies
   */
  range: Range;
  /**
   * The diagnostic's severity. Can be omitted. If omitted it is up to the
   * client to interpret diagnostics as error, warning, info or hint.
   */
  severity?: ErrorLevel;
  /**
   * The diagnostic's message. It usually appears in the user interface
   */
  message: string;
  /**
   * Additional metadata about the diagnostic.
   */
  code?: DiagnosticTag;
}

/**
 * IFIlter Specification tracker
 */
export interface IIFilters {
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
    get entries(): VariationEntries;
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
