## Arguments

Filters and Tags may contain an `arguments[]` property. Arguments are considered as contextual markup contained within a Liquid tag or filter. Arguments are digested by the [Liquid Language Server](/packages/server) and the [Liquify Parser](/packages/parser). The `arguments` property available in specs provide us a way to describe how values within tokens should be expressed. There is no one-size/fits-all approach so there are a few ways to construct arguments:

- BAO: Basic Argument Order
- PAA: Parameter as Argument
- AWP: Argument with Parameter
- PMA: Property/Modifier Argument

> **IMPORTANT** All arguments are constructed as an `array` type.

#### BAO: Basic Argument Order

Basic Argument Order, (BAO for short) are generally used for describing arguments that accept basic types. They are composed as an array of objects. The parser will begin walking from index `0` and incrementally move to the next item in the array as it progresses over a token. Each argument should be composed in an ordered formation, from the first expected argument to the last.

Below is is how we describe the `truncate` liquid filter in the [Standard](#) specification. The truncate filter is expressed as follows in Liquid:

```js
{{ 'hello world' | truncate: 1, 'xxx' }}
```

When describing the `truncate` filter in the spec we will be also informing the parser on how to handle its arguments. The `truncate` filter requires a number (integer) type be passed as the first argument and it also provides an optional (second) string type parameter. Below is an exert from the [standard](#) spec.

The spec is are informing the Parser of the following:

- The first argument is of type `number` and `required`
- The second argument is of type `string` and `optional` as `required` is set to `false`

```ts
{
  truncate: {
    description: 'Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (…) is appended to the string and is included in the character count',
    snippet: 'truncate: $1 $0',
    arguments: [
      {
        type: 5, // number
        required: true
      },
      {
        type: 1, // string
        required: false
      }
    ],
    reference: {
      name: 'Standard Liquid',
      url: 'https://shopify.github.io/liquid/filters/truncate/'
    }
  },
}
```

When the parser encounters this filter, the following operations will occur:

1. Validates that `truncate` contains a colon operator.
2. Reference the `arguments` array and check that the first `required` argument was provided.
3. Validate the argument is of type `number`
4. Look for a comma character argument separator.
5. If comma exists, it will move to the next value in the arguments array (index `1`)
6. Check if the second argument is `required` or optional
7. Validate the argument is of type `string`

### PAA: Parameter as Argument

A parameter as argument (PAA for short) is used when an argument accepts a parameter. We refer to this as a PAA (Parameter _as_ Argument) because the argument provided can only be parameter value. We assert the structure of a PAA similar to how we structure a BAO and AWP with the difference being that the `value` property is supplied as an `object` opposed to `string` or `array` type. Each property key contained on the `value` represents an available parameter.

Below we have the `font_face` filter which is provided in the Shopify Liquid variation. This filter accepts an optional parameter argument.

```js

{{ some_image | font_face: font_display: 'block' }}

```

When describing the `font_face` filter in the spec we will be also informing the parser on how this should be handled by using some additional properties. We inform that the argument is optional by setting `required` to `false`. The parameter available to `font_face` must be unique which we assert by setting the `unique` property to `true` (this is the default for parameters and can be omitted). The main aspect of a PAA is the `value` property as all the properties contained within will be validated against in the parser and also used by the language server in code completions.

##### Parameter Value

The `font_display` parameter `value` property is an array object list and each object has a `value` and `description` property which will be used by the language server in code completions and hovers.

The spec is informing the following:

- The first argument is of type `parameter` and `optional` as `required` is set to `false`
- The parameters must be uniquely expressed as `unique` is set to `true`
- The `font_display` parameter accepts a string matching the `pattern` provided.
- The `font_display` values contained in the `value` property to be used in completions and hovers.

```ts
{
  arguments: [
    {
      type: 9, // parameter
      required: false,
      unique: true,
      value: {
        font_display: {
          type: 1, // string
          description: '',
          pattern: /auto|block|swap|fallback|optional/,
          value: [
            {
              value: "auto",
              description: 'The font display strategy is defined by the user agent.'
            },
            {
              value: 'block',
              description: 'Gives the font face a short block period and an infinite swap period.'
            },
            {
              value: 'swap',
              description: 'Gives the font face an extremely small block period and an infinite swap period.'
            },
            {
              value: 'fallback',
              description: 'Gives the font face an extremely small block period and a short swap period.'
            },
            {
              value: 'optional',
              description: 'Gives the font face an extremely small block period and no swap period.'
            }
          ]
        },
      }
    }
  ],
}
```

### AWP: Argument with Parameter

An Argument with Parameter (AWP for short) are used when an argument also accepts an additional parameter value. We refer to this as an AWP (Argument _with_ Parameter) because the parameter/s can only be provided following an argument value. We can assert this structure by providing a `parameters` object property to the argument and inform the parser that the parameters are only available after the value has been passed.

Below we have the `img_url` filter which is available in the Shopify Liquid variation. This filter accepts additional parameters following a _string_ value argument.

```js
{{ some_image | img_url: '240x', scale: 2, format: 'jpg' }}
```

When describing the `img_url` filter in the spec we will be also informing the parser on how this should be handled by using some additional properties. The `img_url` filter accepts an optional `string` type argument be passed, notice how we have provided Regex via the `pattern` property value. When a `pattern` property is detected the parser will use it to validate any token that it intercepted (if an object was passed it will validate against the `type` value).

##### Value

The `value` property contains a array list of strings, the reason why we have provided both a `pattern` and `value` to the argument is because the language server will provide code completions using the `value` property values whereas the parser will use the `pattern` property to validate against the token intercepted. It's important to note that the `pattern` property will always take precedence over a `value` property when it exists on an argument.

##### Parameter

The `parameter` property is an object. We inform the parser that the parameters available must be unique via the `unique` property asserting it as `true` (which is the default and can be omitted). This option will prevent duplicate parameters (repeated) from being expressed in the argument. We also assert that the parameters are optional by giving the `required` property a `false` value. The `value` property contained within the `parameter` property is expressed as an object and each property key contained in `parameter.value` represents available values. Each parameter value contains both a `pattern` and `value` property and these will be handled the same way as the initial string argument, ie: the language server uses the values contained in `value` as completions and the parser uses the regex `pattern` as the validator.

The spec is informing the following:

- The first argument is of type `string` and `optional` as `required` is set to `false`
- The value passed in should be validated against using the regex provided on `pattern` property
- The language server provides code completions for the argument using the `value`property
- The argument accepts an optional parameter via the `parameter` property
- The parameters must be uniquely expressed within argument as `unique` is set to `true`
- The `crop` parameter accepts a string matching the `pattern` and its `value` used in completions
- The `scale` parameter accepts a string matching the `pattern` and its `value` used in completions
- The `format` parameter accepts a string matching the `pattern` and its `value` used in completions

```ts
{
  arguments: [
    {
      type: 1, // string
      description: "The original image size",
      value: ["master"],
      required: false,
      parameter: {
        unique: true,
        required: false,
        value: {
          crop: {
            type: 1, // string
            value: ["top", "center", "bottom", "left", "right"],
          },
          scale: {
            type: 1, // string
            pattern: /[23]/,
            value: ["2", "3"],
          },
          format: {
            type: 1, // string
            pattern: /p?jpg/,
            value: ["jpg", "pjpg"],
          },
        },
      },
    },
  ];
}
```

### Property/Modifier Argument

A Property/Modifier Argument (PMA for short) represents a pair of arguments. The first argument indicates a property and the second is the modification to be made. This argument requires different modifier values be provided depending upon the type of property that was supplied.

Below we have the `font_modify` filter which is available in the Shopify Liquid variation. This filter requires a PMA be passed.

```js

{{ some_image | font_modify: 'weight', 'bold' }}

```

When describing the `font_modify` filter in the spec we will be also informing the parser on how this should be handled. We have asserted that we need both arguments by setting `true` on `required` property. The first argument we provided has 2 entries on `value` property, both of these represent the `properties` available to the PMA. The second argument we provide is similar to the first but the difference is that we have supplied an `object` to the `value` property. The object contains 2 properties, `style` and `weight` both of which point to a value defined in the first argument defined at index `0`.

##### Important

Property/Modifier arguments will only match against the last value encountered by the parser. Parsing errors will occur if a `value` property is supplied as an object without the specs previous argument using an `array` type value. The PMA types require the specs adhere to the following:

1. First argument `value` property type is an array with minimum of 2 values.
2. Second argument `value` property type is an object who's property match first argument values.

##### Modifier Argument

When an object is provided to a `value` property and the argument is of type string (`1`) then the previous provided argument value is referenced and matched to the modifier property value expressed on the value object. In the spec we, notice how we are also passing an `object` to the `pattern` property. Similarly to how we point the `value` keys to the previous argument, the `pattern` option can also reference the previous provided argument value.

The spec is informing the following:

- The first argument is of type `string` and `required` is set to `true`
- The value passed in should be validated against using the regex provided on `pattern` property
- The language server provides code completions for the argument using the `value`property
- The second argument is of type `string` and `required` is set to `true`
- The first argument value is the key when using the regex provided on `pattern` property
- The second argument provides completions based on first argument value.

```ts
arguments: [
  {
    type: 1, // string
    required: true,
    pattern: /style|weight/,
    value: [
      {
        value: "style",
      },
      {
        value: "weight",
      },
    ],
  },
  {
    type: 1, // string
    required: true,
    pattern: {
      style: /normal|italic|oblique/,
      weight: /normal|bold|bolder|lighter/,
    },
    value: {
      style: [
        {
          value: "normal",
        },
        {
          value: "italic",
        },
        {
          value: "oblique",
        },
      ],
      weight: [
        {
          value: "normal",
        },
        {
          value: "bold",
        },
        {
          value: "bolder",
        },
        {
          value: "lighter",
        },
      ],
    },
  },
];
```

When the parser encounters this filter, the following operations will occur:

1. Validates that `img_url` contains a colon operator.
2. Reference the `arguments` array and check that the first `required` argument was provided.
3. Validate the argument is of type `number`
4. Look for a comma character argument separator.
5. If comma exists, it will move to the next value in the arguments array (index `1`)
6. Check if the second argument is `required` or optional
7. Validate the argument is of type `string`
