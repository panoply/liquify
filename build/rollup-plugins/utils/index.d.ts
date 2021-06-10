export function jsonmin(content: string): string;


/**
 * Plugins - Concates rollup plugins according to environment
 */
export const read: { pkg: object }

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
