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



type IEnv = (
  condition: string | boolean
) => (
  initial: any
) => (
  combined: any
) => []

/**
 * Validates env variable and executes a contenation. This run an
 */
export const env: {
  if?: IEnv,
  unless?: IEnv
}
