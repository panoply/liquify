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

  /**
   * Variable
   *
   * **EXAMPLES**
   *
   * - `{% assign %}`
   * - `{% capture %}`
   * - `{% increment %}`
   */
  Variable,
  /**
   * Variable Keyword
   *
   * The next known token which represents the assignment keyword name
   * of a variable type token.
   *
   * **EXAMPLES**
   *
   * - `foo` in `{% assign foo^`
   * - `foo` in `{% capture foo^`
   * - `foo` in `{% increment foo^`
   */
  VariableKeyword,
  /**
   * Variable Operator
   *
   * The operation equals token character used in the assignment of
   * variable keywords.
   *
   * **EXAMPLES**
   *
   * - `=` in `{% assign foo =^`
   *
   */
  VariableOperator,
  VariableValue,
  VariableValueString,
  VariableValueNumber,
  VariableValueKeyword,
  VariableValueObject,
  VariableValueObjectProperty,

  TagArgument,

  Filter,
  FilterOperator,
  FilterArgument,
  FilterArgumentNumber,
  FilterIdentifier,
  FilterParameter,
  FilterEnd,

  Unknown,

  Control,
  ControlCondition,
  ControlOperator,
  ControlElse,
  ControlElseIf,

  DelimiterOpen,
  DelimiterClose,
  DelimiterEnder,

  /* TAGS --------------------------------------- */

  TagOpen,
  TagClose,

  EndTagOpen,
  EndTagClose,
  OutputTagOpen,

  /**
   * Start Tag Close
   *
   * After the ending delimiter of a tag
   *
   * **EXAMPLES**
   *
   * - `{% for i in arr %}^`
   * - `{% if x == cond %}^`
   */
  StartTagClose,

  /**
   * Singular Tag Close
   *
   * After the ending delimiter of a singular type tag
   *
   * **EXAMPLES**
   *
   * - `{% assign %}^`
   * - `{% render %}^`
   */
  SingularTagClose,
  /**
   * Output Tag Close
   *
   * After the ending delimiter of an output type tag
   *
   * **EXAMPLES**
   *
   * - `{{ x }}^`
   */
  OutputTagClose,

  /* -------------------------------------------- */
  /* TAG NAMES                                    */
  /* -------------------------------------------- */

  /**
   * Start Tag Name
   *
   * _Start tags require an `endtag` be defined_
   *
   * **EXAMPLES**
   *
   * - `{% for^`
   * - `{% if^`
   */
  StartTagName,
  /**
   * End Tag Name
   *
   * _End tags are the ender pairing of a start tag._
   *
   * **EXAMPLES**
   *
   * - `{% endfor^`
   * - `{% endraw^`
   */
  EndTagName,
  /**
   * Singular Tag Name
   *
   * _Singular tags do not require an endtag, ie: singleton_
   *
   * **EXAMPLES**
   *
   * - `{% assign^`
   * - `{% render^`
   * - `{% elsif^`
   * - `{% break^`
   */
  SingularTagName,
  /**
   * Output Tag Name
   *
   * _Output tags are `const` types or those which are not identified as objects_
   *
   * **EXAMPLES**
   *
   * - `{{ content_for_header^`
   * - `{{ 'string'^`
   * - `{{ 100^`
   */
  OutputTagName,
  /**
   * Object Tag Name
   *
   * _Similar to `output` types but references a **known** object in the spec_
   *
   * **EXAMPLES**
   *
   * - `{{ product^`
   * - `{{ article^`
   */
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
   * The object name and/or point before notation of an object, different from
   * the types `ObjectTagName` and ` ObjectTagNameKnown` in the sense that the
   * expression does not exist at the start of the token
   *
   * **EXAMPLES**
   *
   * - `foo` in `{% if foo.bar %}`
   * - `foo` in `{{ x | filter: foo.bar }}`
   *
   */
  Object,
  /**
   * Object Property
   *
   * _After an object property_
   *
   * **EXAMPLES**
   *
   * - `bar` in `{{ foo.bar }}`
   * - `bar` in `{% if foo.bar %}`
   * - `bar` in `{{ x | filter: foo.bar }}`
   */
  ObjectProperty,
  ObjectPropertyString,
  /**
   * Object Property Object
   *
   * An object reference used within a backet notation.
   *
   * **EXAMPLES**
   *
   * - `object` in `{{ foo[object.prop] }}`
   * - `object` in `{{ foo[bar.prop[object]] }}`
   */
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
