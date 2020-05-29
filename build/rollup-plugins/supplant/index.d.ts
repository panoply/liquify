interface SupplantOptions {
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

/**
 * RegExp Replace - Modified version the rollup `replace` plugin
 * which is restrictive.
 */
export function supplant(options: ReplaceOptions): rollup.Plugin
