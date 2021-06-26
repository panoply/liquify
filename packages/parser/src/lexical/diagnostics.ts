/* eslint no-unused-vars: "off" */

import { ParseError, ErrorLevel } from 'lexical/errors';
import { Diagnostic, Range } from 'vscode-languageserver-types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IDiagnostic extends Omit<Diagnostic, 'range'> {
  range?: Range
  data?: {
    offset?: number
  }
}

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
 */
export const Diagnostics: { [K in ParseError]: IDiagnostic } = {
  [ParseError.InvalidQuotation]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: {}
  },
  [ParseError.RejectFloat]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: {}
  },
  [ParseError.RejectFilters]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: {}
  },
  [ParseError.ParsingError]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: {}
  },
  [ParseError.MissingTagName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: {}
  },
  [ParseError.MissingTagName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: {}
  },
  [ParseError.MissingObjectName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing Object name',
    data: {}
  },
  [ParseError.MissingBracketNotation]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation',
    data: {}
  },
  [ParseError.MissingStartTag]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing Start tag',
    data: {}
  },
  [ParseError.MissingEndTag]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing or invalid end tag',
    data: {}
  },
  [ParseError.MissingOpenDelimiter]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter',
    data: {}
  },
  [ParseError.MissingCloseDelimiter]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter',
    data: {}
  },
  [ParseError.MissingColon]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing colon separator',
    data: {}
  },
  [ParseError.MissingQuotation]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character',
    data: {}
  },
  [ParseError.MissingProperty]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing object property',
    data: {}
  },
  [ParseError.MissingFilter]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character',
    data: {}
  },
  [ParseError.MissingFilterArgument]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing filter argument',
    data: {}
  },
  [ParseError.MissingFilterSeparator]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character',
    data: {}
  },
  [ParseError.MissingNumber]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing number',
    data: {}
  },
  [ParseError.MissingCondition]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing conditional value',
    data: {}
  },
  [ParseError.MissingIterationIteree]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing iteree value',
    data: {}
  },
  [ParseError.MissingIterationArray]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Missing iteration value',
    data: {}
  },
  [ParseError.InvalidName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed',
    data: {}
  },
  [ParseError.InvalidTagName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid tag name',
    data: {}
  },
  [ParseError.InvalidObjectName]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed',
    data: {}
  },
  [ParseError.InvalidProperty]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid Property',
    data: {}
  },
  [ParseError.InvalidPropertyNotation]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character',
    data: {}
  },
  [ParseError.InvalidCharacter]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid character',
    data: {}
  },
  [ParseError.InvalidCharacters]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word',
    data: {}
  },
  [ParseError.InvalidFilter]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter',
    data: {}
  },
  [ParseError.InvalidSyntactic]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement',
    data: {}
  },
  [ParseError.InvalidPlacement]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement',
    data: {}
  },
  [ParseError.InvalidOperator]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence',
    data: {}
  },
  [ParseError.RejectString]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'String value not accepted',
    data: {}
  },
  [ParseError.RejectNumber]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: {}
  },
  [ParseError.RejectInteger]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: {}
  },
  [ParseError.RejectBoolean]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted',
    data: {}
  },
  [ParseError.RejectArray]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Array value not accepted',
    data: {}
  },
  [ParseError.RejectObject]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Object value not accepted',
    data: {}
  },
  [ParseError.RejectProperty]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object',
    data: {}
  },
  [ParseError.RejectParameters]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters',
    data: {}
  },
  [ParseError.RejectFilterArguments]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments',
    data: {}
  },
  [ParseError.RejectWhitespace]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters',
    data: {}
  },
  [ParseError.RejectWhitespaceControl]: {
    source: 'Liquid',
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips',
    data: {}
  },
  [ParseError.WarnWhitespace]: {
    source: 'Liquid',
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected',
    data: {}
  },
  [ParseError.UnknownProperty]: {
    source: 'Liquid',
    severity: ErrorLevel.Warning,
    message: 'Unknown property value expressed',
    data: {}
  }
};
