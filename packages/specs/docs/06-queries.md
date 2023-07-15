# Query (`q`)

The `q` query export allows us to navigate through specifications. These methods are typically used by the Liquify [Liquid Parser](https://github.com/panoply/liquify/tree/dev/packages/parser) and and [Liquid Language Server](https://github.com/panoply/liquify/tree/dev/packages/server). Query methods will augment the state `$` references during lexical analysis and keep specification references available at the edge.

# Lists

List methods are basic sugar around the `Object.keys()` and will return the entries of each specification reference as an array list.

- [getTags](#gettags)
- [getFilters](#getfilters)
- [getObjects](#getobjects)

## getTags

Returns a string list of Liquid tag names. Optionally accepts an `engine` parameter and when provided will return the engine specification tag names. When no engine is provided, the current defined specification tags are returned.

```ts
q.getTags(engine?: Engine): string[]
```

## getFilters

Returns a string list of Liquid filter names. Optionally accepts an `engine` parameter and when provided will return the engine specification tag names. When no engine is provided, the current defined specification filters are returned.

```ts
q.getFilters(engine?: Engine): string[]
```

## getObjects

Returns a string list of Liquid object names. Optionally accepts an `engine` parameter and when provided will return the engine specification tag names. When no engine is provided, the current defined specification objects are returned.

```ts
q.getObjects(engine?: Engine): string[]
```

# Setters

Setter methods will augment state `$` and are used to move through the specification. These methods will _typically_ execute during the [scan](https://github.com/panoply/liquify/blob/dev/packages/parser/src/parser/scanner.ts) operation after obtaining an identifier (such as a tag name) but also provide different access and write support for additional references like variables.

- [setEngine](#setengine)
- [setTag](#settag)
- [setObject](#setobject)
- [setFilter](#setfilter)
- [setVariable](#setvariable)

## setEngine

This method will set the Liquid `variation` and `engine`. It will change what specification we are referencing.

```ts
q.setEngine(engine: IEngine): void
```

## setTag

Finds a tag matching specification and updates the cursor. States are changed when a match is successful. Returns a `boolean` which signals a matched or unmatched tag.

```ts
q.setTag(token: string): boolean
```

## setObject

Finds a matching object specification. Objects can be contained in tags and filters, so the `cursor` is not modified, instead the `object` state variable is updated when a match is determined.

```ts
q.setObject(token: string): boolean
```

## setFilter

Finds a filter matching specification and updates the cursor. States are changed when a match is successful. Returns a `boolean` which signals a matched or unmatched filter.

```ts
q.setFilter(token: string): boolean
```

## setVariable

Add a variable assignment reference to the `data.variables` store. Returns the index at which the reference exists in the array list of variables. The variable store is an object who's keys represent the variable keywords and the values are an array. Each entry in the array will hold the the assigned value.

```ts
q.setVariable(token: string): boolean
```

# Checks

Check methods consist of a couple of sugar functions used to determine whether or not a specification reference exists and/or contains a value. These methods extend beyond specification checks, wherein AST Node reference

# x

```typescript
import { q } from '@liquify/specs';

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
