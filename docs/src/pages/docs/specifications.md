# Specifications

This directory contains the default supported Liquid variation specifications which are used by the parser to construct a workable AST and provide code completions, formatting, hovers and diagnostic validation features for the [Liquid Language Server](#).

### What are variation specifications?

In the context of the [Liquid Language Server](#), variation specifications are just data references that describe Liquids syntax like tags and filters. A templating language like Liquid exists in a multitude of variations that extend upon its default [Standard Variation](#). Templating engines interpolate variables and process dynamic content, they're these safe user facing languages that do not adhere to any type of specification and traditionally have never really required such a thing, until now.

### Supported Variations

By default, all new projects will use the **Standard** variation of Liquid. The Liquid Language Server supports the following Liquid variations out of the box:

- [Liquid Standard](#)
- [Liquid Shopify](#)
- [Liquid Jekyll](#)

# Schema

Liquid variation specifications are written according to a [Schema Store](#) JSON specification. Options are made available according to the defined Liquid tag [type](#). The below example is a spec sample which specifies 3 tags, you can also take a peak in the [variations](#) directory for oversight on how default variations are specified.

<details>
<summary>
  <strong>View Example</strong>
</summary>
<p>

```javascript
{
  "tag_object": {
    "type": "object",
    "description": "Object name description",
    "filters": true, // tag accepts filters
    "whitespace": true, // tag accepts whitespace dash
    "engine": "Standard", // This tag should extend upon the standard liquid variation
    "reference": "https://liquify.dev/example-specification/tag_object",
    "properties": [ // Object has properties
      {
        "name": "property",
        "description": "Description of first property",
        "type": "object", // Use type `object` when defining another property
        "properties": [ // Another property (you can nest as many as you like)
          {
            "name": "another_property",
            "description": "Description of second property",
          }
        ]
      }
    ]
  }
  "tag_import": {
    "type": "import",
    "description": "Description of import tag", // The tag description
    "filters": false // Tag does not accept filters
    "params": [
      {
        "name": "param",
        "description": "Parameter description to use"
      }
    ]
  },
  "filter_replace": {
    "type": "filter",
    "description": "Description for tag filter",
    "snippet": "replace: $1, $2", // the snippet for the filter
    "engine": "Shopify", // The Shopify Liquid variation
  }
}
```

</p>
</details>

<details>
<summary>
  <strong>View Example</strong>
</summary>
<p>

| Property      | Kind       | Default | Description                                                 |
| ------------- | ---------- | ------- | ----------------------------------------------------------- |
| `type`        | `string`   | `null`  | The tag type, see [type](#) for available types             |
| `filters`     | `boolean`  | `false` | Does this tag accept filter, eg: `\|` filters               |
| `whitespace`  | `boolean`  | `true`  | Does this tag accept whitespace `-` dashes                  |
| `description` | `string`   | `null`  | Short description which describes the tag                   |
| `properties`  | `object[]` | `null`  | List of object properties the tag uses, see [properties](#) |
| `engine`      | `string`   | `null`  | The variation specification (engine) reference              |
| `reference`   | `string`   | `null`  | The tag URL link, typically documentation reference         |
| `snippet`     | `string`   | `null`  | The snippet completion tag should use                       |
| `singular`    | `boolean`  | `false` | The tag is a non-void, does not require end tag             |
| `params`      | `object[]` | `null`  | List of parameters the tag uses, see [parameters](#)        |
| `operators`   | `string[]` | `null`  | Tag operators, typically used on control type               |
| `deprecated`  | `boolean`  | `false` | Used when the tag is deprecated                             |
| `language`    | `string`   | `null`  | The language of tag inner contents, see [embedded](#)       |
| `attributes`  | `object[]` | `null`  | The attributes the tag accepts, see [attributes](#)         |

</p>
</details>

<details>
<summary>
  <strong>Type</strong>
</summary>
<p>

| Name        | Grammar Scope | Capture Example | Description                                   |
| ----------- | ------------- | --------------- | --------------------------------------------- |
| `comment`   | `comment`     | ``              | Allows un-rendered code                       |
| `control`   | `keyword`     | ``              | Controls conditional execution of code        |
| `embedded`  | `meta`        | ``              | Contents of the tag contains another language |
| `filter`    | `support`     | ``              | Attribute-like amendments to singular tags    |
| `import`    | `meta`        | ``              | Tags which import/reference outside files     |
| `iteration` | `keyword`     | ``              | Iteration tags run blocks of code repeatedly  |
| `object`    | `storage`     | ``              | Singular tags that contains objects           |
| `output`    | `meta`        | ``              | Block tags that generate additional code      |
| `raw`       | `raw`         | ``              | Raw temporarily disables tag processing       |
| `variable`  | `variable`    | ``              | Variable tags create new Liquid variables.    |

</p>
</details>

<details>
<summary>
  <strong>Properties</strong>
</summary>
<p>

| Name          | Kind       | Default | Description                                        |
| ------------- | ---------- | ------- | -------------------------------------------------- |
| `name`        | `string`   | `null`  | The property name                                  |
| `description` | `string`   | `null`  | Short description which describes the tag property |
| `type`        | `string`   | `null`  | Contents of the tag contains another language      |
| `properties`  | `object[]` | `null`  | Attribute-like appendments to singular tags        |

</p>
</details>

<details>
<summary>
  <strong>Parameters</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `name`        | `string` | `null`  | The property name                               |
| `description` | `string` | `null`  | Short description which describes the parameter |
| `snippet`     | `string` | `null`  | The snippet value applied after pipe `\|`       |

</p>
</details>

<details>
<summary>
  <strong>Attributes</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `name`        | `string` | `null`  | The property name                               |
| `description` | `string` | `null`  | Short description which describes the attribute |

</p>
</details>

# Contributing

Specifications are proprietary closed additions to Liquify. Specifications have relations to [Liquid Language Grammars](#) and the [Liquid Language Server](#).

### Commands

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm run specs` | Launches debugger and bundler for the language client |
