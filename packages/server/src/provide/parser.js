import { LiquidParser } from '@liquify/liquid-parser'

/**
 * Liquid Parsers
 */
export const { Spec, Parser, Documents } = LiquidParser(
  {
    engine: 'standard',
    license: process.env.MASTER_KEY,
    context: false,
    frontmatter: false,
    whitespace: false,
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
)
