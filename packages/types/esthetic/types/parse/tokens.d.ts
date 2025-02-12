/**
 * Style lexer stack token types
 */
export enum StyleTypes {

  /**
   * Describes a `:root`selector. This types value exists to uniquely set colon
   * characters apart from other types values.
   */
  root = 'root',
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
   *
   * This infers Liquid code in Æsthetic
   */
  template = 'template',
  /**
   * Various template languages commonly offer conditions with else branches.
   * Else tokens do not behave the same way as a templates start or end types.
   *
   * ---
   *
   * This infers Liquid code in Æsthetic
   */
  liquid_else = 'liquid_else',
  /**
   * Describes the closing sequence for a third party language template tag.
   *
   * ---
   *
   * This infers Liquid code in Æsthetic
   */
  liquid_end = 'liquid_end',
  /**
   * Describes the closing sequence for a third party language template tag.
   *
   * ---
   *
   * This infers Liquid code in Prettify
   */
  liquid_start = 'liquid_start',
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
   *
   * This infers Liquid code in Æsthetic
   */
  template = 'template',
  /**
   * A template type that is used as the else block of a condition.
   *
   * ---
   *
   * This infers Liquid code in Æsthetic
   */
  liquid_else = 'liquid_else',
  /**
   *  A terminal token of a template body
   *
   * ---
   *
   * This infers Liquid code in Æsthetic
   */
  liquid_end = 'liquid_end',
  /**
   * A start token of a template body.
   */
  liquid_start = 'liquid_start',
  /**
   * A template (literal) string that terminates with `${`.
   */
  template_string_end = 'liquid_string_end',
  /**
   * A template string that starts with `}` and terminates with `${`.
   */
  template_string_else = 'liquid_string_else',
  /**
   * A template string that starts with `}`
   */
  template_string_start = 'liquid_string_start',
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
   * When a CDATA segment starts an enclosed grammar parsed with a different lexer.
   */
  cdata_start = 'cdata_start',
  /**
   * When a CDATA segment terminates an enclosed grammar parsed with a different lexer.
   */
  cdata_end = 'cdata_end',
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
   * A start tag of a tag pair.
   * ---
   * @example
   *
   * <main>
   * <div>
   * <u>
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
   * </ul>
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
   * <div id={}>  // After { character
   */
  script_start = 'script_start',
  /**
   * A curly brace indicating a script string has concluded for JSX Language
   *
   * ---
   * @example
   *
   * <div id={}> // Before } character
   */
  script_end = 'script_end',
  /**
   * SGML type notations, which can be deeply nested using square brace notation.
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
   * A tag indicating it may contain JavaScript/TypeScript that need to be passed to the script lexer.
   */
  script = 'script',
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
   *  XML pragmas. Typically used to declare the document for an XML interpreter,
   * but otherwise not widely used.
   */
  xml = 'xml'
}

