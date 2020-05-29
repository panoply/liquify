export function jsonmin(content: string): string

/**
 * Path Resolve - Resolves paths in rollup configuration to
 * their correct directories
 */
export function path(name: string): (path: PathOptions) => string

/**
 * RegExp Replace - Modified version the rollup `replace` plugin
 * which is restrictive.
 */
export function replace(options: ReplaceOptions): rollup.Plugin

/**
 * Plugins - Concates rollup plugins according to environment
 */
export function plugins(devPlugins: Array, prodPlugins: Array): Array
