# Liquid Specifications

This directory contains the default supported Liquid variation specifications which are used to construct a workable AST and provide code completions, formatting, hovers and diagnostic validation features for the [Liquid Language Server](#).

### What are variation specifications?

In the context of the Liquid Language Server, variation specifications are just data references that describe tags and filters used in Liquid. A templating language like Liquid exists in a multitude of variations that extend upon its default [standard](#) variation. Due to Liquids versatile nature and endless implementations providing the intelliSense capabilities are only possible by supplying the server with a specification.

> Templating engines interpolate variables and process dynamic content. They're these safe user facing languages that do not adhere to any type of specification and traditionally have never really required such a thing (until now).

### Supported Variations

The Liquid Language Server supports the following Liquid variations:

- [Standard](#)
- [Shopify](#)
- [Jekyll](#)

Each variation uses a simple schema to categorize its syntax grammar which is provided to the server as an array of objects.

> By default, all new projects will use the **Standard** variation of Liquid.

### Creating Specifications

You can provide custom specifications via the `spec[]` option available in `.liquidrc` file or via workspace settings.

There are two different ways to provide specs. If you want to provide a complete variation you can do so “full”

If you have a large specification you can create a seperate JSON file and refer it's path location relative to your projects root directory.

### Understanding tag types

Given that the Liquid Language can be extended.

the specs use tag type categorization. Tag types are used by the server when parsing the document correct categorization is imperative.

| Type        | Scope      | Capture            |
| ----------- | ---------- | ------------------ |
| `comment`   | `comment`  | `{% comment %}`    |
| `control`   | `keyword`  | `{% if }`          |
| `embedded`  | `meta`     | `{% style %}`      |
| `filter`    | `support`  | `{{ | filter }}`   |
| `import`    | `meta`     | `{% include %}`    |
| `iteration` | `keyword`  | `{% for %}`        |
| `object`    | `storage`  | `{{ object.key }}` |
| `output`    | `meta`     | `{% form %}`       |
| `raw`       | `raw`      | `{% raw %}`        |
| `variable`  | `variable` | `{% capture %}`    |

# Contributing

You can contribute Liquid specifications by adding its variation in the [specs/variations](#) directory. The spec must use a snake_case naming convention and adhere to the variation [contribution schema](#).
