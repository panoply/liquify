/**
 * Parser Options
 *
 * Parse configuration options used when constructing the AST.
 * Options defined here effect how the parser should behave, what
 * should be parsed/skipped/included etc etc.
 */
export default {
  engine: 'standard',
  secret: '',
  context: true,
  frontmatter: false,
  whitespace: true,
  range: true,
  offsets: true,
  process_unknown: true,
  parse_html: false,
  skip_strings: false,
  html_comments: false,
  multiline_comments: true,
  inline_comments: true,
  track_variables: true,
  error_tolerance: 1,
  exclude: []
}

export const Engines = {
  Standard: 'standard',
  Shopify: 'shopify',
  Jekyll: 'jekyll',
  Eleventy: 'eleventy'
}
