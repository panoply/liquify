import rollup from 'rollup'

/**
 * Transform Function
 */
type TransformFunction = (file: string, content: Buffer, dest: string) => string

interface TransformReturns {
  /**
   * The filename including extension
   */
  readonly file?: string
  /**
   * The file contents, **MUST** return a `string` value, not buffer!!
   */
  readonly content?: string
  /**
   * Destination path replacement
   */
  readonly dest?: string
}

interface TransformObjectFunctions {
  /**
   * A glob or file to match for transformation
   */
  readonly [glob: string]: TransformFunction
}

interface GlobsOptions {
  /**
   * Array of glob patterns to use for finding files to copy.
   */
  readonly globs: string | ReadonlyArray<string>

  /**
   * Directory to copy files into.
   *
   * @default './package'
   */
  readonly dest?: string

  /**
   * The current working directory
   *
   * @default process.cwd()
   */
  readonly cwd?: string

  /**
   * Whether or not to remove all files within `dest` when rollup starts up.
   *
   * @default true
   */
  readonly clean?: string

  /**
   * A function that allows for transforming of glob content.
   *
   * @default false
   */
  readonly transform?: TransformObjectFunctions | TransformFunction
}

/**
 * Rollup plugin to take a list of globs, copy, transform, rename or repath
 * and optionally watch for changes, syncing those over.
 */
export function globs(options?: GlobsOptions): rollup.Plugin
