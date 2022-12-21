<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/liquid-language-specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin but it also exists as point of reference for different Liquid variations and can be appropriated into projects outside of Liquify. At its core, the module provides lexical, parse and feature capabilities for the Liquify [Liquid Language Server](#) and [Liquid Language Parser](#).

_This module extends upon the "Custom Data" approaches first introduced by the VSCode team, specifically that used in [HTML language Service](https://github.com/microsoft/vscode-html-languageservice)._

### What?

In the context of the Liquid Language Server, these _specifications_ are just data references that describe Liquid and HTML syntax. These are not quite parsing grammars and despite the name, they are not official specifications.

### Why?

Liquid is a basic template language that is consumer facing. When building the Liquify (Liquid) parser one of my main goals was to standardize all variations of the language but such a task is impossible due to the fact Liquid is a template language and can exist in a customized formats I required a simple, extensible and integrated solution for interfacing with the parser and language server. The result is Liquid Language Specifications.

### Supported

The modules provides raw data references for the following Liquid variations. The specifications also provide HTML specifications which are made available using the [vscode-custom-data](https://github.com/microsoft/vscode-custom-data#readme) package.

- HTML
- Liquid Standard
- Liquid Shopify

# Install

```
pnpm add @liquify/liquid-language-specs
```

# Usage

The module provides a informal Query Engine to interfaces with both HTML and Liquid specifications. The module enables the Liquify [Liquid Language Server](#) and [Liquid Language Parser](#) to interact, traverse and query raw data at different points. This allows for capabilities like code completions, validations (linting) and signatures to be provided. The query engine is typically used by the parser and each time a tag, object or filter is encountered when walking a document we query its specification reference and from here the scanner (or language server) can act accordingly.

Read More about [queries](docs/06-queries.md)

### Data (`liquid` and `html5`)

We can access the specifications via 2 named exports, `html5` and `liquid`. Both exports are objects and provide us direct access to the data (ie: specifications). These data exports are merely convenience exports that expose the specifications used by the providers (`p`) and queries (`q`) exports which are at the core of traversal operations.

```typescript
import { html5, liquid } from '@liquify/liquid-language-specs';

// LIQUID STANDARD

liquid.standard;
liquid.standard.tags;
liquid.standard.filters;

// LIQUID SHOPIFY

liquid.shopify;
liquid.shopify.tags;
liquid.shopify.filters;
liquid.shopify.objects;

// LIQUID JEKYLL

liquid.jekyll;
liquid.jekyll.tags;
liquid.jekyll.filters;
liquid.jekyll.objects;

// HTML5

html5.tags;
html5.attributes;
html5.values;
```

### State (`$`)

The `$` state named export holds in-stream data reference to the specification values in traversal. The references will change and update in accordance with query operations carried out via `q` queries. The states are **Read Only** getters and their records will be reset to `undefined` or `NaN` each time parsing begins on new tokens (tags, objects or filters).

> You cannot augment state references, they are readonly.

<!-- prettier-ignore -->
```typescript
import { $ } from '@liquify/liquid-language-specs';

// LIQUID

$.liquid.engine;        // The current variation engine, ie: standard, shopify etc
$.liquid.tag;           // The tag object specification in traversal
$.liquid.filter;        // The filter object specification in traversal
$.liquid.object;        // The object or property object specification in traversal
$.liquid.argument;      // The tag or filter argument record in traversal
$.liquid.value;         // The current tag, filter or object value in traversal
$.liquid.separator;     // The current separator character code (if any)
$.liquid.within;        // An enum number value informing upon the within status
$.liquid.variable;      // A string[] list value which holds reference to an assigned value

// HTML5

$.html5.tag;           // The tag object specification in traversal
$.html5.attribute;     // The attribute specification in traversal
$.html5.value;         // The attribute value specification in traversal
```

### Query (`q`)

The `q` query export allows us to navigate through specifications. These methods are typically used within the Liquify parser and will augment the state `$` references during traversal and lexical analysis. Almost all queries and operations update state `$` records.

```typescript
import { q } from '@liquify/liquid-language-specs';

// LISTS

q.getTags(engine?: Engine): string[]
q.getFilters(engine?: Engine): string[]
q.getObjects(engine?: Engine): string[]

// SETTERS

q.setEngine(engine: IEngine): void
q.setTag(token: string): boolean
q.setFilter(token: string): boolean
q.setObject(token: string): boolean
q.setVariable(token: string): boolean

// VALIDATORS

q.isError(err: QueryError): boolean
q.isObjectType(type: number): boolean
q.isOptional(from: number): boolean
q.isAllowed(prop: string): boolean
q.isParameter(token: string): boolean
q.isArgument(type: Type): boolean
q.isProperty(token: string): boolean
q.isRequired(): boolean
q.isTagType(type: Type): boolean
q.isType(type: Type): boolean
q.isValue(token: string): boolean
q.isVoid(token: string): boolean
q.isWithin(token: Within): boolean

// NAVIGATORS

q.nextArgument(): boolean
q.nextParameter(): boolean
q.prevArgument(): boolean

// OTHER

q.reset(): void

```

### Provide (`p`)

The `p` providers named export exposes methods that facilitate capabilities in the Liquify [Liquid Language Server](#). These are feature which provide the data used in LSP specific capabilities like code completions, signatures and linting within text editors (like vscode). Providers are different from `q` queries and specific to LSP and text editor extensions/plugins.

> When settings a new Liquid engine via `q.setEngine()` the reference for Liquid will be updated to the variation.

<!-- prettier-ignore -->
```typescript
import { p } from '@liquify/liquid-language-specs';

// LIQUID

p.LiquidSignatures()
p.LiquidCompletions()
p.LiquidTagResolve(item: CompletionItem): CompletionItem
p.LiquidFilterResolve(item: CompletionItem): CompletionItem
p.LiquidOutputResolve(item: CompletionItem): CompletionItem
p.LiquidPropertyComplete(item: CompletionItem): CompletionItem

// HTML

p.HTMLSignatures()
p.HTMLCompletions()
p.HTMLTagAttrs(attrs: HTMLTagAttrs): CompletionItem
p.HTMLTagResolve(item: CompletionItem): CompletionItem
p.HTMLAttrsComplete(tag: string): CompletionItem
p.HTMLAttrsResolve(item: CompletionItem): CompletionItem
p.HTMLValueComplete(value?: string): CompletionItem
p.HTMLValueResolve(item: CompletionItem): CompletionItem

```

# Documentation

In the context of the Liquid Language Server, these _specifications_ are just data references that describe Liquid and HTML syntax. These are not quite parsing grammars and despite the name, they are not official specifications. The specs exist to enable developers of any level to quickly compose schemas that extend upon Liquid [standard](https://shopify.github.io/liquid/) and described tags, filters and objects in different variations.

1. [Tokens](docs/01-tokens.md)
2. [Types](docs/02-types.md)
3. [Arguments](docs/03-arguments.md)

### Unsupported

The specifications map Liquid objects in a hardcoded manner. When a Liquid variation provides objects on the consumer facing end (like those in the Shopify variation) the objects are provided to Liquify via manual data entry. This is both a very tedious and time consuming task.

There is no API endpoint to provided such data required to compose the specs in an automated manner and due to the inconsistencies, the constant changing UI and general unpredictability in documentation that informs upon objects, specifically that of Shopify, we are unable crawl and compose this data required in an automated manner and thus, support is made possible through manual entry.

Below is a list of objects awaiting triage/input:

#### Shopify Variation

- `filter_value`
- `generic_file`
- `measurement`
- `metafields`

#### Jekyll Variation

_Not yet supported_

# Contributing

Contributions are welcome. If you stumble upon inconsistencies or inaccurate data note that all files used by Liquify [Parser](#) and the [Liquid Language Server](#) exist the within `/data` directories. Contributing requires forking from the root of this project as Liquify is built atop of a monorepo workspace.

Consult the root [readme](#) for more information:

- Ensure [pnpm](https://pnpm.js.org/) is installed globally `npm i pnpm -g`
- Clone this repository `git clone https://github.com/panoply/liquify.git`
- Run `pnpm i`
- Run `pnpm build`
- CD into `packages/specs`
- Run `pnpm dev`

<br>

## Authors / Maintainers

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@kaossissel-1DA1F2?logo=twitter&logoColor=fff" />
<br>
🍔 <small>[Joseph Curtis](#)</small> <img align="right" src="https://img.shields.io/badge/-@jCurt-1DA1F2?logo=twitter&logoColor=fff" />
