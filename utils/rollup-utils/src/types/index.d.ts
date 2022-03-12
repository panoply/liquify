import { PackageJSON, Exports } from './package';
import { TSConfig } from './tsconfig';
import { Plugin } from 'rollup';
import { DotenvParseOutput } from 'dotenv';

type EnvVars = 'prod' | 'dev' | 'watch';

type Env = (
  /**
   * The `--envronment` flag value
   */
  condition: EnvVars
) => (
  initial: string | string[] | Plugin[] | boolean
) => (combined: string | string[] | Plugin[] | boolean) => [];

/**
 * Resolves a path to the current working directory.
 *
 * @example
 *
 * path('file.js') // => 'User/dir/project/file.js'
 */
export declare const path: (uri: string) => string;

/**
 * Minify JSON and/or JSONC files.
 */
export declare const jsonmin: (content: string) => string;

/**
 * Get Time
 *
 * Returns UTC Time/Date or pretty format with suffixed number.
 * Optionally provide a predefined UTC date string.
 *
 * @example
 * // Without date or suffix params
 * 'Mon, 04 Oct 2021 02:53:57 GMT'
 *
 * // With date (includes suffix)
 * '4th October 2021'
 *
 * @param {utc}
 * Pass in an option data/time string of Date object
 */
export declare const date: (utc?: string | Date) => string;

/**
 * Banner - Applies a licence banner to output bundles generated
 * by rollup for proprietary software of the project
 */
export declare const banner: (
  license: 'MIT' | 'PROPRIETARY' | 'CC BY-NC-ND 4.0'
) => string;

/**
 * Validates env variable and executes condition based on result.
 */
export declare const env: {
  /**
   * Returns the parsed contents of a `.env` file
   */
  get vars(): DotenvParseOutput;
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
  is?: (
    condition: EnvVars,
    returns: boolean | string | Plugin | string[]
  ) => boolean | string | Plugin | string[];
  /**
   * Tests a condition for execution. It will concatenates returning array types.
   * by spreading. when condition equates to `false` combined is returned.
   *
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
   */
  if?: Env;
};

/**
 * Returns configuration of the current directory and package
 */
export declare const config: {
  /**
   * Returns current working directory path determined
   * by the value of `process.cwd()`
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
  path: (path: string) => string;
  /**
   * Return Alias mapping of paths, used in-conjunction
   * with `@rollup/plugin-alias` and passed to the `entries` field.
   *
   * @param {string[]} ids List of paths to alias
   * @param {string} [src] Directory to start mapping from
   */
  alias: (
    ids: string[],
    src: 'src' | string
  ) => Array<{
    find: string;
    replacement: string;
  }>;
  /**
   * TypeScript paths as an alias config
   */
  tsalias:(paths: [string, string[]]) => Array<{
    find: string;
    replacement: string;
  }>;
  output: {
    /**
     * Returns the value of `exports.require` in the
     * projects `package.json` file.
     */
    get cjs(): string | null;
    /**
     * Returns the value of `exports.import` in the
     * projects `package.json` file.
     */
    get esm(): string | null;
    /**
     * Returns the `exports` value in the
     * projects `package.json` file.
     */
    get exports(): string | Exports | null;
    /**
     * Returns the value of the `main` field in the
     * projects `package.json` file.
     */
    get main(): string | null;
    /**
     * Returns the value of the `module` field in the
     * projects `package.json` file.
     */
    get module(): string | null;
  };
};
