import { LiquidParser } from '@liquify/liquid-parser'

/**
 * Liquid Parsers
 */
export const Parser = new LiquidParser(
  {
    engine: 'standard',
    context: true,
    frontmatter: false,
    whitespace: true,
    newlines: true,
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
)
