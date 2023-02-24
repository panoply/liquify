import type { CompletionItem } from 'vscode-languageserver-types';
import { Arguments } from './arguments';
import { IObject } from './objects';

export interface ObjectGroup {
  /**
   * The specification object reference
   */
  object: IObject;
  /**
   * Partial completion item reference
   */
  item: CompletionItem
}

export interface ObjectGroupItems {
  /**
   * All Objects
   */
  all: CompletionItem[],
  /**
   * Objects which are template specific
   */
  template: CompletionItem[]
  /**
   * Objects with type `any`
   */
  any: CompletionItem[]
  /**
   * Objects with type `array`
   */
  array: CompletionItem[]
  /**
   * Objects with type `string`
   */
  string: CompletionItem[]
  /**
   * Objects with type `number`
   */
  number: CompletionItem[]
  /**
   * Objects with type `constant`
   */
  constant: CompletionItem[]
  /**
   * Objects with type `boolean`
   */
  boolean: CompletionItem[]
  /**
   * Objects with type `object`
   */
  object: CompletionItem[]
}

export interface Completion extends CompletionItem {
  data?: {
    /**
     * String snippet applied for completions
     */
    snippet?: string,
    /**
     * Whether or not the tage is a singular type
     */
    singular?: boolean,
    /**
     * An array string list of parent tag name scopes
     */
    parents?: string[],
    /**
     * Arguments applied to this completion
     */
    arguments?: Arguments
  }
}

export interface Completions {
  /**
   * A list of tag completions items
   */
  tags: Completion[];
  /**
   * A list of filter completions items
   */
  filters: Completion[];
  /**
   * A list of object completions items
   */
  objects?: Completion[]
}

export interface TypeNames {
  1: 'string',
  2: 'object',
  3: 'integer',
  4: 'number',
  5: 'boolean',
  6: 'string',
  7: 'array',
  8: 'data'
}
