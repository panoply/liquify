import { References, Descriptions } from './shared';
import { TypeBasic } from '../utils/enums';
import { Types } from './types';
import { LiteralUnion } from './utils';

/* OBJECT PROPERTY EXPORT --------------------- */

export declare interface IProperty extends Descriptions {
  /**
   * Deprecated
   *
   * Is this object deprecated?
   *
   * @default false
   */
  deprecated?: boolean;
  /**
   * Scope
   *
   * Point to an object in the spec for which this property
   * will implement. This is typically used when `type` is `array`,
   * but can also be used for circular referenced objects.
   *
   * @default undefined
   */
  scope?: string;
  /**
   * Items
   *
   * When type is `array` and the object property does not have a `scope`
   * but each entry in the array has known type, it can be defined here.
   *
   * @default undefined
   */
  items?: LiteralUnion<TypeBasic, Types.Basic>;
  /**
   * Type
   *
   * The Typeof object value
   */
  type: LiteralUnion<TypeBasic, Types.Basic>;
  /**
   * Literals
   *
   * A known value list which will be returned by this property.
   * Say for example, the values that will be returns will either
   * be `foo` or `bar` then you'd provide them here.
   *
   * This can also be used when objects return multiple types, in
   * such a case, the `type` will be set to `literal` and types will
   * be referred to on this value.
   *
   * @default undefined
   */
  literal?: string[] | undefined;
  /**
   * Value
   *
   * Optionally provide the object value. This is typically not required,
   * but is made available for static based completions when it may be desirable
   * to pass the static result. When generating specifications for sources like
   * that in 11ty when dealing with frontmatter or a data cascade, this entry
   * will be populated.
   *
   * @default undefined
   */
  value?: any;
  /**
   * Reference
   *
   * Documentation References
   */
  reference?: References;
  /**
   * Properties
   *
   * Property value contains additional properties, eg: `{{ object.prop1.prop2 }}`
   */
  properties?: { [name: string]: IProperty; };
}

/* OBJECT ITERFACE EXPORT --------------------- */

export declare interface IObject extends Descriptions {
  /**
   * Type
   *
   * The automatically applied tag type, which is "object"
   *
   * @default 'object'
   */
  type?: LiteralUnion<TypeBasic, Types.Basic>;
  /**
   * Reference
   *
   * Documentation References
   */
  reference?: References;
  /**
   * Does this tag accept filters
   *
   * @default true
   */
  filters?: boolean;
  /**
   * Template
   *
   * List of template files which the object is accessible.
   *
   * @default []
   */
  template?: string[]
  /**
   * The object is a global accessible object. This simply means that
   * the object can be used at any point across the workspace. When the
   * value is `false` then the object must meet certain conditions, like
   * (for example) the current `template` or `scope`
   *
   * @default false
   */
  global?: boolean;
  /**
   * Scope
   *
   * Point to an object in the spec for which this object
   * will implement. This is typically used when `type` is `array`,
   * but can also be used for circular referenced objects.
   *
   * @default undefined
   */
  scope?: string;
  /**
   * Const
   *
   * Whether or not this object is a content or constant value. When an
   * object is defined as constant, it denotes that it cannot be used in
   * filters not apply any form of augmentation. An example of a `const`
   * type is the `content_for_header` object in the Shopify variation.
   *
   * @default false
   */
  const?: boolean;
  /**
   * Literals
   *
   * A known value list which will be returned by this property.
   * Say for example, the values that will be returns will either
   * be `foo` or `bar` then you'd provide them here.
   *
   * This can also be used when objects return multiple types, in
   * such a case, the `type` will be set to `literal` and types will
   * be referred to on this value.
   *
   * @default undefined
   */
  literal?: string[] | undefined
  /**
   * Deprecated
   *
   * Is this object deprecated?
   *
   * @default false
   */
  deprecated?: boolean;
  /**
   * Parents
   *
   * Object is only accessible within this scope. Define
   * the tags wherein the object is allowed.
   *
   * @default []
   */
  parent?: string[];
  /**
   * Properties
   *
   * List of property values this tag object supports, recursively
   * supply properties for deep nested objects.
   */
  properties?: { [name: string]: IProperty; };
}

/* REFERENCE ---------------------------------- */

export declare interface Properties { [name: string]: IProperty; }

export declare interface Objects { [name: string]: IObject; }
