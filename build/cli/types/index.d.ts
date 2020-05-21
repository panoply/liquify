/* -------------------------------------------- */
/*                 COMMAND LINE                 */
/* -------------------------------------------- */

import { argv } from 'process'

/**
 * Argv Object
 *
 * @export
 */
export declare type ArgvParamaters = {
  _: string[]
  bundle?: string
  git?: string
  package?: string
  peep?: string
  publish?: string
  release?: string
  test?: string
  config?: boolean | string
  input?: string
  output?: string
  watch?: boolean
  prod?: boolean
  dev?: boolean
  help?: boolean
  postinstall?: boolean
  preinstall?: boolean
  dryrun?: boolean
}

/* -------------------------------------------- */
/*                     ARGV                     */
/* -------------------------------------------- */

type Argv = {
  task?: string | null
  pkg?: string | null
  config?: string | null
  watch?: boolean
  input?: string | null
  output?: string | null
  prod?: boolean
  dev?: boolean
  help?: boolean
  version?: boolean
  postinstall?: boolean
  preinstall?: boolean
  dryrun?: boolean
  nobanner?: boolean
}

/* -------------------------------------------- */
/*                     PATH                     */
/* -------------------------------------------- */

type Path = {
  cwd?: string
  base?: string
  root?: string
  pkg?: string
  filter?: string
}

type Info = {
  name?: string
  repo?: string
  version?: string
}

/**
 * Options
 *
 * @export
 */
export declare type Options = {
  path: Path
  argv?: Argv
  execute?: {}
  info?: Info
}

/* -------------------------------------------- */
/*                  GRAMMAR PKG                 */
/* -------------------------------------------- */

/**
 * Argv Object
 *
 * @export
 */
export declare type GrammarGenerator = {
  name?: string
  file: string
  type: 'variation' | 'injection'
  output: string
  extend?: 'standard'
  formats: ['json' | 'yaml']
  grammar: {
    name: string
    scopeName: string
    injectionSelector?: string[]
    include?: string[]
  }
}

export declare type GrammarContext = {
  argv: Argv
  path: Path
  info?: Info
  specs: object
  config: { generate: GrammarGenerator[] }
  files: {
    include: object
    inject: object
    standard?: {
      patterns: object[{ include: string }]
      repository: { objects: { patterns: object[] } }
    }
  }
}
