import { Descriptions, References } from './shared';
import { Arguments } from './arguments';
import { Types } from './types';

/* FILTER INTERFACE EXPORT -------------------- */

export declare interface Filter extends Descriptions {
  /**
   * Deprecated
   *
   * Is the filter tag deprecated?
   *
   * @default false
   */
  deprecated?: boolean;
  /**
   * Reference
   *
   * URL reference to online documentation explaining this filter
   *
   * @default undefined
   */
  reference?: References;
  /**
   * Snippet
   *
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  snippet?: string;
  /**
   * Objects
   *
   * This filter is only available to be used on the following objects.
   *
   * @default undefined
   */
  objects?: string[];
  /**
   * Filters
   *
   * This filter is only available when these filters are present
   *
   * @default undefined
   */
  filters?: string[];
  /**
   * Returns
   *
   * This infers the type in which the filter *returns*.
   *
   * @example
   *
   * // Return type is array
   * {{ 'foo,bar,baz' | split: ',' }}
   */
  returns?: Types.Basic
  /**
   * Scope
   *
   * When the filter is available within the scope of
   * a specific object and/or tag.
   *
   * @default undefined
   */
  scope?: string | undefined
  /**
   * Filter arguments can differ greatly depending on how they are
   * implemented. The spec understands the below filter structures:
   *
   * @example
   *
   * {{ tag | filter: 'hello', param: 'world' }} // comma seperated params
   * {{ tag | filter: 'arg1', 'arg2', }} // comma seperated string
   * {{ tag | filter: argument: 'foo' }} // injected argument params
   *
   * @default undefined
   */
  arguments?: Arguments

}

/* REFERENCE ---------------------------------- */

export declare interface Filters { [name: string]: Filter; }
