import { IReferences, IScopes } from './common';
import { shopify } from '../data/export';
import { BasicTypeRange } from './types';

/* EXPORT TYPE -------------------------------- */

export { Type } from './types';

/* OBJECT PROPERTY EXPORT --------------------- */

export interface IProperties {

  /**
   * Description of thes property value used by this object
   */
  readonly description?: string;

  /**
   * Point to an object in the spec this array contains
   */
  readonly object?: keyof typeof shopify.objects

  /**
   * The Typeof object value
   */
  readonly type: BasicTypeRange;

  /**
   * Documentation References
   */
  readonly reference?: IReferences;

  /**
   * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
   */
  readonly properties?: {
    [name: string]: IProperties;
  };
}

/* OBJECT ITERFACE EXPORT --------------------- */

export interface IObject {

  /**
   * The automatically applied tag type, which is "object"
   */
  readonly type?: BasicTypeRange;

  /**
   * Description of this object
   *
   */
  readonly description?: string;

  /**
   * Documentation References
   */
  readonly reference?: IReferences;

  /**
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
   * Whether or not this object is a content or constant value
   *
   * @default false
   */
  readonly const?: boolean;

  /**
   * Is this object tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;

  /**
   * Object is only accessible within tag based scope.
   *
   * @default []
   */
  readonly scope?: IScopes;

  /**
   * List of property values this tag object supports, recursively
   * supply properties for deep nested objects.
   */
  readonly properties?: { [name: string]: IProperties; };
}

/* REFERENCE ---------------------------------- */

export interface Objects { [name: string]: IObject; }
