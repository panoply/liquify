## Wiki

Liquid specifications are just basic JSON. The specs are used to describe tags, filters and objects used in the template language. They can be equated to grammars in the context of a parser. The [Liquify)(#) IDE plugin uses these specs to provide features like linting/validations, auto-completion and hovers to the editor and anyone who is using Liquid can compose a specification and have features provided by Liquify in custom variations.

## Naming Conventions

The specifications refer to tokens in not so typical manner. We are not dealing with a _real_ programming language and for the most part, the vast majority of developers who are leveraging it are doing so from an intermediate standpoint.

| Name      | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| Tag       | Refers to a pair or singular type token using curly brace + percent delimiters   |
| Output    | Refers to a singular type token using double curly brace delimiters              |
| Filter    | Refers to a pipe separated modifier which is appended to tags and outputs        |
| Object    | Refers to a value that contains properties using a dot or bracket separator      |
| Property  | Refers to a value contained on an object separated by a dot or bracket           |
| Parameter | Refers to a alphanumeric value appended by a colon character                     |
| Argument  | Refers to a value proceeding an actionable operation which is contextually bound |
| Singular  | Refers to a an output tag or a type of tag that does not require an ender        |
| Keyword   | Refers to a alphanumeric word boundary that holds a value of something           |

#### Tag

Tags are tokens which use a curly brace and percentage character combination delimiters. Tags can be either `singular` or pairs. By default, all tags are considered _pairs_ which means the tag requires an start and end. Takes that are _singular_ in nature require one to explicitly infer this by asserts `true` to the singular property of tags.

```js
// Example of tag pair
{% capture foo %} {% endcapture %}

// Example of a singular tag
{% assign foo = 'bar' %}

// Example of an output type tag
{{ tag }}
```

#### Filter

Filters are contained within _output_ and sometimes _singular_ or _pair_ tags. Filters begin with a pipe character separator and can be expressed as a `keyword` or `parameter`. Filters will typically require _arguments_ to be defined. All filter keywords that contain arguments will check for a `colon` character.

```js
// Example of a BAO (basic argument order) filter
{{ tag | truncate: 1, 'xxx' }}

// Example of an AWP (argument with parameter) filter
{{ tag | default: 'foo', allow_false: false }}

// Example of an PAA (parameter with argument) filter
{{ tag | font_face: font_display: 'block' }}

// Example of an PAM (property and modifier) filter
{{ some_image | font_modify: 'weight', 'bold' }}
```

> More on how we construct [arguments](#) in the specs below.

#### Object

Objects are just values. Because liquid is a consumer facing template language, objects will generally ship pre-defined. This is not always the case but for the most part it is. Objects can passed as values to tags, filters or be used as the value of an _output_ type token. The _objects_ specifications are composed different to tags and filters.

```js
// Example of an object used in an output tag
{{ object.property }}

// Example of an object used within a pair type iteration tag
{% for i in object.collection %} {% endfor %}

// Example of an object used within filter arguments
{{ 'hello world' | truncate: some.number, some['string']  }}
```

## Types

Tags, filters and objects all accept different types that will describe either a value or token. The specs provide 3 separate type groups which might at first seem extraneous or confusing but are actually rather simple to understand and digest.

The 3 type groups are as follows:

- BT: Basic Types
- TT: Tag Types
- AT: Argument Types

> **TIP** Take a look in the [standard](#) data directory to see how each type is defined and used in different files.

#### TT: Tag Types

Argument types are those of which describe will the functionality of a tag. Tag types can only be used to describe tags. The specifications describe tag types using a enumerable value:

| Enum | Name        | Description                                               |
| ---- | ----------- | --------------------------------------------------------- |
| `1`  | `control`   | A tag which executes conditionals, eg: `if`               |
| `2`  | `comment`   | A tag which is a comment                                  |
| `3`  | `embedded`  | A tag thats inner contents is a language, eg: `schema`    |
| `4`  | `import`    | A tag which imports an external file, eg: `render`        |
| `5`  | `iteration` | A tag which executes iteration, eg: `for`                 |
| `6`  | `link`      | A tag which links to an remote url or uri                 |
| `7`  | `output`    | A tag which uses double curly delimiters, eg: `{{ tag }}` |
| `8`  | `variable`  | A tag which assigns a value to a keyword, eg: `assign`    |
| `9`  | `raw`       | A tag that inner contents should be excluded              |
| `10` | `unknown`   | A tag of and unknown type                                 |

#### BT: Basic Types

Basic types are types of which are common to all languages. The specifications describe basic types using an enumerable value.

| Enum | Name      | Description                                     |
| ---- | --------- | ----------------------------------------------- |
| `1`  | `string`  | A value surrounded by quotation characters      |
| `2`  | `boolean` | A value of either `true`, `false` or `nil`      |
| `3`  | `object`  | A value which has properties                    |
| `4`  | `array`   | A value which is an array value                 |
| `5`  | `number`  | A value that can accept float or integer digits |
| `6`  | `integer` | A integer only number value, eg: `25`           |
| `7`  | `float`   | A float only number value, eg: `-25.50`         |
| `8`  | `unknown` | A value that can be _any_ basic type            |

#### AT: Argument Types

Argument types are those of which are made available within arguments. The specifications describe argument using an enumerable value. Typically, argument types are used by filters but can also be found within tags.

| Enum | Name        | Description                                                |
| ---- | ----------- | ---------------------------------------------------------- |
| `9`  | `parameter` | A value prepended with a colon character, eg: `parameter:` |
| `10` | `keyword`   | A value that is a alphanumeric combination, eg: `keyword`  |
| `11` | `attribute` | A value prepended with a equals character, eg: `attr=`     |

> Notice how the enumerable value starts at `9` following the Basic Types last enum.

## Arguments

Filters and tags may contain an `arguments[]` property. Arguments are considered the contextual markup contained within a Liquid tag or filter. Arguments are digested by the [Language Server](#) and the [Parser](#). The `arguments` property available in specs provide us a way to describe how values should be expressed. There are a few ways to construct arguments as there is no one-size/fits-all approach.

There are 4 ways one can compose arguments:

- BAO: Basic Argument Order
- PAA: Parameter as Argument
- AWP: Argument with Parameter
- PMA: Property/Modifier Argument

> **IMPORTANT** All arguments are constructed as an `array` type.

#### BAO: Basic Argument Order

Basic Argument Order, (BAO for short) are generally used for describing filter arguments that accept basic types. They are composed as an array of objects. The parser will begin walking from index `0` and incrementally move to the next item in the array as it progresses over the token. Each argument should be composed in ordered formation, from the first expected argument to the last.

Below is is how we describe the `truncate` liquid filter in the [Standard](#) specification. The truncate filter is expressed as follows in Liquid:

```js
{{ 'hello world' | truncate: 1, 'xxx' }}
```

When describing the `truncate` filter in the spec we will be also informing the parser on how to handle its arguments. The `truncate` filter requires a number (integer) type be passed as the first argument and it also provided an optional (second) string type parameter. Below is an exert from the [standard](#) spec.

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

A parameter as argument (PAA for short) is used when an argument accepts only a parameter. We refer to this as an PAA (Parameter _as_ Argument) because the argument provided can only be parameter values. We assert the structure of a PAA similar to how we structure a BAO and AWP with difference being that the `value` property is supplied an `object` opposed to `string` or `array` type. Each property key contained in `value` represents available parameters.

Below we have the `font_face` filter which is available in the Shopify Liquid variation. This filter accepts an optional parameter argument.

```js

{{ some_image | font_face: font_display: 'block' }}

```

When describing the `font_face` filter in the spec we will be also informing the parser on how this should be handled by using some additional properties. We inform that the argument is optional by setting `required` to `false`. The parameter available to `font_face` must be uniquely which we assert by setting the `unique` property `true` (this is the default for parameters and can be omitted). The main aspect of a PAA is the `value` property as the all the properties contained within will be validated against by the parser and in addition used by the language server as code completions.

##### Parameter Value

The `font_display` parameter `value` property is an array object list and each object has an `value` and `description` property which will be used by the language server in code completions and hovers.

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

Below we have the `img_url` filter which is available in the Shopify Liquid variation. This filter accepts additional parameters following _string_ value argument.

```js
{{ some_image | img_url: '240x', scale: 2, format: 'jpg' }}
```

When describing the `img_url` filter in the spec we will be also informing the parser on how this should be handled by using some additional properties. The `img_url` filter accepts an optional `string` type argument be passed and we have provided a Regex via the `pattern` property value. When a `pattern` property is detected the parser will use it to validate any string that it intercepted (if an object was passed it will validate against the `type` value).

##### Value

The `value` property contains a array list of strings, the reason why we have provided both a `pattern` and `value` to the argument is because the language server will provide code completions using the `value` property whereas the parser will use the `pattern` property to validate against. It's important to note that the `pattern` property will always take precedence over a `value` property when it exists on an argument.

##### Parameter

The `parameter` property is an object. We inform the parser that the parameters available must be unique via the `unique` property asserting `true` (which is the default and can be omitted). This option will prevent duplicates from being expressed in the argument. We also assert that the parameters are optional by giving the `required` property a `false` value. The `value` property contained within the `parameter` property is expressed as an object and each property key contained in `parameter.value` represents the available values. Each parameter value contains both a `pattern` and `value` property and these will be handled the same way as the initial string argument with the language server using the values contained in `value` as completions and the parser using Regex `pattern` as the validator.

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

A Property/Modifier Argument (PMA for short) represents an pair of arguments. The first argument indicates a property and the second is the modification to be made. This argument requires different modifier values be provided depending the type of property that was supplied.

Below we have the `font_modify` filter which is available in the Shopify Liquid variation. This filter requires PMA be passed.

```js

{{ some_image | font_modify: 'weight', 'bold' }}

```

When describing the `font_modify` filter in the spec we will be also informing the parser on how this should be handled. We have assert that need both arguments by setting `true` on `required` property. The first argument we provide 2 values to the `value` property, both of these represent the `properties` of the PMA. The second argument we provide is similar to the first but the difference is that we have supplied an `object` to the `value` property. The object contains 2 properties, `style` and `weight` both of which point to an argument value defined in the first argument.

##### Important

Property/Modifier arguments will only match against the last value encountered by the parser. Parsing errors will occur if a `value` property is supplied an object without the specs previous argument containing using an `array` type value, PMA types require the specs adhere to the following:

1. First argument `value` property type is an array with minimum of 2 values.
2. Second argument `value` property type is an object who's property match first argument values.

##### Modifier Argument

When an object is provided to a `value` property and the argument is of type string (`1`) then the previous provided argument value is referenced and matched against the modifier value. In the spec we also passing an `object` to the `pattern` property, similar to how we point the `value` keys to the previous argument, the `pattern` option can also reference the previous provided argument value.

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

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
