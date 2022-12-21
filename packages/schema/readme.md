# @liquify/schema

This module contains [JSON Schema Stores](https://json-schema.org/) which are used by the [Liquify](https://liquify.dev) IDE extension. This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) text editor.

**The schema stores developed for the Shopify Liquid variation require that you ask permission before using. Unless you have consent, you cannot implement the structures into your projects without first consulting the project maintainer.**

### Why?

Liquify supports completions and validations for JSON files and embedded regions. Projects using the Liquify IDE tool require these stores to provide intellisense features.

# Usage

If you are using the Liquify extension ([vscode-liquid](https://github.com/panoply/vscode-liquid)) these stores will be provided automatically. In cases where you require reference to the stores explicitly, then you can implement them using the [unpkg](https://unpkg.com/) CDN.

When referencing a schema, it is assumed that your text editor supports JSON `$schema` properties.

```json
{
  "$schema": "https://unpkg.com/@liquify/schema/{store}"
}
```

> Replace the `{store}` portion with the appropriate Schema Store [below](#schema-stores).

# Stores

Below the available schema stores provided in this module.

### [Liquidrc](https://unpkg.com/@liquify/schema/liquidrc.json)

`https://unpkg.com/@liquify/schema/liquidrc.json`

JSON Schema used for providing intellisense features in `.liquidrc`, `.liquidrc.json` files. The stores are also used in vscode workspace settings via the `liquid.*` property.

### [Prettify](https://unpkg.com/@liquify/schema/prettify.json)

`https://unpkg.com/@liquify/schema/prettify.json`

JSON Schema used for providing intellisense features for `.prettifyrc` files but also on the `format` property in the `.liquidrc` file. The stores are also used for on the package.json `prettify` field and vscode workspace settings via the `liquid.format.*` property.

### [Shopify Templates](https://unpkg.com/@liquify/schema/shopify/templates.json)

`https://unpkg.com/@liquify/schema/shopify/settings_schema.json`

JSON Schema used for providing intellisense features for Shopify OS 2.0 template files. The stores are for Shopify theme environments.

### [Shopify Sections](https://unpkg.com/@liquify/schema/shopify/sections.json)

`https://unpkg.com/@liquify/schema/shopify/sections.json`

JSON Schema used for providing intellisense features within the Liquify [Liquid Language Server](#) package. The stores are passed to `{% schema %}` embedded regions of the Shopify Liquid variation.

### [Shopify Settings Schema](https://unpkg.com/@liquify/schema/shopify/settings_schema.json)

`https://unpkg.com/@liquify/schema/shopify/settings_schema.json`

JSON Schema used for providing intellisense features within `settings_schema.json` files. The stores are for Shopify theme environments.

### [Shopify Settings Data](https://unpkg.com/@liquify/schema/shopify/settings_data.json)

`https://unpkg.com/@liquify/schema/shopify/settings_data.json`

JSON Schema used for providing intellisense features within `settings_data.json` files. The stores are for Shopify theme environments.

### [VSCode Configuration](https://unpkg.com/@liquify/schema/vscode/configuration.json)

`https://unpkg.com/@liquify/schema/vscode/configuration.json`

JSON Schema used for providing intellisense features within vscode workspace and user settings. The stores are injected into the [vscode-liquid](https://github.com/panoply/vscode-liquid) extension `configuration` field of the containing package.json file.

# Contributing

The stores are written using [Draft 7](http://json-schema.org/draft-07/schema) of the JSON Schema specification. The `markdownDescription` field links to Markdown files contained in the [stores/descriptions](#) directory. Descriptions and generated and injected when running `pnpm build` and are rendered in hover and completion descriptions.

### Publishing

The distributed package is published to the NPM Registry in an isolated manner. See the package.json scripts runners for `prepublishOnly` and `prepublish` for a contextual understanding of this.

### Testing

The [test](#) directory links to **generated** stores in the `package` directory. The containing [test/live](#) directory is where stores are tested against CDN linked variations.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
