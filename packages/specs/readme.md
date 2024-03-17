# @liquify/specs

This package is available on the npm registry for modules consumed by the [Liquify](https://liquify.dev) parser and text editor extension/plugin but it also exists as point of reference for different Liquid variations and can be appropriated into projects outside of Liquify. At its core, the module provides lexical, parse and feature capabilities for the Liquify [Liquid Language Server](https://github.com/panoply/liquify/tree/next/packages/server) and [Liquid Language Parser](https://github.com/panoply/liquify/tree/next/packages/parser).

### What?

In the context of the Liquid Language Server, these _specifications_ are just data references that describe Liquid and HTML syntax. These are not quite parsing grammars and despite the name, they are not official specifications.

### Why?

Liquid is a basic template language that is consumer facing. When building the Liquify (Liquid) parser one of my main goals was to standardize all variations of the language but such a task is impossible due to the fact Liquid is a template language and can exist in a customized formats. The resulting solution was to produce a simple, extensible and integrated solution for interfacing with the parser and language server. The result is Liquid Language Specifications.

### Supported

The modules provides raw data references for the following:

- HTML
- Liquid Standard
- Liquid Shopify
- Liquid 11ty

### TODO

The following Liquid variations are scheduled to be mapped.

- Liquid Jekyll

# Install

```
pnpm add @liquify/specs
```

# Usage

The module provides a informal Query Engine that interfaces with both HTML and Liquid specifications. The module enables the Liquify [Liquid Language Server](https://github.com/panoply/liquify/tree/next/packages/server) and [Liquid Language Parser](#) to interact, traverse and query raw data at different points. This allows for capabilities like code completions, validations (linting) and signatures to be provided. The query engine is typically used by the parser and each time a tag, object or filter is encountered during traversal operations we query its specification reference and from here the scanner (or language server) will act accordingly.

Read More about [queries](docs/06-queries.md)

### Data (`liquid` and `html5`)

We can access the specifications via 2 named exports, `html5` and `liquid`. Both exports are objects and provide us direct access to the data (ie: specifications). These data exports are merely convenience exports that expose the specifications used by the providers (`p`) and queries (`q`) exports that are at the core of traversal.

```typescript
import { html5, liquid } from '@liquify/specs';

// LIQUID HELPERS

$.liquid.extend(engine: Engine, spec: Spec): void
$.liquid.generate(data: any, spec: Spec): IObject

// LIQUID STANDARD

liquid.standard;
liquid.standard.tags;
liquid.standard.filters;

// LIQUID SHOPIFY

liquid.shopify;
liquid.shopify.tags;
liquid.shopify.filters;
liquid.shopify.objects;

// LIQUID ELEVENTY

liquid.eleventy;
liquid.eleventy.tags;
liquid.eleventy.filters;
liquid.eleventy.objects;

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
import { $ } from '@liquify/specs';

// LIQUID

$.liquid.engine;            // The current variation engine, ie: standard, shopify etc
$.liquid.tag;               // The tag object specification in traversal
$.liquid.filter;            // The filter object specification in traversal
$.liquid.object;            // The object or property object specification in traversal
$.liquid.type;              // A persisted reference to a certain type, like an object type
$.liquid.argument;          // The tag or filter argument record in traversal
$.liquid.value;             // The current tag, filter or object value in traversal
$.liquid.within;            // An enum number value informing upon the within status
$.liquid.scope;             // The current scope map value used for variable awareness
$.liquid.variable;          // A string[] list value which holds reference to an assigned value
$.liquid.files;             // Map reference which maintain file specific data.

$.liquid.data.variation;    // The current variation specification
$.liquid.data.variables;    // The document variables, key is variable name, value is ScopeMap
$.liquid.data.completions;  // The LSP completion items for the specification

// HTML5

$.html5.tag;           // The tag object specification in traversal
$.html5.attribute;     // The attribute specification in traversal
$.html5.value;         // The attribute value specification in traversal
```

### Query (`q`)

The `q` query export allows us to navigate through specifications. These methods are typically used by the Liquify parser and will augment the state `$` references during lexical analysis. Almost all queries and operations update state `$` records.

```typescript
import { q } from '@liquify/specs';

// LISTS

q.getTags(engine?: Engine): string[]
q.getFilters(engine?: Engine): string[]
q.getObjects(engine?: Engine): string[]

// SETTERS

q.setEngine(engine: Engine): void
q.setTag(token: string): boolean;
q.setType(type: string): boolean;
q.setFilter(token: string): boolean;
q.setObject(token: string): boolean;
q.setVariable(token: string): boolean;

// CHECKSUMS

q.hasRequires(filters: NodeFilters): boolean;
q.hasObject(name: string): boolean;
q.hasProperty(name: string): boolean;

// VALIDATORS

q.isError(err: QueryError): boolean;
q.isObjectType(type: number): boolean;
q.isOptional(from: number): boolean;
q.isAllowed(prop: string): boolean;
q.isParameter(token: string): boolean;
q.isArgument(type: Type): boolean;
q.isProperty(token: string): boolean;
q.isRequired(): boolean;
q.isTagType(type: Type): boolean;
q.isType(type: Type): boolean;
q.isValue(token: string): boolean;
q.isVoid(token: string): boolean;
q.isWithin(token: Within): boolean;

// NAVIGATORS

q.nextArgument(): boolean;
q.nextParameter(): boolean;
q.prevArgument(): boolean;

// OTHER

q.reset(force?: boolean): void

```

### Provide (`p`)

The `p` providers named export exposes methods that facilitate capabilities in the Liquify [Liquid Language Server](https://github.com/panoply/liquify/tree/next/packages/server). These are features which provide the data used by LSP specific capabilities like code completions, signatures and linting in text editors (like vscode). Providers are different from `q` queries and specific to LSP.

> When settings a new Liquid engine via `q.setEngine()` the reference for Liquid will be updated to the variation.

<!-- prettier-ignore -->
```typescript
import { p } from '@liquify/specs';

p.ObjectDetail(type: Type)
p.ObjectGroups(template: string)

// LIQUID

p.LiquidSignatures()
p.LiquidCompletions()
p.LiquidTagResolve(item: CompletionItem): CompletionItem;
p.LiquidFilterResolve(item: CompletionItem): CompletionItem;
p.LiquidOutputResolve(item: CompletionItem): CompletionItem;
p.LiquidPropertyComplete(item: CompletionItem): CompletionItem;

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

### Integration

The module can be used in isolation and does not require you to use the Liquify Parser. Below is an example of you might leverage the specs in a custom implementation to traverse and acquire context of Liquid syntactical structures. The `demo[]` array list includes a couple of invalid syntax tokens so we can best illustrate usage.

> This is a bare-bones example, integration can be much more complex and there is far more ne can do with the query engine specifically. The intended implementation is to be conjured within a parser of some sort.

<!-- prettier-ignore -->
```ts
import { $, q, Type, Engine } from '@liquify/specs';

const demo = [
  ['if'],['page','x'],      // {% if page.x %}
  ['shop', 'name'],         // {{ shop.name }}
  ['else']                  // {% else %}
  ['endelse']               // {% endelse %}
]

q.setEngine(Engine.Shopify)  // Lets use the Shopify Variation
q.setTag(demo[0])            // We have set the tag to "if"
q.setObject(demo[1][0])      // We have set the object to "page"

console.log($.liquid.tag)    // The specification for "if"
console.log($.liquid.object) // The specification for "page"

// First, lets create a local reference of the tag to use later on.
// For the sake of brevity, we will also check it is a control type:
const tag = q.isTagTag(Type.control) ? demo[0] : undefined

// Lets now use the specification to perform some additional
// queries and see what we get back. We passed "x" property
// to object "page" which is invalid, let's check that:

if(q.hasProperty(demo[1][1])) {
  console.log('The x property exists on page'); // This will not be shown
} else {
  console.log('The x property does not exist'); // This will be shown
}

// There is no x property available to the "page" object, we can query
// further to see what properties do exist.
console.log($.liquid.object.properties)

// Lets move ahead now and check index 2 in out demo list, which is
// referencing the object "shop" and has property "name", both are valid.

q.setObject(demo[2][0])       // We have set the object to "shop"

// The object state reference is now pointing to "shop" - Lets quickly
// log the object specification reference:
console.log($.liquid.object)

// The property of "name" will be accepted, we will use another query
// method, this isProperty method will modify the object reference
if(q.isProperty(demo[2][1])) {
  console.log($.liquid.object)  // We have set the object "name" on "shop"
}

// The next tag in our demo list at index 3 is "else" which is a control
// type and can only be used within certain tags, lets proceed:

q.setTag(demo[3]);             // We have set the tag to "else"

// Lets log the specification for the "else" tag. Notice how it has singleton
// set to true, this tells us that the tag does not require an ender.
console.log($.liquid.tag)

// Lets validate the "else" tag some more and explore some of the additional
// queries that can be performed via the specification. We will use above "tag"
// constant we set to check if its correctly placed.

if(q.isParent(tag)) {
  console.log('The else tag is placed correctly')     // This will be shown
} else {
  console.log('The else tag is not placed correctly') // This will not be shown
}

// The last operation we will perform is on the "endelse" tag. This is invalid
// and we can use the specification to determine this.
if(demo[4].startsWith('end')){

  // This set tag query will return false because it is currently pointing
  // to the "else" tag. When a new tag is set, it will return true:
  if(q.setTag(demo[4].slice(3))) {
    console.log('The tag was changed')               // This will not be shown
  } else {

    // The "else" tag is marked as a singleton, this means that no ender
    // should exist. As such, we can determine that the code is invalid:
    if($.liquid.tag.singleton) {
      console.log(`The ${demo[4]} tag is invalid`)   // This will be shown
    } else {
      console.log(`The ${demo[4]} tag is valid`)     // This will not be shown
    }

  }
}

```

# Extending

Specifications can be extended to support custom data structures. The data `liquid` export exposes 2 methods for this. The `liquid.extend()` and `liquid.generate()` methods are made available to add in custom specification references on demand. The `liquid.generate()` method is designed for Object specifications whereas the `liquid.extend()` method is designed for augmenting and adding to an existing variation. Depending on the integration required, extending can be done as follows.

### Generate

When dealing with custom data structures, where we require `object` based references, we can pass in any type of JSON data to the generate method and it will return a valid specification we can use.

```ts
import { liquid } from '@liquify/specs';

// A random data structure which we want to use to generate
// object specification and use in completions.

const example = {
  foo: 'Hello World',
  bar: { prop: 'XXX', array: [1,2, { qux: 'Random' }] },
  baz: [
    { title: 'Lorem Ipsum', number: 100, condition: true }
  ]
}

// We use the generate method to take the above structure and return
// a valid specific from which we can extend the variation with.

const objects = liquid.generate<Objects>(example);

```

### Extend

The `extend` method can be used to augment an existing Liquid variation. The function will merge the passed in specification with the defined engine reference. The method applies a patched merge, but you may prefer to complete overwrite, which is made available by pass boolean `false` are the last argument. The extend method will be digested and used in future parse operations and is how one can control the behavior of LSP capabilities.

```ts
import { Engine, liquid } from '@liquify/specs';

// Lets use the above specification we generated and extend
// the objects model of the Eleventy Liquid specification

const generate = liquid.extend(Engine.Eleventy, { objects });

```

# Documentation

In the context of the Liquid Language Server, these _specifications_ are just data references that describe Liquid and HTML syntax. They are not quite parsing grammars and despite the name, they are not official specifications. The specs exist to enable developers of any level to quickly compose schemas that extend upon Liquid [standard](https://shopify.github.io/liquid/) and described tags, filters and objects in different variations.

1. [Tokens](docs/01-tokens.md)
2. [Types](docs/02-types.md)
3. [Arguments](docs/03-arguments.md)

# References

The specification are either hard-coded and entered manually or will pull in a reference. The idea of specifications is to have a single source of truth for all variations, sort of like Definitely Typed.

### HTML5

The HTML specifications leverage the [@vscode/web-custom-data](https://github.com/microsoft/vscode-custom-data) module. The resulting data is crawled and extracted from MDN.

### Liquid Standard

The Standard specification are mostly hard-coded and partially use data pulled in from the Shopify [theme-liquid-docs](https://github.com/Shopify/theme-liquid-docs). Because the Standard variation can be implemented in an isolated manner into projects, adjustments are made for extended usages.

### Liquid Shopify

The Shopify specifications pull in data from the [theme-liquid-docs](https://github.com/Shopify/theme-liquid-docs). If you find inconsistencies with descriptions or issues relating to this then it is Shopify's burden to bare.

### Liquid 11ty

The Eleventy specification provides 11ty supplied references and the data cascade of projects can use the specification to extend and generate specs. The Eleventy specification is mostly a generated spec as per-project handling is incurred.

### Liquid Jekyll

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

<small>[Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" alt="X (formerly Twitter)" src="https://img.shields.io/twitter/follow/niksavvidis">
