/* eslint-disable no-unused-vars */

/**
 * Embedded Language IDS
 *
 * Language identifier name enums. We use these names to indicate
 * what the language is of this tokens inner content. For example,
 * the HTML `<script>` tag is `javascript` or within the Shopify
 * Liquid variation the `{% schema %}` tag contains `json` and
 * thus the language identifier for that tag is json.
 *
 * ---
 *
 * **IMPORTANT**
 *
 * By default, all tags are assumed to be `liquid`
 *
 */

export enum NodeLanguage {
  /**
   * Liquid Language - ALL TAGS DEFAULT TO LIQUID
   */
  "liquid" = 'liquid',

  /**
   * HTML Language
   */
  "html" = 'html',

  /**
   * YAML Language
   */
  "yaml" = 'yaml',

  /**
   * JavaScript Language
   */
  "javascript" = 'javascript',

  /**
   * JSON Language
   */
  "json" = 'json',

  /**
   * CSS Language
   */
  "css" = 'css',

  /**
   * SCSS Language
   */
  "scss" = 'scss',
}
