import { PackageJSON } from './package'
import { TSConfig } from './tsconfig'
import { RollupOptions, Plugin } from 'rollup'
export function jsonmin(content: string): string;

type IEnvVars = 'prod' | 'dev' | 'watch'

type IEnv = (
  condition: IEnvVars
) => (
  initial: string | string[] | Plugin[] | boolean
) => (
  combined: string  | string[] | Plugin[] | boolean
) => []

/**
 * Validates env variable and executes condition based on result.
 */
export const env: {
  /**
   * Sugar getter for `process.env.prod` flag, returning `true`
   * when in prod mode else `false`
   */
  get prod(): boolean;
  /**
   * Sugar getter for `process.env.prod` flag, returning `true`
   * when in dev mode else `false`
   */
  get dev(): boolean;
  /**
   * Sugar getter for `process.env.ROLLUP_WATCH` flag, returning `true`
   * when in watch mode else `false`
   */
  get watch(): boolean;
  /**
   * Tests a predefined condition environment variable. When true,
   * the `returns` value is returned, else `false`
   */
  is?:(
    condition: IEnvVars,
    returns: boolean | string | Plugin | string[]
  ) => boolean | string | Plugin | string[]
  /**
   * Tests a condition for execution. It will concatenates returning array types.
   * by spreading. when condition equates to `false` combined is returned.
   *
   * ---
   *
   * String to Array Example:
   *
   * ```js
   * // dev === true  > Returns initial array
   * env.if('dev')(['foo','bar'])('baz') => ['foo','bar']
   *
   * // dev === false > Returns combined array
   * env.if('dev')(['foo','bar'])('baz') => ['foo','bar','baz']
   *
   * // dev === false > Returns combined array
   * env.if('dev')('foo')('bar') => ['foo', 'bar']
   * ```
   * ---
   *
   * Plugins Example:
   *
   * ```js
   * // dev === true  > Returns initial array
   * env.if('dev')([plugin1()])([ plugin2() ]) => [ plugin1() ]
   *
   * // dev === false > Returns combined array
   * env.if('dev')([ plugin1() ])([ plugin2() ]) => [ plugin1(), plugin2() ]
   * ```
   */
  if?: IEnv;
}

/**
 * Returns configuration of the current directory and package
 */
export const config: {
  /**
   * Returns Current Working Directory path
   */
  get cwd(): string;
  /**
   * JSON `package.json`
   */
  get package(): PackageJSON;
  /**
   * TypeScript Configuration File
   */
  get tsconfig(): TSConfig;
  /**
   * Returns `package.json` dependencies as keys
   */
  get external(): string[];
   /**
   * Returns the Current Working Directory relative
   * resolved path
   */
  path: (path: string) => string
  /**
   * Return Alias mapping of paths, used in-conjunction
   * with `@rollup/plugin-alias` and passed to the `entries` field.
   *
   * @param {string[]} ids List of paths to alias
   * @param {string} [src] Directory to start mapping from
   */
  alias:(ids: string[], src: 'src' | string) => Array<{
    find: string,
    replacement: string
  }>;
  output: {
    get cjs(): string;
    get esm(): string;
  }
}


/**
 * Banner - Applies a licence banner to output bundles generated
 * by rollup for proprietary software of the project
 */
export function banner(
  license:  "MIT" | "PROPRIETARY" | "CC BY-NC-ND 4.0"
):  string;



