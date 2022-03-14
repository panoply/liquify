import { ICompletions } from '../types/data';
import { IArgument } from '../types/common';
import { ITag, IFilter, IObject, Variation } from '../types';
import { Type, IEngine, Within, QueryErrors } from '../../shared/enums';
/**
 * Engine
 */
export declare let engine: IEngine;
/**
 * Variation Spec
 */
export declare let variation: Variation;
/**
 * Completion Items
 */
export declare let completions: ICompletions;
/**
 * Tag Specification
 */
export declare let tag: ITag;
/**
 * Filter Specification
 */
export declare let filter: IFilter;
/**
 * Object Specification
 */
export declare let object: IObject;
/**
 * Reference to the current arugment or parameter.
 */
export declare let argument: IArgument.Argument | IArgument.Parameter;
/**
 * Value reference
 */
export declare let value: string;
/**
 * Reset
 *
 * Resets all states. This is executed everytime we
 * encounter a new tag.
 */
export declare function reset(): void;
/**
 * Get Argument
 *
 * Walks over _optional_ arugments contained on a tag
 * or filter until a `type` match is detected. If an
 * argument is `required` walk is cancelled.
 */
export declare function getArgument(type: any): boolean;
/**
 * Is Parameter
 *
 * Queries the current argument for a `parameter` type. When
 * an argument does not have a `parameter` type, it attempts
 * to find a parameter argument via the `GetArgument` function.
 *
 * The function will return a boolean value to inform upon a
 * successful or unsuccessful match.
 *
 * ---
 *
 * **GET ARGUMENT**
 *
 * If an argument does equal type `parameter` it will attempt
 * to match the parameter passed value to a property listed
 * on the arguments `value` and if successful, the state reference
 * `argument` variable is updated and points to the parameter.
 *
 * ---
 *
 * **VALUE AS TYPE**
 *
 * If a parameters `value` points a _enum_  (number) the state
 * reference `argument` will remain pointing to the argument at index
 * and a boolean `true` will be returned.
 */
export declare function isParameter(token: string): boolean;
/**
 * Is Value
 *
 * Validates an a argument value. This function will run
 * several typeof checks to fingure out how a value should
 * be validated, starting with patterns and working its way
 * down to a specs `value` entries.
 */
export declare function isValue(token: string): boolean;
/**
 * Completions
 *
 * Constructs LSP completion-ready lists from the current
 * specification reference. Returns a closure getter combinator
 * with array lists for various tags, filters and objects.
 */
export declare function setCompletions(): ICompletions;
/**
 * Set Engine
 *
 * Sets the Liquid `variation` and `engine` variable.
 * This will change what specification we reference.
 */
export declare function setEngine(name: IEngine): void;
/**
 * Set Tag
 *
 * Finds a tag matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched tag.
 */
export declare function setTag(name: string): boolean;
/**
 * Set Filter
 *
 * Finds a filter matching specification and updates the cursor.
 * States are changed when a match is successful. Returns a
 * boolean which signals a matched or unmatched filter.
 */
export declare function setFilter(name: string): boolean;
/**
 * Set Object
 *
 * Finds a matching object specification. Objects can be
 * contained in tags and filter, so the `cursor` is not
 * modified, instead the `object` state variable is updated.
 */
export declare function setObject(name: string): boolean;
/**
 * Previous Argument
 *
 * Moves the arugment back a position. If we are currently
 * walking the index `2` (argument 3) calling this will
 * move the arugment reference states to index `1`.
 */
export declare function prevArgument(): boolean;
/**
 * Next Argument
 *
 * Moves to the _next_ argument (if available) and updates the
 * reference state variables. Returns a `boolean` which
 * indicates if we have reached the last argument or not.
 */
export declare function nextArgument(): boolean;
/**
 * Next Parameter
 *
 * Despite its name, this function will reset the `argument`
 * state reference to its index starting point. When we
 * encounter a `parameter` type, the `argument` variable is
 * moved to its property value. This function reverts that.
 */
export declare function nextParameter(): boolean;
/**
 * Is Property
 *
 * Queries the current object for a property value
 * matching the parameter `value`provided. The object state
 * reference will update and point to the property
 * value when a match occurs.
 */
export declare function isProperty(token: string): boolean;
/**
 * Is Allowed
 *
 * Checks the current cursor allows a value or some sort,
 * like filters or trim dashes. By default, when a value is
 * undefined on the specs, it is typically assumed to be `true`
 * unless we a dealing with a `required` value, which this
 * function does not validate for.
 */
export declare function isAllowed(prop: 'trims' | 'filters'): boolean;
/**
 * Is Parent
 *
 * Check to see if the tag or object has the correct parent
 * tag, ie: a child of a certain tag or scope.
 */
export declare function isParent(name: string): boolean;
/**
 * Is Error
 *
 * Conditional checks the local error state reference
 * with the provided Query error enum.
 */
export declare function isError(err: QueryErrors): boolean;
/**
 * Is Object Type
 *
 * Validate the current object reference `type` value.
 * The object being validate will be type matched against
 * the most recent object applied at `SetObject()` or via
 * `isProperty()` function.
 */
export declare function isObjectType(type: Type): boolean;
/**
 * Is Tag Type
 *
 * Validate a current tag `type` value. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export declare function isTagType(type: Type): boolean;
/**
 * Is Type
 *
 * Validate the current argument `type` value. It will match
 * an argument/parameter value type. This is a sugar shortcut
 * function called when scanning a token by the parser.
 */
export declare function isType(type: Type): boolean;
/**
 * Is Within
 *
 * Used to validate the whereabouts of the current tag or filter
 * argument query engine position.
 */
export declare function isWithin(token: Within): boolean;
/**
 * Is Required
 *
 * Checks the requirement for arguments, argument parameters or
 * parameter values. When a parameter has a `keyword` type, then
 * this returns `true`.
 */
export declare function isRequired(): boolean;
/**
 * Is Optional
 *
 * Checks the requirement for every argument. If an arguments
 *  `required` value returns `true` then a boolean `false` will
 * be returned indicating that arguments are not optional and at
 * least 1 value is required. The function accepts a starting index,
 * default to the current argument index location.
 *
 * Some tag/filter arguments might all be optional, whereas some
 * might contain an optional starting arguments, but require arguments
 * proceeding that.
 */
export declare function isOptional(from?: number): boolean;
