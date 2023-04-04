import { Data, IParseError, Rules, RulesChanges } from '.';
import { Stats } from './shared';

export type EventNames = (
  | 'format'
  | 'parse'
  | 'rules'
 );

export interface FormatEventScope {
  /**
   * The Parse table data structure
   */
  get data(): Data
}

export interface FormatEventParams {
  /**
   * Trigger a callback to execute immeadiatly after beautification
   * has completed. The function will trigger before the returning
   * promise has fulfilled and is invoked in an isolated nammer.
   *
   * > _Returning `false` will cancel formatting._
   */
  get output(): string,
  /**
   * Execution statistics
   */
  get stats(): Stats,
  /**
   * Holds reference to current rules
   */
  get rules(): Rules
}

export interface ParseEventParams {
  /**
   * The generated data structure parse table
   */
  get data(): Data,
  /**
   * Execution statistics
   */
  get stats(): Stats,
  /**
   * Holds reference to current rules
   */
  get rules(): Rules
}

/**
 * Internal Listeners
 *
 * Array list of event listeners
 */
export declare interface EventListeners {
  /**
   * Format Event
   *
   * Trigger a callback to execute immeadiatly after beautification
   * has completed. The callback will fire before the returning the formatted output.
   *
   * > _Returning `false` will cancel formatting and the provided input source will be returned_
   */
  format: ((this: FormatEventScope, param: FormatEventParams) => false | void)[];
  /**
   * Error Event
   *
   * Invoked when a parse error is encountered. The callback contains the
   * exception reference and error information.
   *
   */
  error: ((error?: IParseError) => void)[]
  /**
   * Parse Event
   *
   * Invoked on Parse operations
   */
  parse: ((param: ParseEventParams) => false | void)[]
  /**
   * Rules Event
   *
   * Invoked when formatting rules change.
   */
  rules: ((changes: RulesChanges, rules: Rules) => void)[];

}

export declare interface Events<T> {
  /**
   * Format Event
   *
   * Trigger a callback to execute immeadiatly after beautification
   * has completed. The callback will fire before the returning the formatted output.
   *
   * > _Returning `false` will cancel formatting and the provided input source will be returned_
   */
  (name: 'format', callback: (this: FormatEventScope, param?: FormatEventParams) => false | void): T;
  /**
   * Error Event
   *
   * Invoked when a parse error is encountered. The callback contains the
   * exception reference and error information.
   *
   */
  (name: 'error', callback: (error?: IParseError) => void): T;
  /**
   * Parse Event
   *
   * Invoked on Parse operations
   */
  (name: 'parse', callback: (param?: ParseEventParams) => void): T;
  /**
   * Rules Event
   *
   * Invoked when formatting rules change.
   */
  (name: 'rules', callback: (
    /**
     * Holds reference to rules which changed
     */
    changes?: RulesChanges,
    /**
     * Holds reference to current rules
     */
    rules?: Rules

  ) => void): T;
}
