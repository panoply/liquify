/* eslint no-unused-vars: "off" */

import { ParseError, ErrorLevel } from 'lexical/errors';
import { Diagnostic, Range, CodeDescription } from 'vscode-languageserver-types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IDiagnostic extends Omit<Diagnostic, 'range'> {
  range?: Range | {
    start: number,
    end: number
  }
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
    severity: ErrorLevel.Error,
    message: 'Parse error'
  },
  [ParseError.DuplicatedParameters]: {
    severity: ErrorLevel.Error,
    message: 'Duplicate/repeating parameters. Parameters must be unique!'
  },
  [ParseError.RejectFloat]: {
    severity: ErrorLevel.Error,
    message: 'Parse error'
  },
  [ParseError.RejectFilters]: {
    severity: ErrorLevel.Error,
    message: 'Parse error'
  },
  [ParseError.ParsingError]: {
    severity: ErrorLevel.Error,
    message: 'Parse error'
  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name'
  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name'
  },
  [ParseError.MissingObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Missing Object name'
  },
  [ParseError.MissingBracketNotation]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation'
  },
  [ParseError.MissingStartTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing start tag'
  },
  [ParseError.MissingEndTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing end tag'
  },
  [ParseError.MissingOpenDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter'
  },
  [ParseError.MissingCloseDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter'
  },
  [ParseError.MissingColon]: {
    severity: ErrorLevel.Error,
    message: 'Missing colon separator'
  },
  [ParseError.MissingQuotation]: {
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character'
  },
  [ParseError.MissingProperty]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property'
  },
  [ParseError.MissingFilter]: {
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character'
  },
  [ParseError.MissingFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter argument'
  },
  [ParseError.MissingFilterSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character'
  },
  [ParseError.MissingNumber]: {
    severity: ErrorLevel.Error,
    message: 'Missing number'
  },
  [ParseError.MissingCondition]: {
    severity: ErrorLevel.Error,
    message: 'Missing conditional value'
  },
  [ParseError.MissingIterationIteree]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteree value'
  },
  [ParseError.MissingIterationArray]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteration value'
  },
  [ParseError.MissingIterationRangeSeperator]: {
    severity: ErrorLevel.Error,
    message: 'Missing interation range seperator'
  },
  [ParseError.InvalidArgument]: {
    severity: ErrorLevel.Error,
    message: 'Invalid argument expressed'
  },
  [ParseError.InvalidName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed'
  },
  [ParseError.InvalidTagName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag name'
  },
  [ParseError.InvalidObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed'
  },
  [ParseError.InvalidProperty]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property'
  },
  [ParseError.InvalidPropertyNotation]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character'
  },
  [ParseError.InvalidCharacter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid character'
  },
  [ParseError.InvalidCharacters]: {
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word'
  },
  [ParseError.InvalidFilter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter'
  },
  [ParseError.InvalidSyntactic]: {
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement'
  },
  [ParseError.InvalidPlacement]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement'
  },
  [ParseError.InvalidOperator]: {
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence'
  },
  [ParseError.InvalidIterationType]: {
    severity: ErrorLevel.Warning,
    message: 'Value is not an array type and cannot be iterated'
  },
  [ParseError.RejectString]: {
    severity: ErrorLevel.Error,
    message: 'String value not accepted'
  },
  [ParseError.RejectNumber]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted'
  },
  [ParseError.RejectInteger]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted'
  },
  [ParseError.RejectBoolean]: {
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted'
  },
  [ParseError.RejectArray]: {
    severity: ErrorLevel.Error,
    message: 'Array value not accepted'
  },
  [ParseError.RejectObject]: {
    severity: ErrorLevel.Error,
    message: 'Object value not accepted'
  },
  [ParseError.RejectProperty]: {
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object'
  },
  [ParseError.RejectParameters]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters'
  },
  [ParseError.RejectFilterArguments]: {
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments'
  },
  [ParseError.RejectWhitespace]: {
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters'
  },
  [ParseError.RejectWhitespaceControl]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips'
  },
  [ParseError.WarnWhitespace]: {
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected'
  },
  [ParseError.UnknownProperty]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown property value'
  }
};
