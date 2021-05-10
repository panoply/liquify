<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-language-specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) text editor extension/plugin.

**Liquify is proprietary closed source software. The distributed code provided in this package is enigmatic and has been encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm**

## Why?

The [Liquid Language Server](#) requires these Liquid specification variation references to compose a workable AST and provide LSP capabilities to the various Liquify clients.

## What the F\*ck are Liquid Language Specs?

In the context of the Liquid Language Server, variation specifications are just data references that describe Liquid syntax and enable developers to compose formal grammars. A template language like Liquid exists in a multitude of variations that extend upon its default [standard](https://shopify.github.io/liquid/) variation. Due to the versatile nature and endless implementations of Liquid, supporting intelliSense capabilities is difficult so by providing the server with these specs we can ensure that the modern IDE features expected can be facilitated.

## Specification Specs

Each specification contains 5 fields. The `engine` field refers to the name of the Liquid variation. Liquify supports 4 variations (Standard, Shopify, Jekyll and Eleventy) and its here where the one would specify the variation (or engine) the spec is describing. The `updated` field is a date field which informs of the last time the specification was updated. The `filters`, `tags` and `objects` fields are where all the information and the logic is contained for the variation we are writing the specification.

```json
{
  "engine": "name",
  "updated": "d-m-y",
  "filters": {},
  "tags": {},
  "objects": {}
}
```

## Contextual Grammars

The specifications provide different fields which can be leveraged to describe the formation and structure for how a Liquid tag or filter should be expressed. Tag and Filter contexts are expressed using a simple meta-syntax notation. Each keyword compiles into an expression and used to validate the tags or filters. Below is the grammar guide which is used to describe the contexts of characters or words in the specifications.

| Keyword        | Example                         |
| -------------- | ------------------------------- |
| `$keyword`     | `tag_name`                      |
| `$reference`   | `variable` or `object.property` |
| `$arguments`   | _refers to `arguments` field_   |
| `$operator`    | `[<>=!]` or `and` or `or`       |
| `$string`      | `"string"` _or_ `'string'`      |
| `$boolean`     | `true` _or_ `false`             |
| `$variable`    | `[a-zA-Z0-9_$]`                 |
| `$number`      | `[0-9]`                         |
| `$parenthesis` | `(` _or_ `)`                    |
| `$bracket`     | `[` _or_ `]`                    |
| `$equal`       | `=`                             |
| `$colon`       | `:`                             |
| `$comma`       | `,`                             |
| `$space`       | `\s`                            |
| `$dot`         | `.`                             |

### Writing Grammars

The grammar keywords should always start with the `$` dollar sign character. Separating keywords with a pipe character `|` equates to `or` and appending `?` question mark character to keywords infers optional.

> Filter _accept_ arguments only accept pipe (or) separators. Tag _context_ accept both pipe (or) and question mark (optional) characters.

## Tags

Liquid tag specification are different from object and filter specifications as they attempt to describe a Liquid tag. The tag specs accept additional fields to better help define the tag formation, its placement and type.

| Keyword         | Type       | Required |
| --------------- | ---------- | -------- |
| `description`   | `string`   | Yes      |
| `documentation` | `string`   | No       |
| `snippet`       | `string`   | No       |
| `type`          | `string`   | Yes      |
| `singular`      | `boolean`  | No       |
| `parents`       | `string[]` | No       |
| `context`       | `string[]` | Yes      |
| `arguments`     | `object[]` | No       |

#### Example

Below is an example of 2 tag specifications. The tags we are describing are the `for` tag and the `break` tag which are both tags provided in the Liquid standard variation and thus available in all variations as all sub-variations of Liquid extend upon Standard. The `for` and `break` tags a iteration type tags that are used to loop over a list or collection of items.

```json
{
  "tags": {
    "break": {
      "description": "Causes the loop to stop iterating when it encounters the break tag.",
      "documentation": "https://shopify.github.io/liquid/tags/iteration/#break",
      "singular": true,
      "type": "iteration",
      "parents": ["case", "for", "if", "unless"]
    },
    "for": {
      "description": "Repeatedly executes a block of code.",
      "documentation": "https://shopify.github.io/liquid/tags/iteration/#for",
      "snippet": "for ${1:item} in ${2|collection,(${3}..${4})|} ${0}",
      "type": "iteration",
      "context": ["$variable", "$in", "$reference", "$arguments?"],
      "arguments": [
        {
          "description": "Begins the loop at the specified index",
          "name": "offset",
          "snippet": "offset: ${0}",
          "arguments": [
            {
              "accepts": "$number|$reference",
              "required": true
            }
          ]
        },
        {
          "description": "Limits the loop to the specified number of iterations",
          "name": "limit",
          "snippet": "limit: ${1} ${0}",
          "arguments": [
            {
              "accepts": "$number|$reference",
              "required": true
            }
          ]
        },
        {
          "description": "Reverses the order of the loop. Note that this flag’s spelling is different from the filter `reverse`",
          "name": "reversed"
        }
      ]
    }
  }
}
```

#### Understanding `break`

In the above example the `break` tag has been asserted as a _singular_ tag. When describe a tag that does not require and end (ie: `{% endtag %}`) we classify it as a singular type tag by passing a value of `true` to the `singular` field. By default, all tags are assumed to require and end, so we need to explicitly assert this with a singular field. We have also provided a string list with a tag value of `for` via the `parents` field. The `parents` field is used to describe the placement of the tag, in the case of `break` it can only be used as within a _for_ tag. If the parser was to encounter the `break` tag outside of _for_ then an error will be thrown.

#### Understanding `for`

In the above example the `for` tag is using 2 important descriptors, the `context` and `arguments` field. The `context` field is string list of `keywords` and is used to describe the formation of the `for` tag. The context represents the structure from start to finish, in the that field we are asserting the following:

1. The 1st value following the `for` identifier should be a `$variable`
2. The 2nd value be a word named `in` by using `$in`
3. The 3rd value can be either an object or a variable by using `$reference`
4. The 4th value is an optional as we assert a `?` referring to the `$arguments` field

This structure mean that when the parser encounters the `for` tag it is going to check it follows that formation, for example:

```js
{% for item in items offset: 10 %}

{% endfor %}
```

1. `item` equates to `$variable`
2. `in` equates to `$in`
3. `items` equates to `$reference`
4. `offset: 10` equates to `$arguments` and will refer to `offset` argument `accepts` field.

Generating a specification for a Liquid tag will generally accommodate only a small fraction of use cases as specs for the popular and used variations are supported by default. Additional tag specifications are geared towards developers who have projects that are using plugins to provide additional tags like those found in Jekyll or Eleventy projects.

## Filters

Liquid filters are expressed proceeding a pipe `|` separator character within object tags. Some filters can accept arguments (sometimes referred to as _parameters_) which are expressed proceeding a colon `:` separator character. Filter specifications provide the following fields:

| Keyword         | Type       | Required |
| --------------- | ---------- | -------- |
| `description`   | `string`   | Yes      |
| `documentation` | `string`   | No       |
| `snippet`       | `string`   | No       |
| `arguments`     | `object[]` | No       |

#### Example

Below is an example of a filter specification. The filter we are describing is the `truncate` filter which is a filter provided in the Liquid standard variation and thus available in all variations as all sub-variations of Liquid extend upon Standard.

```json
{
  "engine": "standard",
  "updated": "d-m-y",
  "filters": {
    "truncate": {
      "description": "Shortens a string down to the number of characters passed as an argument. If the specified number of characters is less than the length of the string, an ellipsis (…) is appended to the string and is included in the character count",
      "documentation": "https://shopify.github.io/liquid/filters/truncate/",
      "snippet": "truncate: ${0}",
      "arguments": [
        {
          "accepts": "$number|$reference",
          "required": true
        },
        {
          "accepts": "$string|$reference"
        }
      ]
    }
  }
}
```

In the above example, we have given the `truncate` filter a description, this description is lifted from the Standard documentation found online and is what will be shown in text editors when a mouse hovers over the `truncate` filter. The `documentation` field is a url link, this will be shown as a reference in the hover descriptor. The `snippet` field is used to provide snippet completion capabilities, this is optional but generally recommended, you can read more those [here](https://code.visualstudio.com/docs/editor/userdefinedsnippets). The `arguments` field is the most important aspect for a filter spec as it describes what arguments the `truncate` is able to accept. The `arguments` field is telling the Liquid parser that `truncate` can accept either 1 or 2 arguments. The first argument accepts only a `number` or a `reference` and it is `required` which we explicitly declare by passing `true` to the `required` field. The truncate filter can optionally accept a 2nd argument that can be either a `string` or `reference` but this is optional, we can assert its optional by passing `false` to a `required` field or we can just omit it, in the above example we have omitted a required field and by doing so it will default optional.

### Objects

Liquid objects are pre-defined in most cases. If you are working in the Shopify variation, you do not control the data references of objects, they are (for the most part) set by Shopify. If you are working with the Jekyll or Eleventy Liquid variations, objects are determined by external data files that are either written in Yaml or JSON.

> For Jekyll and Eleventy variations, objects are generated automatically and in most cases that automatic generation will suffice. There is nothing stopping you from generating specs for specific data files.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