export enum LiquidTypes {
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  liquid_value_start = 'liquid_value_start',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  liquid_value_end = 'liquid_value_end',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
   * <div id="{{ x }}">
   */
  liquid_value = 'liquid_value',
  /**
   * A tag attribute from a regular start or singular tag type.
   * ---
   * @example
   *
  * <div
  *   {% # comment %}
  *   id="x">
  */
  liquid_attribute_comment = 'liquid_attribute_comment',
  /**
   * A start template tag being used within an attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}>
   */
  liquid_attribute_start = 'liquid_attribute_start',
  /**
   * template tag acting as the else block of a condition but contained
   * within a HTML attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}data-attr{% else %}>
   */
  liquid_attribute_else = 'liquid_attribute_else',
  /**
   * A closing template tag associated with a prior liquid_start tag type but
   * contained within a HTML attribute
   *
   * ---
   * @example
   *
   * <div {% if x %}data-attr{% else %}data-x{% endif %}>
   */
  liquid_attribute_end = 'liquid_attribute_end',
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
  liquid_attribute = 'liquid_attribute',
  /**
   * A tag attribute that represents a basic string value, typically used within conditional
   * based expressions, with this type being the resulting conditional. When this type is
   * inferred, no identation is applied, and instead the attribute is chained.
   *
   * ---
   * @example
   *
   * // Where "foo" and "bar" both represent
   * // a "liquid_attribute_chain" type
   * <div data-{% if xx %}foo{% else %}bar{% endif %}="xxx">
   */
  liquid_attribute_chain = 'liquid_attribute_chain',
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
  liquid = 'liquid',
  /**
   * Token represents a markup start tag encapsulated within a Liquid conditional
   * expression structure.
   *
   * ---
   * @example
   *
   * {% unless x %}
   *  <div>
   * {% endunless %}
   */
  liquid_markup_start = 'liquid_markup_start',
  /**
   * Token represents a markup end tag encapsulated within a Liquid conditional
   * expression structure.
   *
   * ---
   * @example
   *
   * {% unless x %}
   *  </div>
   * {% endunless %}
   */
  liquid_markup_end = 'liquid_markup_end',
  /**
   * Bad Liquid start tag
   *
   * ---
   * @example
   *
   * <{% if x %}div{% else %}main{% endif %}>
   */
  liquid_bad_start = 'liquid_bad_start',
  /**
   * Bad Liquid end tag
   *
   * ---
   * @example
   *
   * </{% if x %}div{% else %}main{% endif %}>
   */
  liquid_bad_end = 'liquid_bad_end',
  /**
   * A Liquid tag that contains content or other tags not associated with
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
  liquid_start = 'liquid_start',
  /**
   * A Liquid case start tag
   *
   * ---
   * @example
   *
   * {% case foo %}
   */
  liquid_case_start = 'liquid_case_start',
  /**
   * A singleton Liquid tag which is used within the `{% case %}` block tag
   * expression.
   *
   * ---
   * @example
   *
   * {% when %}
   * {% when arg, arg %}
   * {% when arg or arg %}
   */
  liquid_when = 'liquid_when',
  /**
   * A Liquid case else tag
   *
   * ---
   * @example
   *
   * {% else %}
   */
  liquid_case_else = 'liquid_case_else',
  /**
   * A Liquid case end tag
   *
   * ---
   * @example
   *
   * {% case foo %}
   */
  liquid_case_end = 'liquid_case_end',
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
  liquid_else = 'liquid_else',
  /**
   * A closing template tag associated with a prior liquid_start tag type.
   *
   * ---
   * @example
   *
   * {% endfor %}
   * {% endunless %}
   * {% endif %}
   */
  liquid_end = 'liquid_end',
  /**
   * A Liquid capture tag
   *
   * ---
   * @example
   *
   * {% capture foo %}
   */
  liquid_capture = 'liquid_capture',
  /**
   * Ignore next comment
   *
   * ---
   * @example
   *
   * <!-- esthetic-ignore-next -->
   * {% # esthetic-ignore-next %}
   */
  ignore_next = 'ignore_next',
  /**
   * Liquid block comment start tag
   *
   * ---
   * @example
   *
   * {% comment %}
   */
  liquid_comment_start = 'liquid_comment_start',
  /**
   * Liquid block comment contents
   *
   * ---
   * @example
   *
   * Lorem ipsum
   */
  liquid_comment = 'liquid_comment',
  /**
   * Liquid block comment end tag
   *
   * ---
   * @example
   *
   * {% endcomment %}
   */
  liquid_comment_end = 'liquid_comment_end',
  /**
   * Represent a Liquid {% liquid tag
   *
   * ---
   * @example
   *
   * {% liquid
   */
  liquid_liquid_start = 'liquid_tag',
  /**
   * Liquid tag which is empty (no name)
   *
   * ---
   * @example
   *
   * {% %}
   * {%- -%}
   */
  liquid_empty = 'liquid_empty',
  /**
   * Represent a Liquid (liquid) tag ending delimiter
   *
   * ---
   * @example
   *
   * %}
   */
  liquid_liquid_end= 'liquid_tag',
}

/**
 * Extra lexer stack token types
 */
export enum ExtraTypes {
  else = 'else',
  mixin = 'mixin',
  comment = 'comment',
  ignore_start = 'ignore_start',
  ignore_end = 'ignore_end',
  'content-ignore' = 'content-ignore',
  /**
   * **INTERNAL USE**
   *
   * Preserves the inner content of a script tag annotated with a JSON inferring attribute value, typically
   * `type="application/json"` or `type="application/ld+json"`.
   *
   * Typically used when the `ignoreJSON` rule is inferred.
   */
  json_preserve = 'json_preserve',
  /**
   * **INTERNAL USE**
   *
   * Preserves the inner content of a `<style>` tag
   *
   * Typically used when the `ignoreCSS` rule is inferred.
   */
  style_preserve = 'json_preserve',
  /**
   * **INTERNAL USE**
   *
   * Preserves the inner content of a `<script>` tag which contains JavaScript, `<script>` tags
   * which are externally referencing a file do not apply this internal type.
   *
   * Typically used when the `ignoreCSS` rule is inferred.
   */
  script_preserve = 'json_preserve',
}
