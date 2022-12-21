import { LanguageProperName } from 'types/prettify';
import { Types, Structure } from '../common';

/* -------------------------------------------- */
/* DATA STRUCTURE                               */
/* -------------------------------------------- */

export interface ParseError {
  /**
   * The line number
   */
  lineNumber: number;
  /**
   * The error message
   */
  message: string;
  /**
   * The index of the data record
   */
  parseIndex: number;
  /**
   * The index of the data record
   */
  charIndex: number;
  /**
   * The index of the data record
   */
  languageName: LanguageProperName;
  /**
   * Code sample extract
   */
  note?: string;
}

/**
 * Parse Counter
 */
export interface Counter {
  end: number;
  start: number;
  index: number;
  line: number;
}

/**
 * Parsed Data
 */
export interface Data {
  /**
   * The index where the current structure begins.
   * For tokens of type start this will refer to the parent
   * container or global scope.
   */
  begin: number[];
  /**
   * The index where the current structure ends. Unlike the
   * `begin` data a token of type end refers to itself.
   */
  ender: number[];
  /**
   * The type of rules use to scan and resolve the current token.
   */
  lexer: string[];
  /**
   * Describes the white space immediate prior to the token's first
   * character. A value of `0` means no white space. A value of `1`
   * means some amount of whitespace not containing a new line character.
   * Values of `2` and greater indicate the number of new lines plus `1`.
   * For example, an empty line preceding the current token would mean a
   * value of `3`, because the white space would contain two new line characters.
   */
  lines: number[];
  /**
   * A description of the current structure represented by the
   * `begin` and `ender` data values.
   */
  stack: string[];
  /**
   * The atomic code fragment.
   */
  token: string[];
  /**
   * A categorical description of the current token. Types are defined
   * in each markdown file accompanying a respective lexer file.
   */
  types: Types[]
}

export interface Record {
  /**
   * The index where the current structure begins.
   * For tokens of type start this will refer to the parent
   * container or global scope.
   */
  begin: Data['begin'][0]
  /**
   * The index where the current structure ends. Unlike the
   * `begin` data a token of type end refers to itself.
   */
  ender: Data['ender'][0]
  /**
   * The type of rules use to scan and resolve the current token.
   */
  lexer: Data['lexer'][0]
  /**
   * Describes the white space immediate prior to the token's first
   * character. A value of `0` means no white space. A value of `1`
   * means some amount of whitespace not containing a new line character.
   * Values of `2` and greater indicate the 0 of new lines plus `1`.
   * For example, an empty line preceding the current token would mean a
   * value of `3`, because the white space would contain two new line characters.
   */
  lines: Data['lines'][0]
  /**
   * A description of the current structure represented by the
   * `begin` and `ender` data values.
   */
  stack: Data['stack'][0]
  /**
   * The atomic code fragment.
   */
  token: Data['token'][0]
  /**
   * A categorical description of the current token. Types are defined
   * in each markdown file accompanying a respective lexer file.
   */
  types: Types
}

export interface Spacer {
  array: string[];
  end : number;
  index: number;
}

export interface Splice {
  data: Data;
  howmany: number;
  index: number;
  record?: Record;
}

export interface WrapComment {
  chars: string[];
  end: number;
  lexer: string;
  start: number;
  begin: string;
  ender: string;
}

export interface IParse {

  /**
   * Parse Error
   */
  error: string;
  /**
   * Stores the final index location of the data arrays
   */
  count: number;
  /**
   *  Stores the name of the data arrays.  This is used for internal automation
   */
  datanames: string[];
  /**
   * Stores the current line number from the input string for logging parse errors
   */
  lineNumber: number;
  /**
   * Stores the 'lines' value before the next token
   */
  linesSpace: number;
  /**
   * Stores the various data arrays of the parse table
   */
  data: Data;
  /**
   * Stores the final index location of the data arrays
   */
  parse?: IParse;
  /**
   * Stores the declared variable names for the script lexer.
   * This must be stored outside the script lexer since some languages
   * recursive use of the script lexer
   */
  references: string[][];
  /**
   * Stores the stack and begin values by stacking depth
   */
  structure: Structure[];
  /**
   * An extension of `Array.prototype.concat` to work across
   * the data structure. This is an expensive operation.
   */
  concat(data: Data, array: Data): void;
  /**
   * The function that sorts object properties
   */
  objectSort(data: Data): void;
  /**
   * An extension of `Array.prototype.pop` to work across the data structure
   */
  pop(data: Data): Record;
  /**
   * An extension of `Array.prototype.push` to work across the data structure
   */
  push(data: Data, record: Record, structure: string): void;
  /**
   * A custom sort tool that is a bit more intelligent and
   * multidimensional than `Array.prototype.sort`
   */
  safeSort(array: [ token: string,
    lines: number,
    chain?: boolean][], operation: string, recursive: boolean): [ token: string,
    lines: number,
    chain?: boolean][];
  /**
   * This functionality provides corrections to the `begin` and `ender` values after use of objectSort
   */
  sortCorrection(start: number, end: number): void;
  /**
   * A simple tool to take note of whitespace between tokens parseSpacer
   */
  spacer(args: Spacer): number;
  /**
   * An extension of `Array.prototype.splice` to work across the data structure
   */
  splice(spliceData: Splice): void;
  /**
   * Parsing block comments and simultaneously applying word wrap
   */
  wrapCommentBlock(config: WrapComment): [string, number];
  /**
   * Parsing block comments and applying word wrap
   */
  wrapCommentLine(config: WrapComment): [string, number];

}

/**
 * Parse Scopes
 */
interface Scopes extends Array<[
  string,
  number]>{
  [index: number]: [string, number];
}

/* -------------------------------------------- */
/* PARSE HELPERS                                */
/* -------------------------------------------- */

export namespace Helper {

  /**
   * Utilities Helper for validating data structure types
   * in beautify parsing.
   */
  export interface Type {
    /**
     * Check whether the token type at specific index
     * equals the provided name. Returns a truthy.
     *
     * > Use `type.not()` for false comparisons.
     */
    is(index: number, name: Types): boolean;

    /**
     * Check whether the token type at specific index
     * does not equal the provided name. Returns a truthy.
     *
     * > Use `type.is()` for true comparisons.
     */
    not(index: number, name: Types): boolean;

    /**
     * Returns the `indexOf` a `data.types` name. This
     * is used rather frequently to determine the token
     * type we are dealing with.
     */
    idx(index: number, name: Types): number
  }

  /**
   * Utilities Helper for validating data structure tokens
   * in beautify parsing.
   */
  export interface Token {
    /**
     * Check whether the token equals the provided tag.
     * Returns a truthy.
     *
     * > Use `token.not()` for false comparisons.
     */
    is(index: number, tag: string): boolean;

    /**
     * Check whether the token does not equals the
     * provided tag. Returns a truthy.
     *
     * > Use `token.is()` for false comparisons.
     */
    not(index: number, tag: string): boolean;
  }

}
