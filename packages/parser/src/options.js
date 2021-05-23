export class Options {

  parser = {
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

  linting = {
    no_assign: false,
    no_capture: false,
    no_unless: false,
    condition_chaining: true,
    enforce_render_as: false,
    variable_expressions: 'snake_case',
    allow_whitespace_trims: true,
    string_property_expressions: true,
    variable_property_expressions: true,
    filter_pipe_newline: 'wrap',
    nested_for_loops: true,
    liquid_infusions: {
      html: [ 'div' ],
      javascript: false,
      css: false,
      scss: false,
      markdown: false
    }

  }

}
