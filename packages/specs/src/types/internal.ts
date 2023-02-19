export interface Access {
  global?: boolean
  parents?: {
    object?: string
    property?: string
    [k: string]: unknown
  }[]
  template?: string[]
  [k: string]: unknown
}

export interface JsonData {
  path?: string
  handle?: string
  data_from_file?: string
  [k: string]: unknown
}

export type Examples = {
  name?: string
  description?: string
  syntax?: string
  path?: string
  raw_liquid?: string
  parameter?: boolean
  display_type?: string
  show_data_tab?: boolean
  [k: string]: unknown
}[]

export type ReturnType = {
  type?: string
  name?: string
  description?: string
  array_value?: string
  [k: string]: unknown
}[]

export type Properties = {
  deprecated?: boolean
  deprecation_reason?: string
  description?: string
  summary?: string
  name?: string
  examples?: Examples
  return_type?: ReturnType
  [k: string]: unknown
}[]

export namespace ThemeDocs {

  export type Objects = {
    access?: Access
    deprecated?: boolean
    deprecation_reason?: string
    description?: string
    summary?: string
    name?: string
    properties?: Properties
    examples?: Examples
    json_data?: JsonData
    return_type?: ReturnType
    [k: string]: unknown
  }[]

}
