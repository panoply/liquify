# Nodes

Each node contained on the AST is a class instance of [INode](#). Depending on what type of node (tag) that is parsed some properties may differ in terms of its data references and methods.

# Objects

Liquid Tags which contain objects maintain a store on the node via the `objects` key. Each property contained on the `objects` key points to an offset location in the object who's values will either be a `Array<string | number>` or `number` type. When the value of a key is of type `number` the number will point to property within the object containing an array list of string values. Each item contained in the `string[]` array value type represents a property value expressed on the parsed Liquid tag but in cases where a nested object is being referenced, the item will will be `number` who's value points to a property containing an object key list. When an indexed notation structure is detected, the value will reflect the input, ie: `[0]`.

This might seem a little confusing, so to be best illustrate how it works lets take the following Liquid output tag. This tag contains 2 different objects, `example` and `bar` ~ each with properties.

```liquid
{{ example.prop.foo | filter: bar.baz }}
```

The above output tag will contain an `objects` key on the node that will describe the objects and their properties using the aforementioned structure:

```javascript
{
  4: [ 'example', 'prop', 'foo' ],
  12: 4,
  17: 4,
  31: ['bar', 'baz'],
  35: 30
}
```

Every key in the structure represents the offset location within the document (starting from `0`). Notice how the index keys `4` and `31` hold a `string[]` list value whereas `12`, `17` and `35` hold a number value. The key values `4` and `31` represent the starting point of the tags objects and the string list values contain the tags object keys in their entirety. The key values `12` and `17` point to index `4` which is the location at which the tag object began (this is the same for the `35` key). If (for example) we wanted to known the offset location of the object at which `foo` belongs, its value of `4` points us to the objects starting point and all the properties expressed.

The objects within Liquid tags are always asserted in this manner as we want to walk the specifications in the fastest possible manner. In cases where a tag object has been assigned to another value then the structure differs and you'll need to consult the `scope` key, more on that below.

### Nested Objects

```liquid
{{ example.prop[nested.value['array'][0]].something }}
```

```javascript
{
  4: [ 'example', 'prop', 'foo' ],
  12: 4,
  17: [''],
  31: ['bar', 'baz'],
  35: 30
}
```

# Scopes

Nodes which contain a `scope` key holds a scoped reference. Scopes in the context of the Liquid Parser infer that a value (typically an object) is using a re-assignment. The information contained on the scope key differs depending on the type of tag we are dealing with. The value will be one of the following types:

- `object`
- `string`
- `string[]`
- `undefined`

  ***

### Object Type Scopes

When the value of scope is an object type we are dealing with a tag that holds a local set of scopes, this will typically
be a `{% for %}` loop tag, wherein the iterator is assigned the value of an array of objects. The scope in such a case
will hold reference to the iterators value which pertains to the specification data.

Example:

```javascript

{% for foo in collection.products %}
  {{ foo.id }}
{% endfor %}

```

Where the iterator value of `foo` represents the `product` object (in the specifications). The `for` nodes scope value
would be:

```javascript
{
  scope: {
    foo: 'product';
  }
}
```

Every time we intercept a output tag which had a tag name value of `foo` will have a scope `string` value of:

```javascript
{
  foo: 'product';
}
```

In cases where we have nested `for` loops, the scope reference modified and applied accordingly. The algorithm
might seem a tad unknown but it is designed this way so as to generate and validate in the most performant possible way ie: without doing too much heavy lifting.

---

#### String[] Type Scopes

When the value of scope is a `string` or `string[]` we are dealing with an assignment reference. This will typically be
an assignment value which points to a an object reference or another type of value. This scope type is used to determine
what a variable may hold.

Example:

```javascript

{% assign foo = article.image %}

```

Above we have assigned the variable `foo` to an object `article.image`. This value is based on the specification pointing to an object. Whenever we call `foo` in an output tag, the scope of the `{{ foo }}` tag will point to the following scope:

```javascript
{
  scope: {
    foo: ['article', 'image'];
  }
}
```

In situations where the assigned `foo` variable is being used within a another tag or filter, the scope will be applied in the same way. For example, the following tags would assign this scope in the same way:

```javascript

// The "foo" scope will be assigned
{{ some.object | filter: foo }}

// The "foo" scope will be assigned
{% if some.object == foo %}

// The "foo" scope will be assigned
{{ some.object[foo] }}

```

No matter where in a tag the "foo" assignment exists, scope is assigned accordingly. In situations where the assignment of "foo" is re-assigned, the scope will always reflect the last known reference. For example:

```liquid

<!-- The foo assignment points to an object -->
{% assign foo = article.image %}

<!-- The value of foo can point to "alt" in the article object -->
{{ foo.alt }}

<!-- The value of foo can point to "src" in the article object -->
{{ foo.src }}

<!--
  At this point, completions and validation for the "foo" assignment
  should reference the "article.image" object reference. However,
  if "foo" is re-assigned then the references after this point should
  point to the updated value.
-->

<!-- The assignment points "src" and is re-assigned. -->
{% assign foo = foo.src %}

<!-- The value of foo is no longer a property reference, it is a string -->
{{ foo }}

<!-- This will fail as "foo" no longer points to an object. -->
{{ foo.src }}

```
