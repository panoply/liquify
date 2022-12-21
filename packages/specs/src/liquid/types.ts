import { Engine, Within, Scopes } from '../utils/enums';
import type {
  Tag,
  Tags,
  IObject,
  Objects,
  IProperty,
  Filter,
  Filters,
  Argument,
  ArgumentParameter,
  Completions
} from '../types';

/* -------------------------------------------- */
/* SCOPE MAP VALUE                              */
/* -------------------------------------------- */

export interface ScopeMapValue {
  /**
   * The scope enum which describes the value
   */
  scope?: Scopes;
  /**
   * The value assignment reference
   */
  value?: IObject | IProperty | string
}

export declare interface Liquid {
  /**
  * Engine
  */
  engine: Engine;
  /**
   * The current tag specification
   */
  tag: Tag;
  /**
   * The current filter specification
   */
  filter: Filter;
  /**
   * The current object specification
   */
  object: IObject;
  /**
   * The current argument or parameter references
   */
  argument: Argument | ArgumentParameter;
  /**
   * The value entry reference
   */
  value: string;
  /**
   * An enum reference which informs what specifier are within
   */
  within: Within;
  /**
   * The current scope map value
   */
  variable: Partial<ScopeMapValue>;
  /**
   * The current scope map value
   */
  scope: number;
  /**
   * Data References
   */
  data: {
    /**
     * Document variables
     */
    variables: Map<string, ScopeMapValue[]>
    /**
     * Variation Spec
     */
    variation: {
      /**
       * Liquid Filters
       */
      readonly filters?: Filters;
      /**
       * Liquid Objects
       */
      readonly objects?: Objects;
      /**
       * Liquid Tags
       */
      readonly tags?: Tags;
    };
    /**
     * Completion Items (LSP Related)
     */
    completions: Completions;
  }
}
