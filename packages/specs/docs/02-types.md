## Types

Tags, filters and objects all accept different types that will describe either a value or token. The specs provide 3 separate type groups which might at first seem extraneous or confusing but are actually rather simple to understand.

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
