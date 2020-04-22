# Specifications

This directory contains the default supported Liquid variation specifications which are used by the parser to construct a workable AST and provide code completions, formatting, hovers and diagnostic validation features for the [Liquid Language Server](#). The specifications are the foundation of the servers functionality, without them the parser will fail.

### What are variation specifications?

In the context of the Liquid Language Server, variation specifications are just data references that describe tags and filters used in Liquid. A templating language like Liquid exists in a multitude of variations that extend upon its default [Standard Variation](#). Templating engines interpolate variables and process dynamic content, they're these safe user facing languages that do not adhere to any type of specification and traditionally have never really required such a thing, until now.

### Supported Variations

By default, all new projects will use the **Standard** variation of Liquid. The Liquid Language Server supports the following Liquid variations out of the box:

- [Standard](#)
- [Shopify](#)
- [Jekyll](#)

# Schema

Liquid variation specifications are written according to a [Schema Store](#) JSON specification. Options are made available according to the defined Liquid tag [type](#).

| Property      | Kind       | Default | Description                                                 |
| ------------- | ---------- | ------- | ----------------------------------------------------------- |
| `type`        | `string`   | `null`  | The tag type, see [type](#) for avaliable types             |
| `filters`     | `boolean`  | `false` | Does this tag accept filter, eg: `|` filters                |
| `whitespace`  | `boolean`  | `true`  | Does this tag accept whitespace `-` dashes                  |
| `description` | `string`   | `null`  | Short description which describes the tag                   |
| `properties`  | `object[]` | `null`  | List of object properties the tag uses, see [properties](#) |
| `engine`      | `string`   | `null`  | The variation specification (engine) reference              |
| `reference`   | `string`   | `null`  | The tag URL link, typically documentation reference         |
| `snippet`     | `string`   | `null`  | The snippet completion tag should use                       |
| `singular`    | `boolean`  | `false` | The tag is a non-void, does not required `{% end %}`        |
| `params`      | `object[]` | `null`  | List of parameters the tag uses, see [parameters](#)        |
| `operators`   | `string[]` | `null`  | Tag operators, typically used on control type               |
| `deprecated`  | `boolean`  | `false` | Used when the tag is deprecated                             |
| `language`    | `string`   | `null`  | The language of tag inner contents, see [embedded](#)       |
| `attributes`  | `object[]` | `null`  | The attributes the tag accepts, see [attributes](#)         |

<details>
<summary>
  <strong>type</strong>
</summary>
<p>

| Name        | Grammar Scope | Capture Example      | Description                                   |
| ----------- | ------------- | -------------------- | --------------------------------------------- |
| `comment`   | `comment`     | `{% comment %}`      | Allows un-rendered code                       |
| `control`   | `keyword`     | `{% if ... }`        | Controls conditional execution of code        |
| `embedded`  | `meta`        | `{% style %}`        | Contents of the tag contains another language |
| `filter`    | `support`     | `{{ ... | filter }}` | Attribute-like appendments to singular tags   |
| `import`    | `meta`        | `{% include ... %}`  | Tags which import/reference outside files     |
| `iteration` | `keyword`     | `{% for ... %}`      | Iteration tags run blocks of code repeatedly  |
| `object`    | `storage`     | `{{ object.key }}`   | Singular tags that contains objects           |
| `output`    | `meta`        | `{% form %}`         | Block tags that generate additional code      |
| `raw`       | `raw`         | `{% raw %}`          | Raw temporarily disables tag processing       |
| `variable`  | `variable`    | `{% capture %}`      | Variable tags create new Liquid variables.    |

</p>
</details>

<details>
<summary>
  <strong>properties</strong>
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
  <strong>params</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `name`        | `string` | `null`  | The property name                               |
| `description` | `string` | `null`  | Short description which describes the parameter |
| `snippet`     | `string` | `null`  | The snippet value applied after colon           |

</p>
</details>

<details>
<summary>
  <strong>attributes</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `name`        | `string` | `null`  | The property name                               |
| `description` | `string` | `null`  | Short description which describes the attribute |

</p>
</details>
