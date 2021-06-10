/* FILTER ACCEPT TYPES ------------------------ */

export type FilterAcceptsTypes =
  | "string"
  | "integer"
  | "float"
  | "boolean"
  | "reference"
  | "path";

/* FILTER ARGUMENT TYPES ---------------------- */

export type FilterArgumentTypes = "argument" | "parameter" | "spread";

interface FilterArgumentOptions {
  /**
   * Name of the parameter this tag accepts
   */
  readonly name: string | string[];
  /**
   * Description of this paramter
   */
  readonly description?: string;
}

/* FILTER ARGUMENTS --------------------------- */

interface FilterArguments {
  /**
   * Name of the parameter this tag accepts
   */
  readonly type: FilterArgumentTypes;

  /**
   * Argument is required for the filter
   *
   * @default false
   */
  readonly required?: boolean;

  /**
   * Whether or not options should be validated
   *
   * @default false
   */
  readonly validate?: boolean;

  /**
   * Argument is required for the filter
   *
   * @default false
   */
  readonly accepts?: FilterAcceptsTypes;

  /**
   * Name of the argument this tag accepts
   */
  readonly name?: string;

  /**
   * Description of this parameter
   *
   * @default undefined
   */
  readonly description?: string;

  /**
   * Argument options list
   *
   * @default undefined
   */
  readonly options?: FilterArgumentOptions[];
}

export type IFilter = {
  /**
   * Description of the filter
   *
   * @default undefined
   */
  readonly description?: string;
  /**
   * URL reference to online documentation explaining this filter
   *
   * @default undefined
   */
  readonly link?: string;

  /**
   * Is the filter tag deprecated?
   *
   * @default false
   */
  readonly deprecated?: boolean;

  /**
   * Supply a snippet to be used in completions
   *
   * @default undefined
   */
  readonly snippet?: string;

  /**
   * When the filter is available within specific object and/or tag
   *
   * @default undefined
   */
  readonly within?: string[];
  /**
   * Filter argument parameters can differ greatly depending on how they are
   * implemented. The spec understands the below filter structures:
   *
   * @example
   *
   * {{ tag | filter: 'hello', param: 'world' }} // comma seperated params
   * {{ tag | filter: 'arg1', 'arg2', }} // comma seperated string
   * {{ tag | filter: argument: 'foo' }} // injected argument params
   *
   * @default undefined
   */
  readonly arguments?: FilterArguments[];

  /**
   * The filters scope
   *
   * @default undefined
   */
  readonly scope?: string[];

  /**
   * Information field which holds some additional information
   * about the filter spec. This is auto-generated within cryptospec.
   *
   * @default false
   */
  readonly $i?: {
    /**
     * The argument length size (minus 1), eg: `filter.arguments.length - 1`
     * It's a helper function when scanning arguments.
     */
    argsize?: number;
  };
};

/* REFERENCE ---------------------------------- */

export interface Filters {
  [name: string]: IFilter;
}
