import rollup from "rollup";

declare const Buffer;

interface TransformReturns {
  /**
   * The filename including extension
   */
  readonly name?: string;
  /**
   * The file contents, **MUST** return a `string` value, not buffer!!
   */
  readonly content?: string;
  /**
   * Destination path replacement, returing dest will repath the destination
   * of the file, ie: output will **NOT** be relative to the defined `dest` path
   */
  readonly dest?: string;
}

/**
 * Transform Function
 */
type Transform = (options: {
  /**
   * The filename
   */
  readonly file: string;
  /**
   * The file contents server up as a Buffer!
   * Return using `toString()`
   */
  readonly content: Buffer<string>;
  /**
   * The destination path
   */
  readonly dest: string;
}) => TransformReturns;

interface TransformObjectFunctions {
  /**
   * A glob or file to match for transformation
   */
  readonly [glob: string]: string | Transform;
}

interface GlobsOptions {
  /**
   * Array of glob patterns to use for finding files to copy.
   */
  readonly globs: string | ReadonlyArray<string>;

  /**
   * Directory to copy files into.
   *
   * @default './package'
   */
  readonly dest?: string;

  /**
   * The current working directory
   *
   * @default process.cwd()
   */
  readonly cwd?: string;

  /**
   * Whether or not to remove all files within `dest` when rollup starts up.
   *
   * @default true
   */
  readonly clean?: string;

  /**
   * A function that allows for transforming of glob content.
   *
   * @default false
   */
  readonly transform?: TransformObjectFunctions | Transform;
}

/**
 * Rollup plugin to take a list of globs, copy, transform, rename or repath
 * and optionally watch for changes, syncing those over.
 */
export default function globs(options: GlobsOptions): rollup.Plugin;
