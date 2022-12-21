/**
 * Strip the leading whitespace and newlines.
 *
 * ---
 *
 * @example
 *
 * BEFORE: '  \n  foo  '
 * AFTER:  'foo  ' // leading whitespace and newlines are preserved
 */
export const SpaceLead = /^\s+/;

/**
 * Strip the ending whitespace excluding newlines.
 *
 *
 * ---
 *
 * @see https://stackoverflow.com/a/3873354/2021554
 *
 * @example
 *
 * BEFORE: '  foo  \n  '
 * AFTER:  '  foo' // leading whitespace and newlines are preserved
 */
export const SpaceEnd = /\s+$/;

/**
 * Strip the leading whitespace excluding newlines.
 *
 * This will remove carriage returns (`\r`), so if the input contains
 * `\r\n` pairs, they will be converted to just `\n`.
 *
 * ---
 *
 * @see https://stackoverflow.com/a/3873354/2021554
 *
 * @example
 *
 * BEFORE: ' \n  foo'
 * AFTER:  '\nfoo' // leading whitespace and newlines are preserved
 */
export const StripLead = /^[\t\v\f\r \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/;

/**
 * Strip the ending whitespace excluding newlines.
 *
 * This will remove carriage returns (`\r`), so if the input contains
 * `\r\n` pairs, they will be converted to just `\n`.
 *
 * ---
 *
 * @see https://stackoverflow.com/a/3873354/2021554
 * @example
 *
 * BEFORE: '  foo  \n  '
 * AFTER:  '  foo\n' // leading whitespace and newlines are preserved
 */
export const StripEnd = /[\t\v\f \u00a0\u2000-\u200b\u2028-\u2029\u3000]+$/;

/**
 * Captures more than 1 whitespace character occurances but does not touch newlines.
 *
 * ---
 *
 * @example
 *
 * ' \t\v\r '
 */
export const SpaceOnly = /[\t\v\r \u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g;

/**
 * Captures whitespace only
 *
 * ---
 *
 * @example
 *
 * '\t\v\r '
 */
export const Whitespace = /[\t\v\r \u00a0\u2000-\u200b\u2028-\u2029\u3000]/;
/**
 * Captures more than 1 tab character occurances but does not touch newlines.
 *
 * ---
 *
 * @example
 *
 * BEFORE: 'foo   \t\n '
 * AFTER:  'foo   \n'
 */
export const TabsOnly = /\t+/g;

/**
 * Regex is used to inject whitespace and equally distributes spacing
 * within Liquid tokens. It directly relates to `normalizeSpacing` rules.
 *
 * ---
 *
 * @see https://regex101.com/r/jxLNhv/1
 * @example
 *
 * BEFORE: '|filter:" foo "|append:123'
 * AFTER:  '| filter: " foo " | append: 123'
 */
export const SpaceInjectBefore = /[|:,[\]](?=[0-9a-z-])/g;

/**
 * Regex is used to inject whitespace and equally distributes spacing
 * within Liquid tokens. It directly relates to `normalizeSpacing` rules.
 * This regex is specifically used for prefixed token characters.
 *
 * ---
 *
 * @see https://regex101.com/r/jxLNhv/1
 * @example
 *
 * BEFORE: 'foo="bar"'
 * AFTER:  'foo = "bar"' // SpaceInjectBefore will handle `="bar"`
 */
export const SpaceInjectAfter = /(?<=[0-9a-z\]-])(?:[!=]=|[<>]=?)/g;

/**
 * Regex is used to strip whitespaces expressed where they might otherwise
 * can be avoided.
 *
 * ---
 * @example
 *
 * BEFORE: 'object . prop'
 * AFTER:  'object.prop' // SpaceInjectBefore will handle `="bar"`
 */
export const StripSpaceInject = /[.[\]] {1,}/g;

/**
 * Captures Prettify inline comment controls
 *
 * ---
 * @see https://regex101.com/r/pGFcm3/1
 * @example
 *
 * LINE COMMENT:    // @prettify
 * BLOCK COMMENT:   /* @prettify
 * LINE LIQUID:     {% # @prettify
 * BLOCK LIQUID:    {% comment %} @prettify
 * HTML COMMENT:    <!-- @prettify
 * YAML COMMENT:    # @prettify
 */
export const CommControl = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify\s+/;

/**
 * Captures Prettify inline comment file ignores
 *
 * ---
 * @see https://regex101.com/r/gDpxIG/1
 * @example
 *
 * LINE COMMENT:    // @prettify-ignore
 * BLOCK COMMENT:   /* @prettify-ignore
 * LINE LIQUID:     {% # @prettify-ignore
 * BLOCK LIQUID:    {% comment %} @prettify-ignore
 * HTML COMMENT:    <!-- @prettify-ignore
 * YAML COMMENT:    # @prettify-ignore
 */
export const CommIgnoreFile = /(\/[*/]|{%-?\s*(?:comment\s*-?%})|<!-{2})\s*@prettify-ignore\b/;

/**
 * Captures Prettify inline comment ignore starters
 *
 * ---
 * @see https://regex101.com/r/QNLjAX/1
 * @example
 *
 * LINE COMMENT:    // @prettify-ignore-start
 * BLOCK COMMENT:   /* @prettify-ignore-start
 * LINE LIQUID:     {% # @prettify-ignore-start
 * BLOCK LIQUID:    {% comment %} @prettify-ignore-start
 * HTML COMMENT:    <!-- @prettify-ignore-start
 * YAML COMMENT:    # @prettify-ignore-start
 */
export const CommIgnoreStart = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify-ignore-start\b/;

/**
 * Captures Prettify inline comment ignore enders
 *
 * ---
 * @see https://regex101.com/r/MJgkQq/1
 * @example
 *
 * LINE COMMENT:    // @prettify-ignore-end
 * BLOCK COMMENT:   /* @prettify-ignore-end
 * LINE LIQUID:     {% # @prettify-ignore-end
 * BLOCK LIQUID:    {% comment %} @prettify-ignore-end
 * HTML COMMENT:    <!-- @prettify-ignore-end
 * YAML COMMENT:    # @prettify-ignore-end
 */
export const CommIgnoreEnd = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify-ignore-end\b/;

/**
 * Captures Prettify inline comment ignore next line
 *
 * ---
 * @see https://regex101.com/r/nGP7Uh/1
 * @example
 *
 * LINE COMMENT:    // @prettify-ignore-next
 * BLOCK COMMENT:   /* @prettify-ignore-next
 * LINE LIQUID:     {% # @prettify-ignore-next
 * BLOCK LIQUID:    {% comment %} @prettify-ignore-next
 * HTML COMMENT:    <!-- @prettify-ignore-next
 * YAML COMMENT:    # @prettify-ignore-next
 */
export const CommIgnoreNext = /(\/[*/]|{%-?\s*(?:comment\s*-?%}|#)|<!-{2})\s*@prettify-ignore-next\b/;

/**
 * Liquid Tag Delimiters
 *
 * Used in the `wrapCommentBlock` method of the `Parser` class, captures
 * Liquid Tag delimiters, see example.
 *
 * ---
 *
 * @example /{%-?\s*|\s*-?%}/g
 *
 */
export const LiqDelims = /{%-?\s*|\s*-?%}/g;

/**
 * Character Escape
 *
 * Used in the `wrapCommentBlock` method of the `Parser` class.
 *
 * ---
 *
 * @example /(\/|\\|\||\*|\[|\]|\{|\})/g
 *
 */
export const CharEscape = /(\/|\\|\||\*|\[|\]|\{|\})/g;
