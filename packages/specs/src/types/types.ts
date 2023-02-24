export declare namespace Types {

  export type Basic = (
    | 'any'
    | 'object'
    | 'number'
    | 'boolean'
    | 'string'
    | 'array'
    | 'constant'
  )

  export type Argument = (
    | 'parameter'
    | 'keyword'
    | 'attribute'
  )

  export type Tag = (
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
  )

  export type Separators = (
    | ','
    | '\n'
    | '='
  )
}
