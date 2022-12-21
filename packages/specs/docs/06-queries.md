# Queries

The Query methods are used to walk and traverse the data specifications. The information on this page intends to describe what each query method does and what occurs when it is triggered.

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
