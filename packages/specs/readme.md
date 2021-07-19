<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/language-specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin. The language specs provide capabilities to the Liquid Language Server and in addition the Liquify [Language Parser](#). That module extends upon the approach first introduced by the VS Code team, specifically that used by HTML language Service.

**Liquify is partially proprietary closed source software. The distributed code provided in this package is enigmatic and has been encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm**

### Why?

The [Liquify](#) parser treats HTML and Liquid as a single language. Providing LSP capabilities to both languages was extraneous when leaning upon the [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice) as a Liquid documents were being parsed by twice resulting in performance bottlenecks. The Liquify parser separates both Liquid and HTML in an non-conflicting manner and thus allows for HTML to be validated against in a similar manner as Liquid. Providing language features to both was far better facilitated using this single query engine module.

# Usage

The module provides a query engine to interfaces with the HTML and Liquid specifications. The module enables the Liquify parser and the Liquid Language Server to both interact and traverse the data files at different points and provide capabilities like code completions efficiently.

### Install

The module is available on the public NPM registry:

```
pnpm i @liquify/language-specs
```

### Query Engine

The query engine is used by the parser. Each time a tag, object or filter is encountered we query its specification and the scanner can act accordingly. The module has a single names export `spec` from which all methods can be accessed.

```typescript

import { state as $, query as q, html5, liquid } from '@liquify/liquid-language-specs';

// LIQUID STATES

$.liquid.argument
$.liquid.filter
$.liquid.object
$.liquid.tag
$.liquid.value

// LIQUID DATA

liquid.complete
liquid.engine
liquid.jekyll
liquid.shopify
liquid.standard

// HTML STATES

$.html.tag
$.html.attribute
$.html.value

// HTML DATA

html5.tags
html5.attributes
html5.values
html5.complete

// STATES

spec.engine;
spec.tag;
spec.filter;
spec.object;
spec.argument;

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
q.isParameter(token: string): boolean
q.isProperty(token: string): boolean
q.isRequired(): boolean
q.isTagType(type: Type): boolean
q.isType(type: Type): boolean
q.isValue(token: string): boolean
q.isVoid(token: string): boolean
q.isWithin(token: Within): boolean

// PROVIDERS

q.provideAttrs(): attributes[]
q.provideTags(): tags[]
q.provideValues(): values[]

// RESOLVERS

q.resolveAttribute(item: CompletionItem): CompletionItem
q.resolveTag(item: CompletionItem): CompletionItem
q.resolveValue(item: CompletionItem): CompletionItem

// NAVIGATORS

q.nextArgument(): boolean
q.nextParameter(): boolean
q.prevArgument(): boolean

// OTHER

q.reset(): void

```

# Documentation

In the context of the Liquid Language Server, variation specifications are just data references that describe Liquid syntax, not quite grammars but close enough. The specs exist to enable developers of any level to quickly compose contextual grammar and formal schemas that described tags, filters and objects used in a multitude of variations which extend upon the default [standard](https://shopify.github.io/liquid/) variation.

1. [Tokens](docs/01-tokens.md)
2. [Types](docs/02-types.md)
3. [Arguments](docs/03-arguments.md)

### Objects

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

Contributions are welcome. If you stumble upon inconsistencies or inaccurate data, all files using by Liquify [Parser](#) and [Language Server](#) exist the within `/data` directories. Because Liquify is developed in a monorepo architecture, contributing requires forking from the root.

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
