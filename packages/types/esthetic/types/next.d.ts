import { Modes, Languages, Lexers } from 'lexical/enum';
import { Data, Syntactic } from '.';
import { LanguageName } from './shared';

/**
 * Stack item entry references populated in the `parse.stack[]` store.
 */
export type StackItem = [
  /**
   * Represents a token indentifiable.
   */
  token: string,
  /**
   * The index at which the data record exists
   */
  index: number
];

export interface ParseStack extends Array<StackItem> {
  /**
   * The last known entry, returning `[token, index]`
   */
  get entry(): StackItem;
  /**
   * The last knowm token entry in the stack
   */
  get token(): string;
  /**
   * The last known index entry in the stack
   */
  get index(): number;
  /**
   * An additional method for working with the `parse.stack` array.
   * This will update the last known entry with provided values. The function
   * accepts either `string`, `number`  types as a first parameter.
   *
   * - When a `string` type is provided then the last known token `[][0]` entry is updated
   * - When a `number` type is provided then the last known index `[][1]` entry is updated
   *
   * To update both the `StackItem` array last known `token` and `index` entries then pass
   * the `token` as first parameter and `index` as second parameter.
   */
  update(token: string | number, index?: number): StackItem;
  /**
   * The `parse.StackItem` array pop method is configured to
   * prevent removal of the initial `['global', -1]` scope entry.
   */
  pop(): StackItem;

}

export declare interface ParseOptions {
  /**
  * The current language identifier
  */
  language: LanguageName;
  /**
   * The lexer to target.
   */
  lexer: Lexers;
  /**
  * The current mode being invoked
  */
  mode?: Modes,
  /**
   * An optional starting point offset to begin traversal
   * of the parse table.
   */
  start?: number;
  /**
   * An optional ending point offset to conclude traversal
   * of the parse table.
   */
  ender?: number;
}

export declare interface ParseStore extends ParseOptions {
  /**
   * Iterator
   */
  iterator: number;
  /**
   * An optional starting point offset to begin traversal
   * of the parse table.
   */
  start: number;
  /**
   * An optional ending point offset to conclude traversal
   * of the parse table.
   */
  ender: number;
  /**
   * Stores the 'lines' value before the next token
   */
  space: number;
  /**
   * The current line number within treversal
   */
  line?: number;
  /**
   * The current character from starting point of last known line
   */
  character?: number;
  /**
   * Stores the final index location of the data arrays
   */
  count: number;
  /**
   * Data Structure
   */
  data: Data;
  /**
   * The current mode
   */
  stack: ParseStack;
  /**
   * Reference of attributes of new line values with containing Liquid block tokens.
   * It maintains a store which is generated in the markup lexer and used within
   * the beautify process.
   */
  attributes: Map<number, boolean>;
  /**
   * Externals
   *
   * Language regions, typically embedded tokens which use a different lexer.
   */
  external: Map<number, Languages>;
  /**
   * Stores the declared variable names for the script lexer.
   * This must be stored outside the script lexer since some languages
   * recursive use of the script lexer
   */
  references: any[][];
  /**
   * Holds a store reference to markup start/end pairs
   */
  pairs: Map<number, Syntactic>;
  /**
   * Parse Error reference.
   */
  error: string;

}

export declare interface ParseInstance extends ParseStore {
  /**
   * The `parser()` default function parameters
   */
  (source: string | string[], options: ParseOptions): Data | string;
}
