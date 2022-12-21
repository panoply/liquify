
/**
 * Style lexer stack token types
 */
export enum StyleTypes {
  /**
   * Describes a : character. This types value exists to uniquely set colon
   * characters apart from other types values.
   */
  colon = 'colon',
  /**
   * Describes standard CSS block comments as well as line comments that
   * exist in languages like LESS and SCSS.
   */
  comment = 'comment',
  /**
   * Describes the characters `}` and `)` if the parenthesis closes a structure
   * described as map.
   */
  end = 'end',
  /**
   * Describes a name followed by a single set of parenthesis which is
   * followed by either a semicolon or closing curly brace.
   */
  function = 'function',
  /**
   * Describes a CSS @ rule selector function
   */
  at_rule = 'at_rule',
  /**
   * This is an internally used value that should not be exposed outside
   * the lexer unless the lexer receives an incomplete code sample.
   */
  item = 'item',
  /**
   * Describes a CSS selector.
   */
  selector = 'selector',

  /**
   * Describes a pseudo selector of either class or element type.
   */
  pseudo = 'pseudo',
  /**
   * Describes a pseudo selector. This is a selector with a single colon prefix,
   * eg: `:root {}` - see: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
   *
   * > When used with `correct` and 2 colons are expressed, it will be replaced with 1.
   */
  pseudo_class = 'pseudo_class',
  /**
   * Describes a pseudo element. This is a selector which uses 2 colon prefixes,
   * eg: `::last-child` - see: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
   *
   * > When used with `correct` and a single colon is expressed, it will be replaced with 2.
   */
  pseudo_element = 'pseudo_element',
  /**
   * Describes a ; character. This types value exists to uniquely set semicolon
   * characters apart from other types values.
   */
  semi = 'semi',
  /**
   * Describes `{` and `(` if the parenthesis is part of a map structure.
   */
  start = 'start',
  /**
   * Describes a token comprising an external template language that is not
   * of start or end types.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template = 'template',
  /**
   * Various template languages commonly offer conditions with else branches.
   * Else tokens do not behave the same way as a templates start or end types.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template_else = 'template_else',
  /**
   * Describes the closing sequence for a third party language template tag.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template_end = 'template_end',
  /**
   * Describes the closing sequence for a third party language template tag.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template_start = 'template_start',
  /**
   * Describes CSS property values, which is generally anything that follows a colon,
   * even if not a known property, but does not immediately precede some sort of structure opening.
   */
  value = 'value',
  /**
   * Languages like LESS and SCSS allow defining and referencing from variables.
   */
  variable = 'variable',
}

/**
 * Script lexer stack token types
 */
