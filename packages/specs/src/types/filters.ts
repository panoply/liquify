import { References } from './shared';
import { Arguments } from './arguments';

/* FILTER INTERFACE EXPORT -------------------- */

export declare interface Filter {
  /**
   * Description
   *
   * Description of the filter
   *
   * @default undefined
   */
  readonly description?: string
  /**
   * Reference
   *
   * URL reference to online documentation explaining this filter
   *
   * @default undefined
   */
  readonly reference?: References;
  /**
   * Deprecated
   *
   * Is the filter tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * Snippet
   *
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;
  /**
   * Scope
   *
   * When the filter is available within the scope of
   * a specific object and/or tag.
   *
   * @default undefined
   */
  readonly scope?: string[] | undefined
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
  readonly arguments?: Arguments

}

/* REFERENCE ---------------------------------- */

export declare interface Filters { [name: string]: Filter; }
