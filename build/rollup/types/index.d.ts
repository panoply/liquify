import rollup from 'rollup'
import { ReplaceOptions } from './replace'
import { FilterPattern } from '@rollup/pluginutils'

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
