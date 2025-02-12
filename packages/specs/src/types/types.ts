import { LiteralUnion } from './utils';

export declare namespace Types {

  export type Basic = LiteralUnion<(
    | 'any'
    | 'object'
    | 'number'
    | 'boolean'
    | 'string'
    | 'array'
    | 'constant'
  )>

  export type Argument = LiteralUnion<(
    | 'parameter'
    | 'keyword'
    | 'attribute'
  )>

  export type Tag = LiteralUnion<(
    | 'control'
    | 'comment'
    | 'embedded'
    | 'generator'
    | 'import'
    | 'iteration'
    | 'link'
    | 'output'
    | 'variable'
    | 'raw'
    | 'unknown'
  )>

  export type Separators = (
    | ','
    | '\n'
    | '='
  )
}
