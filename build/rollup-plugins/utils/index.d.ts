export function jsonmin(content: string): string;

/**
 * Path Resolve - Resolves paths in rollup configuration to
 * their correct directories
 */
export function path(name: string): (path: PathOptions) => string;

/**
 * RegExp Replace - Modified version the rollup `replace` plugin
 * which is restrictive.
 */
export function replace(options: ReplaceOptions): rollup.Plugin;

/**
 * Plugins - Concates rollup plugins according to environment
 */
export function plugins(devPlugins: Array, prodPlugins: Array): Array;

/**
 * Banner - Applies a licence banner to output bundles generated
 * by rollup for proprietary software of the project
 */
export function banner(
  options: {
    name: string;
    main: string;
    version: string;
  },
  license: "PROPRIETARY" | "MIT" | "CC BY-NC-ND 4.0"
): (path: PathOptions) => string;
