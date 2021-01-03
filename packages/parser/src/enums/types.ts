export const enum TokenType {
  /**
   * Whitespace Characters `\s\t\r\f\n`
   */
  Whitespace,

  String,

  Separator,

  Filter,

  /**
   * Unknown Characters
   */
  Unknown,

  /**
   * Unknown Characters
   */
  ControlCondition,

  /**
   * Unknown Characters
   */
  ControlOperator,

  IterationIteree,

  IterationOperator,

  IterationArray,

  IterationParameter,

  IterationParameterValue,

  Object,

  ObjectProperties,

  /**
   * Unknown Characters
   */
  ParseError,

  /**
   * Unknown Characters
   */
  Content,

  /**
   * Last Chacters in stream
   */
  EOS,

  /**
   * After Delimeter `---`
   */
  FrontmatterStart,

  /**
   * After Delimeter `---`
   */
  FrontmatterEnd,

  /**
   * Before Delimeter `#` _when_ `# comment`
   */
  YAMLCommentStart,

  /**
   * Within Tag `# comment`
   */
  YAMLComment,

  /**
   * After Delimeter `\n` _when_ `# comment`
   */
  YAMLCommentClose,

  /**
   * Before Delimeter `{%` _when_ `{%- start -%}`
   */
  LiquidTagOpen,

  /**
   * After Left side Whitespace Dash `-` _when_ `{%- tag %}`
   */
  LiquidWhitespaceDash,

  /**
   * Within Tag `{%- start -%}`
   */
  LiquidTag,

  /**
   * After Delimeter `%}` _when_ `{%- start -%}`
   */
  LiquidTagClose,

  /**
   * Before Delimeter `{%` _when_ `{%- endstart -%}`
   */
  LiquidEndTagOpen,

  /**
   * Within Tag `{%- endstart -%}`
   */
  LiquidEndTag,

  /**
   * After Delimeter `%}` _when_ `{%- endstart -%}`
   */
  LiquidEndTagClose,

  /**
   * Before Delimeter `{%` _when_ `{%- tag -%}`
   */
  LiquidTagName,

  /**
   * Within Tag  `{%- tag -%}`
   */
  LiquidSingularTag,

  /**
   * After Delimeter `%}` _when_ `{%- tag -%}`
   */
  LiquidSingularTagClose,

  /**
   * Before Delimeter `{{` _when_ `{{- object -}}`
   */
  LiquidObjectTagOpen,

  /**
   * Within Tag `{{- object -}}`
   */
  LiquidObjectTag,

  /**
   * After Delimeter `}}` _when_ `{{- tag -}}`
   */
  LiquidObjectTagClose,

  /**
   * Before Delimeter `<` _when_ `<tag>`
   */
  HTMLStartTagOpen,

  /**
   * Within Tag `<tag>`
   */
  HTMLTagName,

  /**
   * After Delimeter `>` _when_ `<tag>`
   */
  HTMLStartTagClose,

  /**
   * After Delimeter `/>` _when_ `<tag />`
   */
  HTMLStartTagSelfClose,

  /**
   * Before Delimeter `<` _when_ `</tag>`
   */
  HTMLEndTagOpen,

  /**
   * Within Tag `</tag>`
   */
  HTMLEndTag,

  /**
   * After Delimeter `>` _when_ `</tag>`
   */
  HTMLEndTagClose,

  /**
   * Before Delimeter `<` _when_ `<!-- comment -->`
   */
  HTMLStartCommentTag,

  /**
   * Within Tag `<!-- comment -->`
   */
  HTMLComment,

  /**
   * After Delimeter `>` _when_ `<!-- comment -->`
   */
  HTMLEndCommentTag,

  /**
   * Attribute `attr` _when_ `<tag attr="value">`
   */
  HTMLAttributeName,

  /**
   * Attribute `attr` _when_ `<tag attr="value">`
   */
  HTMLOperatorValue,

  /**
   * Value `"value"` _when_ `<tag attr="value">`
   */
  HTMLAttributeValue,
}
