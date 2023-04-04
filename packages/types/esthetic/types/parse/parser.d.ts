import { Languages } from 'lexical/enum';
import { Types, LanguageOfficialName, LanguageName } from '../shared';
import { StackItem } from 'types/next';

export interface Scope {
  get token (): string;
  set token (token: string)
  get index (): number;
  set index (index: number)
}

/* -------------------------------------------- */
/* LEXING                                       */
/* -------------------------------------------- */

export interface VariableDeclarations {
  /**
   * Count reference
   */
  count: number[];
  /**
   * Index Reference
   */
  index: number[];
  /**
   * Word Stores
   */
  word: string[];
}

/* -------------------------------------------- */
/* DATA STRUCTURE                               */
/* -------------------------------------------- */

export interface IParseError {
  /**
   * The error message, to be thrown (combines all refs in this model)
   */
  message?: string;
  /**
   * Error details, holds more informative information about error
   */
  details?: string;
  /**
   * Snippet Error Code Sample
   */
  snippet?: string;
  /**
   * The parse error code enum reference
   */
  code?: number;
  /**
   * The error syntax Language (Proper Name)
   */
  language?: LanguageOfficialName;
  /**
   * The range based location of the error.
   */
  location?: {
    /**
     * The starting point of the error
     */
    start: {
      /**
       * The starting line number of the error
       */
      line: number;
      /**
       * Thestarting  character numer of the error
       */
      character: number;
      /**
       * The starting index offset of the error
       */
      offset: number;
    };
    end: {
      /**
       * The ending line number of the error
       */
      line: number;
      /**
       * The ending  character numer of the error
       */
      character: number;
      /**
       * The ending index offset of the error
       */
      offset: number;
    }
  };
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
   *
   * The record `lines` value count before the next token, for example:
   *
   * ```
   *
   * 1 | foo  // line offset is: 0
   * 2 | bar  // line offset is: 2
   * 3
   * 4 | baz  // line offset is: 3
   * 5
   * 6
   * 7 | qux  // line offset is: 4
   * 8 | xxx  // line offset is: 2
   *
   *
   * ```
   *
   * Where `foo` is `0` as it exists on line `1` but `bar` is `2` because
   * it counts line `1` as a single line and given it exists on line `2`
   * another line offset increment is applies. The word `baz` is similar to
   * `bar` but has a count of `3` given a newline exists above it and this
   * pattern follows as we progress to `qux` which has 2 newlines, equating
   * to a value line offset of `4` whereas `xxx` only has `2` so on and so forth.
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
  begin: Data['begin'][number]
  /**
   * The index where the current structure ends. Unlike the
   * `begin` data a token of type end refers to itself.
   */
  ender: Data['ender'][number]
  /**
   * The type of rules use to scan and resolve the current token.
   */
  lexer: Data['lexer'][number]
  /**
   * Describes the white space immediate prior to the token's first
   * character. A value of `0` means no white space. A value of `1`
   * means some amount of whitespace not containing a new line character.
   * Values of `2` and greater indicate the 0 of new lines plus `1`.
   * For example, an empty line preceding the current token would mean a
   * value of `3`, because the white space would contain two new line characters.
   */
  lines: Data['lines'][number]
  /**
   * A description of the current structure represented by the
   * `begin` and `ender` data values.
   */
  stack: Data['stack'][number]
  /**
   * The atomic code fragment.
   */
  token: Data['token'][number]
  /**
   * A categorical description of the current token. Types are defined
   * in each markdown file accompanying a respective lexer file.
   */
  types: Types
}

/**
 * Syntactical Tracking
 *
 * Maintains a reference of start and end type tokens
 * to be tracked ensuring opening and ending counts
 * match correctly. The data stored in this model is
 * used by the Parse Error logic.
 */
export interface Syntactic {
  line?: number;
  index?: number;
  expect?: string;
  token?: string;
  stack?: string;
  type?: Languages
}

export type ParseHook = (
  this: {
    /**
     * The current line number
     */
    readonly lineNumber: number;
    /**
     * The current stack item reference
     */
    readonly stack: StackItem;
    /**
     * The current language
     */
    readonly language: LanguageName;
  },
  /**
   * The parse table record to be inserted
   */
  record: Record,
  /**
   * The parse table index
   */
  index?: number
) => void | Record

export type FormatHook = ((
  this: {
    /**
     * Parse table Record
     */
    readonly record: Record;
    /**
     * The language name
     */
    readonly language: LanguageName;
    /**
     * Indentation levels
     */
    readonly levels: number[];
    /**
     * The current structure reference
     */
    readonly structure: string[]
  },
  /**
   * The we are working with
   */
  token: string,
  /**
   * The level at which the token will be indentd
   */
  level?: number
) => void | {
  /**
   * New token write
   */
  token?: string;
  /**
   * New level to indent
   */
  level?: number
})

export interface Hooks {
  /**
   * Parse hooks
   */
  parse?: ParseHook[];

  /**
   * Format hooks
   */
  format?: FormatHook[];
}

export interface Spacer {
  /**
   * The characters to scan. This is the `split` source string
   */
  array: string[];
  /**
   * The length of the array used to break the loop
   */
  end : number;
  /**
   * The index to start scanning from
   */
  index: number;
}

export interface Splice {
  /**
   * The parse table data structure object to alter
   */
  data: Data;
  /**
   * How many indexes to remove
   */
  howmany: number;
  /**
   * The index where to start
   */
  index: number;
  /**
   * A new parse table record to insert
   */
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

export interface LiquidInternal {
  /**
   * Pipes (Filters)
   *
   * A list of indexes which reference Liquid filter pipes:
   *
   * @example
   *
   * {{ object.prop | filter | filter }}
   *
   * // Indexes of the pipes will be stored
   */
  pipes: number[];
  /**
   * Filter Arguments
   *
   * A list of indexes which reference Liquid filter arguments. The
   * store is an array or arrays. Each entry holds the the indexes
   * of the `pipes[]` entry.
   *
   *
   * @example
   *
   * {{ object.prop | filter: arg_1: 'x', arg_2: 'xx' | filter: arg_1: 'x'  }}
   *
   * // Indexes of the arguments after the filter: parameter. The structure
   * // would describe it as follows:
   * //
   * // pipes[0]
   * // fargs[0][0] fargs[0][1]
   * //
   * // pipes[1]
   * // fargs[1][0]
   * //
   */
  fargs: number[][];
  /**
   * Tag Arguments
   *
   * A list of indexes which reference Liquid tag argument expression starting points
   *
   * @example
   *
   * {% tag, arg_1: 'foo', arg_2: 'bar' %}
   *
   * // Indexes of the args will be stores
   */
  targs: number[];
  /**
   * Logicals (Operators)
   *
   * A list of indexes which reference operator starting points
   *
   * @example
   *
   * {% if foo == bar and xx != tt or baz %}
   *
   * // Indexes of the "and" and the "or" operators are stored
   */
  logic: number[];
}

/**
 * Parse Scopes
 */
interface Scopes extends Array<[ string, number]>{
  [index: number]: [
    string,
    number
  ];
}

/* -------------------------------------------- */
/* PARSE HELPERS                                */
/* -------------------------------------------- */
