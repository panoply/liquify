/**
 * Service State
 */
export const enum CompletionState {
  Reset = 1,
  Whitespace,
  OutputDelimiter,
  TagDelimiter,
  FilterPipe,
  FilterColon,
  FilterArgument,
  FilterSeparator,
  ObjectProperty,
}
