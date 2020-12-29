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
  [ParseError.MissingOpenDelimeter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing opening tag delimeter',
      range: {}
    }
  ),
  [ParseError.MissingCloseDelimeter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing closing tag delimeter',
      range: {}
    }
  ),
  [ParseError.MissingColon]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.MissingProperty]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.MissingCondition]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.InvalidTagName]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.InvalidCharacter]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  ),
  [ParseError.InvalidSyntactic]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
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
  [ParseError.RejectWhitespaceControl]: (
    {
      severity: ErrorLevel.Error,
      message: 'Missing tag name',
      range: {}
    }
  )
}[error])
