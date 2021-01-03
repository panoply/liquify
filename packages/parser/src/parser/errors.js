import { ParseError, ErrorLevel } from '../enums/errors'

/**
 * Parse Errors
 *
 * @param {number} error
 * @returns {Parser.IParseError}
 */
export default (error = 0) => ({
  [ParseError.MissingTagName]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.MissingObjectName]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing Object name',
      range: {}
    }
  ),
  [ParseError.MissingStartTag]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing Start tag',
      range: {}
    }
  ),
  [ParseError.MissingEndTag]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing End tag name',
      range: {}
    }
  ),
  [ParseError.MissingOpenDelimiter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing opening tag delimiter',
      range: {}
    }
  ),
  [ParseError.MissingCloseDelimiter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing closing tag delimiter',
      range: {}
    }
  ),
  [ParseError.MissingColon]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing colon separator',
      range: {}
    }
  ),
  [ParseError.MissingQuotation]: (
    {
      severity: ErrorLevel.Error,
      message: 'Malformed string, missing quote',
      range: {}
    }
  ),
  [ParseError.MissingProperty]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing object property',
      range: {}
    }
  ),
  [ParseError.MissingCondition]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing conditional value',
      range: {}
    }
  ),
  [ParseError.InvalidTagName]: (
    {
      severity: ErrorLevel.Error,
      message: 'Invalid tag name',
      range: {}
    }
  ),
  [ParseError.InvalidObjectName]: (
    {
      severity: ErrorLevel.Error,
      message: 'Invalid object name was expressed',
      range: {}
    }
  ),
  [ParseError.InvalidCharacter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Invalid character',
      range: {}
    }
  ),
  [ParseError.InvalidSyntactic]: (
    {
      severity: ErrorLevel.Error,
      message: 'Invalid syntactic tag placement',
      range: {}
    }
  ),
  [ParseError.InvalidOperator]: (
    {
      severity: ErrorLevel.Error,
      message: 'Invalid operator sequence',
      range: {}
    }
  ),
  [ParseError.RejectString]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectNumber]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectBoolean]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectArray]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectObject]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectParameters]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.RejectWhitespace]: (
    {
      severity: ErrorLevel.Error,
      message: 'Extraneous and/or unnecessary spacing characters',
      range: {}
    }
  ),
  [ParseError.RejectWhitespaceControl]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  )
}[error])
