import rollup from 'rollup'
import { ReplaceOptions } from './replace'
import { FilterPattern } from '@rollup/pluginutils'

import rollup from 'rollup'

type TransformFunction = (file: string) => string

interface TransformObjectFunctions {
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
   * @default './dist'
   */
  readonly dest: string

  /**
   * Define the base dir package name to watch from.
   *
   * @default process.cwd()
   */
  readonly pkg?: string

  /**
   * Whether or not to remove all files within `dist` when rollup starts up.
   *
   * @default true
   */
  readonly clean?: string

  /**
   * A function that allows for programatically changing the
   * destination of files.
   *
   * @default false
   */
  readonly destination?: (file: string) => string

  /**
   * A function that allows for transforming of globs content.
   *
   * @default false
   */
  readonly transform?: TransformObjectFunctions | TransformFunction

  /**
   * A shorthand to enable verbose logging. Overrides `loglevel` option if set
   *
   * @default false
   */
  readonly verbose?: string | boolean

  /**
   * Specify the exact level to log at
   *
   * @default 'info'
   */
  readonly loglevel?: 'silly' | 'verbose' | 'info' | 'silent'
}

/**
 * Rollup plugin to take a list of globs, copy them on the first build,
 * and optionally watch for changes and sync those over afterwards.
 */
export function globs(options?: GlobsOptions): rollup.Plugin

interface ReplaceOptions {
  /**
   * Files to include.
   */
  readonly include?: FilterPattern

  /**
   * Files to exclude
   */
  readonly exclude?: FilterPattern

  /**
   * The open/closr delimeters
   */
  readonly delimeters: [RegExp, RegExp]

  /**
   * The tag name
   */
  readonly tags: RegExp[] | string[]

  /**
   * The matched tag name, callback via `match.replace()`
   */
  readonly callback?: (param: string) => string
}

export type PathOptions = string | string[] | { [entryAlias: string]: string }

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