export enum ScriptTypes {
  /**
   * Describes both block comments (`/*`) and line comments (`//`)
   *
   * ---
   * @prettify
   *
   * This infers Liquid `{% comment %}` and `{% endcomment%}` in Prettify
   */
  comment = 'comment',
  /**
   * Describes }, ], and ).
   */
  end = 'end',
  /**
   * Java and C# styled type generics as used in TypeScript
   */
  generic = 'generic',
  /**
   * JavaScript operators and other syntax characters not otherwise described here.
   */
  operator = 'operator',
  /**
   * Numbers.
   */
  number = 'number',
  /**
   * A named reference of an object.
   */
  property = 'property',
  /**
   * A word token type that is declared in the code sample.
   */
  reference = 'reference',
  /**
   * Regular expressions. Described as delimited by / characters but not in
   * such a way that the first character could suggestion a division operator.
   */
  regex = 'regex',
  /**
   * Describes `,`, `.`, and `;`.
   */
  separator = 'separator',
  /**
   * Strings, which includes JavaScript template strings.
   */
  string = 'string',
  /**
   * Describes `{`, `[`, and `(`.
   */
  start = 'start',
  /**
   * Describes syntax groups that comprise a known foreign language, often a
   * template language, and is otherwise illegal syntax in JavaScript.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template = 'template',
  /**
   * A template type that is used as the else block of a condition.
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template_else = 'template_else',
  /**
   *  A terminal token of a template body
   *
   * ---
   * @prettify
   *
   * This infers Liquid code in Prettify
   */
  template_end = 'template_end',
  /**
   * A start token of a template body.
   */
  template_start = 'template_start',
  /**
   * A template (literal) string that terminates with `${`.
   */
  template_string_end = 'template_string_end',
  /**
   * A template string that starts with `}` and terminates with `${`.
   */
  template_string_else = 'template_string_else',
  /**
   * A template string that starts with `}`
   */
  template_string_start = 'template_string_start',
  /**
   *  A TypeScript data type declaration.
   */
  type = 'type',
  /**
   * Closing out a TypeScript data type.
   */
  type_end = 'type_end',
  /**
   * A starting structure of TypeScript data types.
   */
  type_start = 'type_start',
  /**
   * A markup type
   */
  markup = 'markup',
  /**
   * A collection of characters that comprise a JavaScript keyword or
   * reference not explicitly declared in the code sample. This parser is
   * less strict than a JavaScript compiler in that it does not, at this time,
   * trap certain extended UTF8 control characters that aren't valid in identifiers.
   */
  word = 'word',
}

/**
 * Markup lexer stack token types
 */
