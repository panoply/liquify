import { References } from './shared';
import { Type } from '../utils/enums';
import { Types } from './types';

/* OBJECT PROPERTY EXPORT --------------------- */

export declare interface IProperty {
  /**
   * Description
   *
   * Description of thes property value used by this object
   */
  readonly description?: string;
  /**
   * Object
   *
   * Point to an object in the spec this array contains
   */
  readonly items?: string | Types.Basic
  /**
   * Type
   *
   * The Typeof object value
   */
  readonly type: Type | Types.Basic;
  /**
   * Reference
   *
   * Documentation References
   */
  readonly reference?: References;
  /**
   * Properties
   *
   * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
   */
  readonly properties?: { [name: string]: IProperty; };
}

/* OBJECT ITERFACE EXPORT --------------------- */

export declare interface IObject {
  /**
   * Type
   *
   * The automatically applied tag type, which is "object"
   *
   * @default 'object'
   */
  readonly type?: Type | Types.Basic;
  /**
   * Description
   *
   * Description of this object
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * Reference
   *
   * Documentation References
   */
  readonly reference?: References;
  /**
   * Singular
   *
   * Object tags will always be singular tags, enforces `true`
   *
   * @default true
   */
  readonly singular?: true;
  /**
   * Does this tag accept filters
   *
   * @default true
   */
  readonly filters?: boolean;
  /**
   * Does this tag accept whitespace trim dashes?
   *
   * @default true
   */
  readonly trims?: boolean;
  /**
   * The object is a global accessible object
   *
   * @default false
   */
  readonly global?: boolean;
  /**
   * Const
   *
   * Whether or not this object is a content or constant value
   *
   * @default false
   */
  readonly const?: boolean;
  /**
   * Deprecated
   *
   * Is this object tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;
  /**
   * Scope
   *
   * Object is only accessible within tag based scope. Define
   * the tags wherein the object is allowed.
   *
   * @default []
   */
  readonly scope?: string[]
  /**
   * Properties
   *
   * List of property values this tag object supports, recursively
   * supply properties for deep nested objects.
   */
  readonly properties?: {
    [name: string]: IProperty;
  };
}

/* REFERENCE ---------------------------------- */

export declare interface Properties {
  [name: string]: IProperty;
}

export declare interface Objects {
  [name: string]: IObject;
}
