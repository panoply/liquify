<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin. The language specs provide capabilities to the Liquid Language Server and in addition the Liquify [Language Parser](#). This module extends upon the approach first introduced by the VS Code team, specifically that used in [HTML language Service](https://github.com/microsoft/vscode-html-languageservice).

**Liquify is partially proprietary closed source software. The distributed code provided in this package is enigmatic and has been encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm**

### Why?

The [Liquify](https://liquify.dev) parser treats HTML and Liquid as a single language. Providing language features for both HTML and Liquid is facilitated using this query engine module, in addition allows for users to extends and/or create custom variations and tags.

# Usage

The module provides a query engine to interfaces with the HTML and Liquid specifications. The module enables the Liquify parser and the Liquid Language Server to both interact and traverse the data files at different points and provide capabilities like code completions efficiently.

### Install

The module is available on the public NPM registry:

```
pnpm i @liquify/specs
```

### Query Engine

The query engine is used by the parser. Each time a tag, object or filter is encountered we query its specification so the scanner or language server can act accordingly. The module exports variables which hold constantly changing state values.

Read More about [queries](docs/06-queries.md)

##### Data

We can access the specifications via 2 exports, `html5` and `liquid` these both provide us direct access to the data objects. These are raw access references. Exports like `complete` provide us LSP completions.

```typescript
import { html5, liquid } from "@liquify/specs";

// LIQUID DATA

liquid.engine;
liquid.completions;
liquid.jekyll;
liquid.shopify;
liquid.standard;

// HTML DATA

html5.tags;
html5.attributes;
html5.values;
```

##### State

The `state` export gives us a access to in-stream specification values.

```typescript
import { state as $ } from "@liquify/liquid-language-specs";

// LIQUID STATES

$.liquid.argument;
$.liquid.filter;
$.liquid.object;
$.liquid.tag;
$.liquid.value;

// HTML STATES

$.html5.tag;
$.html5.attribute;
$.html5.value;
```

##### Queries

The `query` export allows us to validate and navigate a through a spec record. These methods are used mostly within the Liquify parser.

```typescript

import { query as q } from '@liquify/liquid-language-specs';


// GETTERS

q.getLiquidCompletions(): { tags: [], filters: [], objects: [] }
q.getHTMLCompletions(): { tags: [], attributes: [] }
q.getArgument(type: Type): boolean

// SETTERS

q.setEngine(engine: IEngine): void
q.setFilter(token: string): boolean
q.setObject(token: string): boolean
q.setTag(token: string): boolean

// VALIDATORS

q.isError(err: QueryError): boolean
q.isObjectType(type: number): boolean
q.isOptional(from: number): boolean
q.isAllowed(prop: string): boolean
q.isParameter(token: string): boolean
q.isProperty(token: string): boolean
q.isRequired(): boolean
q.isTagType(type: Type): boolean
q.isType(type: Type): boolean
q.isValue(token: string): boolean
q.isVoid(token: string): boolean
q.isWithin(token: Within): boolean

// HTML COMPLETIONS (LSP RELATED)

q.HTMLCompletions()
q.HTMLAttrsComplete()
q.HTMLAttrsResolve()
q.HTMLTagComplete()
q.HTMLTagResolve()
q.HTMLValueComplete()
q.HTMLValueComplete()
q.HTMLValueResolve()


// NAVIGATORS

q.nextArgument(): boolean
q.nextParameter(): boolean
q.prevArgument(): boolean

// OTHER

q.reset(): void

```

# Documentation

In the context of the Liquid Language Server, these _specifications_ are just data references that describe Liquid and HTML syntax. These are not quite parsing grammars and despite the name, they are no official specifications. The specs exist to enable developers of any level to quickly compose schemas that extend upon Liquid [standard](https://shopify.github.io/liquid/) and described tags, filters and objects in different variations.

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
- `selling_plan_allocation`
- `selling_plan_group`

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
