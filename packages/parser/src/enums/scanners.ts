/**
 * Cache Context
 */
export const enum Scanners {
  /**
   * `{{` or `{%` or `<` or `</`
   *
   * ---
   *
   * Delimiter Scanner
   */
  Delimiters,

  /**
   * `object.prop` or `object[prop]`
   *
   * ---
   *
   * Object Scanner
   */
  Objects,

  /**
   * `variable = value`
   *
   * ---
   *
   * Variable Scanner
   */
  Tags,

  /**
   * `| filter`
   *
   * ---
   *
   * Filter Scanner
   */
  Filters,

  /**
   * `<tag attr="">`
   *
   * ---
   *
   * HTML Scanner
   */
  HTML,
}
