# @liquify/types

Type Declarations for [Liquify](https://liquify.dev). This package is used for consumption in different projects across the Liquify monorepo workspace. The module prevents cyclic dependency inclusions.

### Install

```bash
pnpm add @liquify/types  -D
```

# Usage

Declarations are exposed by package import path reference:

<!-- prettier-ignore -->
```ts
import { LiquidParser } from '@liquify/types/parser';
import { TokenType } from '@liquify/types/parser/lexical';
import { Rules } from '@liquify/types/esthetic';
// etc etc
```

You can also access all types from via namespace on the default:

<!-- prettier-ignore -->
```ts
import { Esthetic, Parser, Moloko, Highlight, Specs } from '@liquify/types';
// etc etc
```
