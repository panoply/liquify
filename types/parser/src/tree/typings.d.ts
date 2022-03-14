import { Type } from '@liquify/liquid-language-specs';
export declare const enum NodeType {
    Root = 0,
    Pair = 1,
    Void = 2,
    Start = 3,
    Embed = 4,
    Output = 5,
    Singular = 6
}
export declare const enum Token {
    Token = 1,
    Start = 1,
    Inner = 2,
    Ender = 3,
    Outer = 4
}
export interface IScopes {
    /**
     * Tag scopes will either hold an object value, string value
     * or be `undefined` and the information contained on the
     * scope property different depending on the tag.
     *
     * When the value of scope is an object type we are dealing
     * with a tag that holds a local set of scopes, this will typically
     * be a `{% for %}` loop tag, wherein the iterator is assigned
     * the value of an array of objects. The scope in such a case
     * will hold reference to the iterators value
     *
     * ----
     *
     * Example:
     *
     * ```javascript
     *
     * {% for item in collection.products %}
     *   {{ item.id }}
     * {% endfor %}
     *
     * ```
     *
     * Where the iterator value of `item` represents the `product`
     * object (in the specifications). The `for` nodes scope value
     * would be:
     *
     * ```javascript
     * { scope: { item: 'product' } }
     * ```
     *
     * Everytime we intercept a output tag which had a tag name
     * value of `item` will have a scope `string` value of:
     *
     * ```javascript
     * { scope: 'product'
     * ```
     *
     * ----
     *
     * In cases where we have nested `for` loops, the scope
     * reference modified and applied accordingly. The algorithm
     * might seem a tad unknown but it is designed this way so
     * as to generate and validate in the most performant possible
     * way ie: without doing too much heavy lifting.
     */
    scope: {
        [tag: string]: string | Type;
    } | string | undefined;
}
export interface IObjects {
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
    objects?: {
        [offset: number]: string[] | number;
    };
}
export interface INode extends IScopes, IObjects {
}
