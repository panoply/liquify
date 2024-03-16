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

export type Parameters = {
  description?: string
  required?: boolean
  name?: string
  types?: string[]
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

  export type Filters = {
    /**
     * Denotes the scope in which this filter can be exposed.
     */
    category?: string
    /**
     * Whether or not the filter is deprecated
     */
    deprecated?: boolean
    /**
     * The reason for deprecation
     */
    deprecation_reason?: string
    /**
     * A description of the filter
     */
    description?: string
    /**
     * A dshort summary or the filter
     */
    summary?: string
    /**
     * An implied syntax structure fo the filter
     */
    syntax?: string
    /**
     * The filters name identifier
     */
    name?: string
    /**
     * A list of filter parameters (if any)
     */
    parameters?: Parameters;
    /**
     * Code examples which depict sample usage.
     */
    examples?: Examples;
    /**
     * The returning type applied by the filter.
     */
    return_type?: ReturnType;

    [k: string]: unknown

  }[]
}
