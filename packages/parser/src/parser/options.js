/**
 * Parser Options
 *
 * Parse configuration options used when constructing the AST.
 * Options defined here effect how the parser should behave, what
 * should be parsed/skipped/included etc etc.
 */
export default {
  engine: 'standard',
  license: '$!5s3L<S1v>54vV1d!$_5|X~0C7083r^!9B9.31.@j4N*2o2|([m3d!nd32!8a0g3JVs])',
  context: true,
  frontmatter: false,
  whitespace: true,
  newlines: false,
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
