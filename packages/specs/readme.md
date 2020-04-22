# Specifications

This directory contains the default supported Liquid variation specifications which are used by the parser to construct a workable AST and provide code completions, formatting, hovers and diagnostic validation features for the [Liquid Language Server](#). The specifications are the foundation of the servers functionality, without them the parser will fail.

### What are variation specifications?

In the context of the Liquid Language Server, variation specifications are just data references that describe tags and filters used in Liquid. A templating language like Liquid exists in a multitude of variations that extend upon its default [Standard Variation](#). Templating engines interpolate variables and process dynamic content, they're these safe user facing languages that do not adhere to any type of specification and traditionally have never really required such a thing, until now.

### Supported Variations

The Liquid Language Server supports the following Liquid variations:

- [Standard](#)
- [Shopify](#)
- [Jekyll](#)

> By default, all new projects will use the **Standard** variation of Liquid.

# Schema

Liquid variation specifications are written according to a [Schema Store](#) JSON specification. Options are made available according to the defined Liquid tag [type](#).

| Property      | Kind     | Default | Availability            | Description                                             |
| ------------- | -------- | ------- | ----------------------- | ------------------------------------------------------- |
| `type`        | String   | `null`  | -                       | The tag type, see [type](#) for avaliable types         |
| `filters`     | Boolean  | `false` | -                       | Does this tag accept filter, eg: `|` filters            |
| `whitespace`  | Boolean  | `true`  | -                       | Does this tag accept whitespace `-` dashes              |
| `description` | String   | `null`  | -                       | Short description which describes the tag               |
| `properties`  | Object[] | `null`  | `object`                | List of object properties the tag uses, see [object](#) |
| `engine`      | String   | `null`  | -                       | The variation specification (engine) reference          |
| `reference`   | String   | `null`  | -                       | The tag URL link, typically documentation reference     |
| `snippet`     | String   | `null`  | -                       | The snippet completion tag should use                   |
| `singular`    | Boolean  | `false` | -                       | The tag is a non-void, does not required `{% end %}`    |
| `params`      | Object[] | `null`  | `iteration` or `import` | List of parameters the tag uses, see [parameters](#)    |
| `operators`   | String[] | `null`  | `control`               | Tag operators, typically used on control type           |
| `deprecated`  | Boolean  | `false` | -                       | Used when the tag is deprecated                         |
| `language`    | String   | `null`  | `embedded`              | The language of tag inner contents, see [embedded](#)   |
| `attributes`  | Object[] | `null`  | `embedded` or `output`  | The attributes the tag accepts, see [attributes](#)     |

<details>
<summary>
  <strong>`type`</strong>
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
  <strong>`properties`</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                        |
| ------------- | -------- | ------- | -------------------------------------------------- |
| `name`        | String   | `null`  | The property name                                  |
| `description` | String   | `null`  | Short description which describes the tag property |
| `type`        | String   | `null`  | Contents of the tag contains another language      |
| `properties`  | Object[] | `null`  | Attribute-like appendments to singular tags        |

</p>
</details>

<details>
<summary>
  <strong>`params`</strong>
</summary>
<p>

| Name          | Kind   | Default | Description                                     |
| ------------- | ------ | ------- | ----------------------------------------------- |
| `name`        | String | `null`  | The property name                               |
| `description` | String | `null`  | Short description which describes the parameter |
| `snippet`     | String | `null`  | The snippet value applied after colon           |

</p>
</details>

<details>
<summary>
  <strong>`attributes`</strong>
</summary>
<p>

| Name          | Kind     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `name`        | `string` | `null`  | The property name                               |
| `description` | `string` | `null`  | Short description which describes the attribute |

</p>
</details>
