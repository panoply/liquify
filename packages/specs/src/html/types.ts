/* eslint-disable object-curly-newline */
import type { HTMLTag, HTMLTags, HTMLTagAttributes, HTMLAttributes, HTMLValues, HTMLCompletions } from '.';

export interface HTML5 {
  /**
   * The current tag specification
   */
  tag: HTMLTag,
  /**
   * The current attribute value specification
   */
  value: string,
  /**
   * The current tag attribute specification
   */
  attribute: HTMLTagAttributes[]
  /**
   * Merged custom data references
   */
  data: {
    /**
     * Completion Items (LSP Related)
     */
    completions: HTMLCompletions;
    /**
     * The HTML variation. Similar to the Liquid specs
     * this record represents a specification reference.
     * This variation specifically will contain any vscode
     * custom data records.
     */
    variation: {
      /**
       * HTML Tags
       */
      readonly tags?: HTMLTags;
      /**
       * HTML Attributes
       */
      readonly attributes?: HTMLAttributes;
      /**
       * HTML Attribute Values
       */
      readonly values?: HTMLValues;
      /**
       * A string list of HTML Void tags
       */
      readonly voids?: string[];
    }
  }
}
