import { ParseError, ErrorLevel } from 'lexical/errors'

/**
 * Parsing Errors
 *
 * Returns Error Diagnostics when invalid
 * sequences occur. Each error attaches the
 * range (line/column) information so its
 * easily adapted within a Language Server
 *
 * @todo
 * _Provide translations i18n localizations to
 * error messages for non-english developers._
 *
 * @param {number} error
 * @param {{ range: object, node: number, offset: number, token: string }} details
 * @returns {Parser.IParseError}
 */
export default (error = 0, range = {}) => ({

  /* -------------------------------------------- */
  /* ERRORS                                       */
  /* -------------------------------------------- */

  [ParseError.MissingTagName]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing tag name'
    }
  ),
  [ParseError.MissingObjectName]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing Object name'
    }
  ),
  [ParseError.MissingBracketNotation]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing object property bracket notation'
    }
  ),
  [ParseError.MissingStartTag]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing Start tag'
    }
  ),
  [ParseError.MissingEndTag]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing end tag'
    }
  ),
  [ParseError.MissingOpenDelimiter]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing opening tag delimiter'
    }
  ),
  [ParseError.MissingCloseDelimiter]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing closing tag delimiter'
    }
  ),
  [ParseError.MissingColon]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing colon separator'
    }
  ),
  [ParseError.MissingQuotation]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Malformed string, missing quotation character'
    }
  ),
  [ParseError.MissingProperty]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing object property'
    }
  ),
  [ParseError.MissingFilter]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing Filter, a filter must follow a pipe character'
    }
  ),
  [ParseError.MissingFilterArgument]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing filter argument'
    }
  ),
  [ParseError.MissingFilterSeparator]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing filter separator character'
    }
  ),
  [ParseError.MissingNumber]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing number'
    }
  ),
  [ParseError.MissingCondition]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing conditional value'
    }
  ),
  [ParseError.MissingIterationIteree]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing iteree value'
    }
  ),
  [ParseError.MissingIterationArray]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Missing iteration value'
    }
  ),
  [ParseError.InvalidName]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid name value has been expressed'
    }
  ),
  [ParseError.InvalidTagName]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid tag name'
    }
  ),
  [ParseError.InvalidObjectName]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid object name was expressed'
    }
  ),
  [ParseError.InvalidProperty]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid Property'
    }
  ),
  [ParseError.InvalidPropertyNotation]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid Property Notation, expected "." or "[" character'
    }
  ),
  [ParseError.InvalidCharacter]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid character'
    }
  ),
  [ParseError.InvalidCharacters]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid characters or word'
    }
  ),
  [ParseError.InvalidFilter]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid or unknown filter'
    }
  ),
  [ParseError.InvalidSyntactic]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid syntactic tag placement'
    }
  ),
  [ParseError.InvalidPlacement]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid tag placement'
    }
  ),
  [ParseError.InvalidOperator]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Invalid operator sequence'
    }
  ),
  [ParseError.RejectString]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'String value not accepted'
    }
  ),
  [ParseError.RejectNumber]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Number value not accepted'
    }
  ),
  [ParseError.RejectInteger]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Number value not accepted'
    }
  ),
  [ParseError.RejectBoolean]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Boolean value not accepted'
    }
  ),
  [ParseError.RejectArray]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Array value not accepted'
    }
  ),
  [ParseError.RejectObject]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Object value not accepted'
    }
  ),
  [ParseError.RejectProperty]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Property value is not of type object'
    }
  ),
  [ParseError.RejectParameters]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Tag does not accept parameters'
    }
  ),
  [ParseError.RejectFilterArguments]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Filter does not accept arguments'
    }
  ),
  [ParseError.RejectWhitespace]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Extraneous and/or unnecessary spacing characters'
    }
  ),
  [ParseError.RejectWhitespaceControl]: (
    {
      range,
      severity: ErrorLevel.Error,
      message: 'Tag does not accept whitespace strips'
    }
  ),
  /* -------------------------------------------- */
  /* WARNINGS                                     */
  /* -------------------------------------------- */

  [ParseError.WarnWhitespace]: (
    {
      range,
      severity: ErrorLevel.Warning,
      message: 'Extraneous whitespace detected'
    }
  ),

  [ParseError.UnknownProperty]: (
    {
      range,
      severity: ErrorLevel.Warning,
      message: 'Unknown property value expressed'
    }
  )
}[error])
