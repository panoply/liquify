<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/language-specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin.

**Liquify is partially proprietary closed source software. The distributed code provided in this package is enigmatic and has been encrypted using an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm**

### Reasoning

Due to the versatile nature of Liquid and in order to provide LSP capabilities to the Liquid Language Server the tool adopts and extends upon the approach introduced by the VS Code team, specifically that of the HTML language Service.

### Why?

The [liquify](#) parser treats HTML and Liquid as a single language. Providing LSP capabilities to both languages was extraneous considering Liquid (generally) extends markup. The Liquify parser separates both Liquid and HTML in an non-conflicting manner and thus allows for HTML to be validated against in a similar manner as Liquid.

# Usage

This module provides a query engine to interfaces with the HTML and Liquid specifications. The module enables the Liquify parser and the Liquid Language Server to both interact and traverse the data files via exposed export methods.

### Install

The module is available on the public NPM registry:

```
pnpm i @liquify/specs
```

### Query Engine

The query engine is used by the parser. Each time a tag is encountered we assign the current token (tag) in stream to the `cursor` letting.

```typescript

// States
spec.engine;
spec.cursor;
spec.object;
spec.argument;

// Getters
spec.getVariation(): Variation

// Setters
spec.setEngine(String): void;
spec.setObject(String): Boolean;
spec.setFilter(String): Boolean;
spec.setTag(String): Boolean;
spec.setTemplate(String): void;

// Navigators
spec.nextArgument(): Boolean;
spec.prevArgument(): Boolean;

// Validators
spec.isProperty(String): Boolean;
spec.isParameter(String): Boolean;
spec.isValue(String): Boolean;
spec.isType(Number): Boolean;
spec.isObjectType(Number):Boolean
spec.isTagType(Number):Boolean
spec.isTemplate(String): Boolean;

// Completions
spec.provideTags();
spec.provideObjects();
spec.provideFilters();
spec.provideArguments();
spec.provideParameters();
spec.provideAttributes();
```

# Documentation

In the context of the Liquid Language Server, variation specifications are just data references that describe Liquid syntax. They are not quite grammars but close enough and exists to enable developers of any level to quickly compose contextual grammars and formal schema which can described tags, filters and objects used in different variation. A template language like Liquid exists in a multitude of variations that extend upon its default [standard](https://shopify.github.io/liquid/) variation and the specs provided here allow us to establish formal specs for the language.

1. [Tokens](docs/01-tokens.md)
2. [Types](docs/02-types.md)
3. [Arguments](docs/03-arguments.md)

### Objects

The specifications map Liquid objects in a hardcoded manner. This means that when a Liquid variation provides objects on the consumer facing end (like in the Shopify variation) the objects are provided to Liquify via manual data entry, which is both a very tedious and time consuming task. There is no API endpoint that provided such data that is required for the specs and due to the inconsistencies and constant changing UI of documentation in variations like Shopify we are unable to successfully crawl and compose the data required in an automated manner.

Below is a list of objects awaiting triage/input:

#### Shopify Variation

- `filter_value`
- `generic_file`
- `measurement`
- `metafields`
- `selling_plan_allocation`
- `selling_plan_group`

<br>

## Authors / Maintainers

🥛 <small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@kaossissel-1DA1F2?logo=twitter&logoColor=fff" />
<br>
🍔 <small>[Joseph Curtis](#)</small> <img align="right" src="https://img.shields.io/badge/-@jCurt-1DA1F2?logo=twitter&logoColor=fff" />
