import { PackageJSON } from './package'
import { TSConfig } from './tsconfig'
import { RollupOptions } from 'rollup'
export function jsonmin(content: string): string;

type IEnv = (
  condition: string | boolean
) => (
  initial: string | RollupOptions['plugins'] | boolean
) => (
  combined: string | RollupOptions['plugins'] | boolean
) => []

/**
 * Validates env variable and executes condition based on result.
 */
export const env: {
  if?: IEnv,
  unless?: IEnv
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
 * Plugins - Concates rollup plugins according to environment
 */
export function plugins(devPlugins: [], prodPlugins: []): [];

/**
 * Banner - Applies a licence banner to output bundles generated
 * by rollup for proprietary software of the project
 */
export function banner(
  license:  "MIT" | "PROPRIETARY" | "CC BY-NC-ND 4.0"
):  string;



