/**
 * Service State
 */
export const enum ServiceState {
  Reset = 1,
  CompletionWhitespace,
  CompletionOutputDelimiter,
  CompletionTagDelimiter,
  CompletionFilterPipe,
  CompletionFilterColon,
  CompletionFilterArgument,
  CompletionFilterSeparator,
  CompletionObjectProperty,
}
