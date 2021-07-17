/* eslint no-unused-vars: "off" */

import { NodeKind } from 'lexical/kind';
import { NodeLanguage } from 'lexical/language';
import { Type } from '@liquify/liquid-language-specs';

export const enum NodeType {
  Root,
  Pair,
  Void,
  Start,
  Embed
}

export const enum Token {
  Token = 1,
  Start = 1,
  Inner,
  Ender,
  Outer
}

export interface IScopes { [tag: string]: string | Type }

export declare interface INode {

  /**
   * Objects this tag contains. Each property contained on the
   * object is an offset location, the value of each property will either
   * be a string array or a number.
   *
   * When the value of the property is type number, is value will point to
   * offset property which contains the string values. When property values
   * are a string array, each items in that array is the property value
   * expressed.
   *
   * ----
   *
   * Example:
   *
   * `{{ object.prop.foo | filter: bar.baz }}`
   *
   * ```javascript
   * {
   *   4:[ 'object', 'prop', 'foo' ],
   *   11: 4,
   *   16: 4,
   *   30: ['bar', 'baz'],
   *   34: 30
   * }
   * ```
   *
   * Notice here how the offsets point back to the property where
   * the object began. The objects within Liquid tags are asserted
   * in this manner as we want to walk the specifications in the fasted
   * possible manner.
   */
  objects?: object;

}
