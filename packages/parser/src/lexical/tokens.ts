/* eslint-disable */

export const enum TokenType {
  Whitespace,
  Newline,

  String,
  Boolean,
  Integer,
  Float,
  Number,

  Separator,
  Variable,
  VariableIdentifier,
  VariableKeyword,
  VariableOperator,
  VariableValue,

  Filter,
  FilterOperator,
  FilterArgument,
  FilterArgumentNumber,
  FilterIdentifier,
  FilterParameter,

  Unknown,

  Control,
  ControlCondition,
  ControlOperator,

  DelimiterOpen,
  DelimiterClose,
  DelimiterEnder,

  /* TAGS --------------------------------------- */

  TagOpen,

  EndTagOpen,
  EndTagClose,
  OutputTagOpen,
  OutputTagClose,

  StartTagClose,
  SingularTagClose,

  /* TAG NAMES ---------------------------------- */

  StartTagName,
  EndTagName,
  SingularTagName,
  OutputTagName,
  ObjectTagName,

  /* ITERATION ---------------------------------- */

  Iteration,
  IterationIteree,
  IterationOperator,
  IterationArray,
  IterationParameter,
  IterationParameterValue,

  /* LIQUID TAG TYPES --------------------------- */


  TrimDashLeft,
  TrimDashRight,

  TagName,

  /**
   * Object
   *
   * **EXAMPLES**
   *
   * - `foo` in `{{ foo.bar }}`
   * - `foo` in `{% if foo.bar %}`
   */
  Object,
  ObjectProperty,
  ObjectPropertyString,
  ObjectPropertyObject,
  ObjectPropertyNumber,
  ObjectDotNotation,
  ObjectBracketNotationOpen,
  ObjectBracketNotationClose,

  StringSingleQuote,
  StringDoubleQuote,

  /* EMBEDDED LANGUAGES ------------------------- */

  Embedded,
  EmbeddedJSON,
  EmbeddedJavaScript,
  EmbeddedCSS,
  EmbeddedSCSS,

  Comment,

  /* ERRORS AND WARNINGS ------------------------ */

  ParsePrevNode,
  ParseResolve,
  ParseCancel,
  ParseError,
  ParseWarning,
  ParseSkip,
  ParseTolerate,

  Content,

  EOS,

  /* FONTMATTER --------------------------------- */

  FrontmatterStart,
  FrontmatterEnd,

  /* YAML --------------------------------------- */

  YAMLCommentStart,
  YAMLComment,
  YAMLCommentClose,

  /* LIQUID ------------------------------------- */

  LiquidTagOpen,

  LiquidTag,
  LiquidTagClose,

  LiquidEndTagOpen,
  LiquidEndTag,
  LiquidEndTagClose,
  LiquidTagName,

  LiquidSingularTag,
  LiquidSingularTagClose,

  LiquidObjectTagOpen,
  LiquidObjectName,
  LiquidObjectTagClose,

  /* -------------------------------------------- */
  /* HTML TOKENS                                  */
  /* -------------------------------------------- */

  /* HTML START TAGS ---------------------------- */

  HTMLStartTagOpen,
  HTMLStartTagClose,
  HTMLStartTagLiquidStart,
  HTMLStartTagLiquidEnd,
  HTMLStartTagLiquidOutput,

  /* HTML END TAGS ------------------------------ */

  HTMLEndTagOpen,
  HTMLEndTagClose,

  /* HTML VOID TAGS ----------------------------- */

  HTMLVoidTagOpen,
  HTMLVoidTagClose,
  HTMLVoidTagLiquidStart,
  HTMLVoidTagLiquidEnd,
  HTMLVoidTagLiquidOutput,

  HTMLStartCommentTag,
  HTMLComment,
  HTMLEmbedded,
  HTMLAttributeName,
  HTMLLiquidAttribute,
  HTMLAttributeValue,
  HTMLOperatorValue,

  /* HTML LIQUID -------------------------------- */




}
