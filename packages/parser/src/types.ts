/* eslint no-unused-vars: "off" */

import { Type } from '@liquify/specs';
import { Range } from 'vscode-languageserver-textdocument';
import { DocumentUri, integer, Diagnostic } from 'vscode-languageserver-types';
import { NodeLanguage, NodeKind, TagType, NodeType } from './lexical';

/* -------------------------------------------- */
/* SUPPORTS                                     */
/* -------------------------------------------- */

/**
 * The publish diagnostic notification's parameters.
 */
export interface PublishDiagnosticsParams {
  /**
   * The URI for which diagnostic information is reported.
   */
  uri: DocumentUri;
  /**
   * Optional the version number of the document the diagnostics are published for.
   *
   * @since 3.15.0
   */
  version?: integer;
  /**
   * An array of diagnostic information items.
   */
  diagnostics: Diagnostic[];
}

/* -------------------------------------------- */
/* ENUMS                                        */
/* -------------------------------------------- */

export const enum Token {
  Token = 1,
  Start = 1,
  Inner,
  Ender,
  Outer
}

export const enum ParseRegion {
  JSON = 1,
  YAML,
}

/* -------------------------------------------- */
/* DYNAMIC REFERENCES                           */
/* -------------------------------------------- */

export interface ShopMetafields { }

export interface ThemeLocales {}

export interface SchemaSetting {
  type: string;
  id: string;
  default: string;
  label: string;
  info: string;
}

export interface SchemaBlock {
  type: string;
  name: string;
  settings?: SchemaSetting[];
}

export interface Schema {
  name: string;
  class: string;
  tag?: string;
  settings?: SchemaSetting[];
  blocks?: SchemaBlock[];
  default?: any;
  presets?: any;

}

/* -------------------------------------------- */
/* PARSE RELATED                                */
/* -------------------------------------------- */

export interface INode {

  /**
   * The name of the node, ie: tag name
   */
  tag: string;
  /**
   * The node kind reference
   */
  kind: NodeKind;
  /**
   * HTML Attributes
   */
  attributes?: object;
  /**
   * Node Type
   */
  type: Type | NodeType;
  /**
   * Language ID
   */
  languageId?: NodeLanguage;
  /**
   * The ROOT Node index
   */
  root: number;
  /**
   * The Node index
   */
  index: number;
  /**
   * The Parent of this node
   */
  parent: INode;
  /**
   * Children contained within this node
   */
  children: INode[];
  /**
   * Whether or not the not is a singular type
   */
  singular: boolean;
  /**
   * Line number
   */
  line: number;

  /**
   * The parse error indexes of the node
   */
  errors: number[];
  /**
   * The nodes arguments. This typically going hold reference
   * to parameters and arguments. Similar to `filters` and `objects`
   * this key value is an object type who's properties are offset
   * indexes which point to a `string[]` list. In parameter structures
   * the list will hold 2 entries.
   */
  arguments?: { [offset: number]: string[] | number };
  /**
   * Holds the offset indexes of the opening and closing
   * locations of the node. The offsets property will either
   * have `2` or `4` values. Singular type nodes will have `2`
   * whereas Start/End type tokens will hold `4`.
   *
   * ---
   *
   * This is the what each offset infers:
   *
   * ```javascript
   *
   * [0]          [1]
   *  |            |
   *  {{ singular }}
   *
   * //---------------------------------------
   *
   * [0]        [1]
   *  |          |
   *  {%  tag   %}
   *
   *  {% endtag %}
   *  |          |
   * [2]        [3]
   * ```
   *
   */
  offsets: [number?, number?, number?, number?]
  /**
   * The var property holds the **keyword** value of an
   * assignment variable like that of `assign` and `capture`
   */
  variable?: string ;
  /**
   * Objects this tag contains. Each property contained on the
   * object is an offset location, the value of each property will either
   * be a string array or a number.
   *
   * When the value of the property is type number, its value will point to
   * an offset property which contains the string values. When property values
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
   *   4: [ 'object', 'prop', 'foo' ],
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
  objects?: { [offset: number]: Array<string | number> | number }
  /**
   * Filters work in an almost identical manner to `objects` with some
   * slight differences overall.
   */
  filters?: { [offset: number]: string[] | number }

  /**
   * Tag scopes represent references and assignments. The information
   * contained on the scope property differs depending on the type of tag we
   * are dealing with.
   */
  scope?: { [tag: string]: any } | undefined

  /**
   * Returns the token (tag) inner contents as string with the `open`
   * and `close` delimiters characters removed. For example, take the
   * following tag:
   *
   * `{%- if foo == bar -%}`
   *
   * This getter will return:
   *
   * ` if foo == bar `
   *
   * Notice how the deimiters are omitted, this is the intended behaviour.
   * This getter differs from `innerContent` in the sense that does not return
   * the content of the contained region.
   *
   * Use the `startToken` getter to return the full contents with delimiters.
   */
  get tokenContent(): string

  /**
   * Returns the token (tag) inner contents contained between a `start` and `end`
   * tag region as a string. This getter cannot be used on singular tag types.
   *
   *```javascript

   * {% tag %}
   *
   * // This content will be returned, the {% tag %} and {% endtag %} excluded
   *
   * {% endtag %}
   *
   *```
   *
   */
  get innerContent(): string;
  /**
   * Returns the starting offset index of this node
   */
  get tagType (): TagType
  /**
   * Returns the starting offset index of this node
   */
  get start (): number
  /**
   * Returns the start token as a string
   */
  get startToken (): string
  /**
   * Returns the ending offset index of this node
   */
  get end (): number
  /**
   * Returns the end token as a string
   */
  get endToken (): string
  /**
   * The start and end Range position of the node.
   */
  get range (): Range
  /**
   * Returns the previous sibling immediately preceding this node.
   * If the previous node is the fist child of this parent then
   * `null` is returned.
   */
  get prevSibling (): INode | null
  /**
   * Returns the next sibling immediately following this node.
   * If the next node is the last child of this parent then
   * `null` is returned.
   */
  get nextSibling (): INode | null
  /**
   * Returns the first child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get firstChild (): INode | null
  /**
   * Returns the previous child in the node tree. When only 1 child
   * exists within the tree the parent is returned, else we return
   * the previous child
   */
  get prevChild (): INode
  /**
   * Returns the last child in this nodes tree. Returns `null`
   * if the node has no children or is a void/singular type.
   */
  get lastChild (): INode | undefined
  /**
   * Returns the last word from the current cursor position.
   * If no word is found, returns
   */
  get lastWord (): string
  /**
   * Validates a node tag and kind. This is used by the parser
   * to detect parent nodes.
   */
  isSameNode(tag: string, kind: NodeKind): boolean;
  /**
   * Returns node at the provided offset location.
   * Use the AST `getNodeAt()` method to convert from
   * a position to offset and return this method.
   */
  getNodeAt (offset: number): INode;
}
