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

/**
 * Specification
 *
 * @export
 */
export declare type Options = {
  path: {
    cwd?: string
    base?: string
    root?: string
    pkg?: string
    filter?: string
  }
  argv?: {
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
  execute?: {}
  info?: {
    name?: string
    repo?: string
    version?: string
  }
}
