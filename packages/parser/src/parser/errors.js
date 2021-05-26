import { ParseError, ErrorLevel } from '../enums/errors'

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
export default (error = 0, { range = {}, node = 0, offset = 0, token = '' }) => ({

  /* -------------------------------------------- */
  /* ERRORS                                       */
  /* -------------------------------------------- */

  [ParseError.MissingTagName]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing tag name'
    }
  ),
  [ParseError.MissingObjectName]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing Object name'
    }
  ),
  [ParseError.MissingBracketNotation]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing object property bracket notation'
    }
  ),
  [ParseError.MissingStartTag]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing Start tag'
    }
  ),
  [ParseError.MissingEndTag]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing end tag'
    }
  ),
  [ParseError.MissingOpenDelimiter]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing opening tag delimiter'
    }
  ),
  [ParseError.MissingCloseDelimiter]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing closing tag delimiter'
    }
  ),
  [ParseError.MissingColon]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing colon separator'
    }
  ),
  [ParseError.MissingQuotation]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Malformed string, missing quotation character'
    }
  ),
  [ParseError.MissingProperty]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing object property'
    }
  ),
  [ParseError.MissingFilter]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing Filter, a filter must follow a pipe character'
    }
  ),
  [ParseError.MissingFilterArgument]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing filter argument'
    }
  ),
  [ParseError.MissingFilterSeparator]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing filter separator character'
    }
  ),
  [ParseError.MissingNumber]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing number'
    }
  ),
  [ParseError.MissingCondition]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Missing conditional value'
    }
  ),
  [ParseError.InvalidTagName]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid tag name'
    }
  ),
  [ParseError.InvalidObjectName]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid object name was expressed'
    }
  ),
  [ParseError.InvalidProperty]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid Property'
    }
  ),
  [ParseError.InvalidPropertyNotation]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid Property Notation, expected "." or "[" character'
    }
  ),
  [ParseError.InvalidCharacter]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid character'
    }
  ),
  [ParseError.InvalidCharacters]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid characters or word'
    }
  ),
  [ParseError.InvalidFilter]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid or unknown filter'
    }
  ),
  [ParseError.InvalidSyntactic]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid syntactic tag placement'
    }
  ),
  [ParseError.InvalidOperator]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Invalid operator sequence'
    }
  ),
  [ParseError.RejectString]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'String value not accepted'
    }
  ),
  [ParseError.RejectNumber]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Number value not accepted'
    }
  ),
  [ParseError.RejectInteger]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Number value not accepted'
    }
  ),
  [ParseError.RejectBoolean]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Boolean value not accepted'
    }
  ),
  [ParseError.RejectArray]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Array value not accepted'
    }
  ),
  [ParseError.RejectObject]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Object value not accepted'
    }
  ),
  [ParseError.RejectProperty]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Property value is not of type object'
    }
  ),
  [ParseError.RejectParameters]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Tag does not accept parameters'
    }
  ),
  [ParseError.RejectFilterArguments]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Filter does not accept arguments'
    }
  ),
  [ParseError.RejectWhitespace]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Error,
      message: 'Extraneous and/or unnecessary spacing characters'
    }
  ),
  [ParseError.RejectWhitespaceControl]: (
    {
      range,
      node,
      offset,
      token,
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
      node,
      offset,
      token,
      severity: ErrorLevel.Warning,
      message: 'Extraneous whitespace detected'
    }
  ),

  [ParseError.UnknownProperty]: (
    {
      range,
      node,
      offset,
      token,
      severity: ErrorLevel.Warning,
      message: 'Unknown property value expressed'
    }
  )
}[error])