export enum MarkupTypes {
  /**
   * The doctype tag
   *
   * ---
   * @example
   *
   * <!doctype>
   */
  doctype = 'doctype',
  /**
   * An XML/SGML CDATA block. Typically used to allow extraneous string content in an XML
   * document that might otherwise break the XML syntax rules.
   */
  cdata = 'cdata',
  /**
   * When a CDATA segment terminates an enclosed grammar parsed with a different lexer.
   */
  cdata_end = 'cdata_end',
  /**
   * When a CDATA segment starts an enclosed grammar parsed with a different lexer.
   */
  cdata_start = 'cdata_start',
  /**
   * Comment in XML or supporting template syntax.
   */
  comment = 'comment',
  /**
   * JSX allows JavaScript style comments as tag attributes.
   */
  comment_attribute = 'comment_attribute',
  /**
   * Comments used in IE to hack references to CSS by IE version.
   * Follows a SGML square brace convention.
   */
  conditional = 'conditional',
  /**
   * Regular text nodes, but white space is removed from the front and end of the
   * node as an 'approximate value is accounted for in the lines data field.
   */
  content = 'content',
  /**
   * A content type that lets consuming applications this token must not be modified.
   */
  content_preserve = 'content_preserve',
  /**
   * A start tag of a tag pair.
   * ---
   * @example
   *
   * <main>
   * <div>
   * <style>
   * <script>
   */
  start = 'start',
  /**
   * An end tag of a tag pair.
   *
   * ---
   * @example
   *
   * </main>
   * </div>
   * </style>
   * </script>
   */
  end = 'end',
  /**
   * These types are used to excuse a structure from deeper evaluation and treats
   * the element as a singleton even if it is part of tag pair and contains descendant nodes.
   */
  ignore = 'ignore',
  /**
   * The start of an curly brace delimited escape, stated as a tag attribute, that
   * allows JavaScript inside the markup tag of a JSX markup element.
   *
   *
   * ---
   * @example
   *
   * <img id={}>  // Before { character
   */
  jsx_attribute_start = 'jsx_attribute_start',
  /**
   * The end of an curly brace delimited escape, stated as a tag attribute, that
   * allows JavaScript inside the markup tag of a JSX markup element.
   *
   * ---
   * @example
   *
   * <img id={}>  // After } character
   */
  jsx_attribute_end = 'jsx_attribute_end',
  /**
   * A curly brace indicating the contents that need to be passed to the script
   * lexer for JSX language.
   *
   * ---
   * @example
   *
   * <img id={}>  // After { character
   */
  script_start = 'script_start',
  /**
   * A curly brace indicating a script string has concluded for JSX Language
   *
   * ---
   * @example
   *
   * <img id={}> // Before } character
   */
  script_end = 'script_end',
  /**
   * Starting embedded Liquid tag containing JSON for Liquid Language
   *
   * ---
   * @example
   *
   * {% schema %}
   */
  schema_start = 'schema_start',
  /**
   * Ending embedded Liquid tag containing JSON for Liquid Language
   *
   * ---
   * @example
   *
   * {% endschema %}
   */
  schema_end = 'schema_end',
  /**
   * SGML type notations, which can be deeply nested using square brace notation.
   *
   * @deprecated
   * This will no longer be provided in Prettify
   */
  sgml = 'sgml',
  /**
   * A self-closing tag.
   *
   * ---
   * @example
   *
   * <br>
   * <input>
   * <hr>
   */
  singleton = 'singleton',
  /**
   * A tag indicating it may contain contents that need to be passed to the style lexer.
   */
  style = 'style',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="foo-bar"> // id="foo-bar"
   * <div data-id="xx"> // data-id="xx"
   */
  attribute = 'attribute',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  template_value_start = 'template_value_start',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  template_value_end = 'template_value_end',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  template_value = 'template_value',
  /**
   * A start template tag being used within an attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}>
   */
  template_attribute_start = 'template_attribute_start',
  /**
   * template tag acting as the else block of a condition but contained
   * within a HTML attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}data-attr{% else %}>
   */
  template_attribute_else = 'template_attribute_else',
  /**
   * A closing template tag associated with a prior template_start tag type but
   * contained within a HTML attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}data-attr{% else %}data-x{% endif %}>
   */
  template_attribute_end = 'template_attribute_end',
  /**
   * A tag attribute that conveys instructions to a template pre-parser opposed to
   * meta data describing the markup tag. This is representative of Liquid tags
   * infused within HTML attributes.
   *
   * ---
   * @example
   *
   * <div {{ foo }}>
   */
  template_attribute = 'template_attribute',
  /**
   * A tag attribute that represents a basic string value, typically used within conditional
   * based expressions, with this type being the resulting conditional. When this type is
   * inferred, no identation is applied, and instead the attribute is chained.
   *
   * ---
   * @example
   *
   * // Where "foo" and "bar" both represent
   * // a "template_attribute_chain" type
   * <div data-{% if xx %}foo{% else %}bar{% endif %}="xxx">
   */
  template_attribute_chain = 'template_attribute_chain',
  /**
   * A tag delimited by a known convention of an external template language.
   * This is typically going to represent singleton Liquid tags or Liquid objects,
   * but could also represent unknown Liquid tags.
   *
   * ---
   * @example
   *
   * {{ object }}
   * {% tag %} // singleton
   */
  template = 'template',
  /**
   * A template tag that contains content or other tags not associated with
   * the template language and expects a closing tag. This is representative of
   * Liquid tags.
   *
   * ---
   * @example
   *
   * {% for %}
   * {% unless %}
   * {% if %}
   */
  template_start = 'template_start',
  /**
   * A template tag acting as the else block of a condition. This is representative of
   * Liquid tags.
   *
   * ---
   * @example
   *
   * {% else %}
   * {% elsif %}
   * {% when %}
   */
  template_else = 'template_else',
  /**
   * A closing template tag associated with a prior template_start tag type.
   *
   * ---
   * @example
   *
   * {% endfor %}
   * {% endunless %}
   * {% endif %}
   */
  template_end = 'template_end',
  /**
   *  XML pragmas. Typically used to declare the document for an XML interpreter,
   * but otherwise not widely used.
   */
  xml = 'xml'
}

/**
 * Extra lexer stack token types
 */
export enum ExtraTypes {
  else = 'else',
  mixin = 'mixin',
  comment = 'comment',
  'content-ignore' = 'content-ignore'
}
