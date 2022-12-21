/* eslint-disable no-unused-vars */

/**
 * The Tag Type
 */
export const enum TagType {
  /**
   * Output Tag Type
   *
   * `{{ tag }}`
   */
  Output = 1,
  /**
   * Template Tag Type
   *
   * `{% tag %} {% endtag %}`
   */
  Template,
  /**
   * Singleton Tag Type
   *
   * `{% tag %}`
   */
  Singleton
}
