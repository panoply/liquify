## @liquify/schema-stores

This module contains [JSON Schema Stores](https://json-schema.org/) which are used by the [Liquify](https://liquify.dev) IDE extension/package tool. This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) text editor extension/plugin.

### Why?

Liquify supports completions and validations for JSON files and embedded regions. Projects using the Liquify IDE tool require these stores to provide intellisense features.

## Install

```cli
<pnpm|npm|yarn> i @liquify/schema-stores
```

## Usage

This is a node module, it is not supported in browsers. You can access the schemas via the default export if you need it. However, the CDN endpoints suffice, use those unless you are are working on the project.

```js
import stores from "@liquify/schema-stores";

const store = stores("filename"): Promise; // without the .json extension
```

## CDN

Each store can referenced via CDN in JSON files.

| Store                 | CDN                                                |
| --------------------- | -------------------------------------------------- |
| Liquidrc              | `https://schema.liquify.dev/liquidrc.json`         |
| Liquid Specifications | `https://schema.liquify.dev/specifications.json`   |
| Shopify Sections      | `https://schema.liquify.dev/shopify/sections.json` |
| Shopify Locales       | `https://schema.liquify.dev/shopify/locales.json`  |
| Shopify Settings      | `https://schema.liquify.dev/shopify/settings.json` |
| Jekyll Config         | `https://schema.liquify.dev/shopify/jekyll.json`   |

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
