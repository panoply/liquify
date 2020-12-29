
export type Options = {
  engine: 'standard' | 'shopify' | 'jekyll' | '11ty',
  context: boolean | false,
  frontmatter: boolean | false,
  whitespace: boolean | false,
  range: boolean | true,
  offsets: boolean | true,
  process_unknown: boolean | true,
  parse_html: boolean | true,
  skip_strings: boolean | false,
  html_comments: boolean | false,
  multiline_comments: boolean | true,
  inline_comments: boolean | true,
  track_variables: boolean | true,
  error_tolerance: 1 | 2 | 3 | 4,
  exclude: string[]
}
