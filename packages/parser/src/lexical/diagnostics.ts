/* eslint no-unused-vars: "off" */

import { ParseError, ErrorLevel } from 'lexical/errors';
import { Diagnostic, Range } from 'vscode-languageserver-types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IDiagnostic extends Omit<Diagnostic, 'range'> {
  range?: Range | {
    start: number,
    end: number
  }
  data?: {
    offset?: number,
    doFormat?: boolean
  }
}

export const enum Preventions {
  FormattingDisable = 1,
  FormattingEnabled
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
    message: 'Parse error',
    data: { doFormat: false }

  },
  [ParseError.DuplicatedParameters]: {
    severity: ErrorLevel.Error,
    message: 'Duplicate/repeating parameters. Parameters must be unique!',
    data: { doFormat: true }

  },
  [ParseError.RejectFloat]: {
    severity: ErrorLevel.Warning,
    message: 'Number sequence is not an integer.',
    data: { doFormat: true }
  },
  [ParseError.RejectFilters]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: { doFormat: true }

  },
  [ParseError.ParsingError]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: { doFormat: false }
  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: { doFormat: false }

  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: { doFormat: false }

  },
  [ParseError.MissingObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Missing Object name',
    data: { doFormat: true }
  },
  [ParseError.MissingBracketNotation]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation',
    data: { doFormat: false }
  },
  [ParseError.MissingStartTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing start tag',
    data: { doFormat: false }
  },
  [ParseError.MissingEndTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing end tag',
    data: { doFormat: false }
  },
  [ParseError.MissingOpenDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter',
    data: { doFormat: false }
  },
  [ParseError.MissingCloseDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter',
    data: { doFormat: false }
  },
  [ParseError.MissingColon]: {
    severity: ErrorLevel.Error,
    message: 'Missing colon separator',
    data: { doFormat: true }
  },
  [ParseError.MissingQuotation]: {
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character',
    data: { doFormat: false }
  },
  [ParseError.MissingProperty]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property',
    data: { doFormat: true }
  },
  [ParseError.MissingFilter]: {
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character',
    data: { doFormat: true }
  },
  [ParseError.MissingFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter argument',
    data: { doFormat: true }
  },
  [ParseError.MissingFilterSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character',
    data: { doFormat: true }
  },
  [ParseError.MissingNumber]: {
    severity: ErrorLevel.Error,
    message: 'Missing number',
    data: { doFormat: true }
  },
  [ParseError.MissingCondition]: {
    severity: ErrorLevel.Error,
    message: 'Missing conditional value',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationIteree]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteree value',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationArray]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteration value',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationRangeSeperator]: {
    severity: ErrorLevel.Error,
    message: 'Missing interation range seperator',
    data: { doFormat: false }
  },
  [ParseError.InvalidArgument]: {
    severity: ErrorLevel.Error,
    message: 'Invalid argument expressed',
    data: { doFormat: true }
  },
  [ParseError.InvalidNumberRange]: {
    severity: ErrorLevel.Error,
    message: 'Invalid number range provided',
    data: { doFormat: true }
  },
  [ParseError.InvalidDecimalPoint]: {
    severity: ErrorLevel.Error,
    message: 'Hanging decimal point on number',
    data: { doFormat: true }
  },
  [ParseError.InvalidName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed',
    data: { doFormat: true }
  },
  [ParseError.InvalidTagName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag name',
    data: { doFormat: false }
  },
  [ParseError.InvalidObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed',
    data: { doFormat: false }
  },
  [ParseError.InvalidProperty]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property',
    data: { doFormat: true }
  },
  [ParseError.InvalidPropertyNotation]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character',
    data: { doFormat: true }
  },
  [ParseError.InvalidCharacter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid character',
    data: { doFormat: true }
  },
  [ParseError.InvalidCharacters]: {
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word',
    data: { doFormat: true }
  },
  [ParseError.InvalidFilter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter',
    data: { doFormat: true }
  },
  [ParseError.InvalidSyntactic]: {
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement',
    data: { doFormat: false }
  },
  [ParseError.InvalidPlacement]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement',
    data: { doFormat: false }
  },
  [ParseError.InvalidOperator]: {
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence',
    data: { doFormat: true }
  },
  [ParseError.InvalidIterationType]: {
    severity: ErrorLevel.Warning,
    message: 'Value is not an array type and cannot be iterated',
    data: { doFormat: true }
  },
  [ParseError.InvalidIterationParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Iteration parameter is not valid',
    data: { doFormat: true }
  },
  [ParseError.RejectString]: {
    severity: ErrorLevel.Error,
    message: 'String value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectNumber]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectItereeTypeValue]: {
    severity: ErrorLevel.Error,
    message: 'Iteree value must be a keyword',
    data: { doFormat: true }
  },
  [ParseError.RejectInteger]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectBoolean]: {
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectArray]: {
    severity: ErrorLevel.Error,
    message: 'Array value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectObject]: {
    severity: ErrorLevel.Error,
    message: 'Object value not accepted',
    data: { doFormat: true }
  },
  [ParseError.RejectProperty]: {
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object',
    data: { doFormat: true }
  },
  [ParseError.RejectParameters]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters',
    data: { doFormat: true }
  },
  [ParseError.RejectFilterArguments]: {
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments',
    data: { doFormat: true }
  },
  [ParseError.RejectWhitespace]: {
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters',
    data: { doFormat: true }
  },
  [ParseError.RejectWhitespaceControl]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips',
    data: { doFormat: true }
  },
  [ParseError.RequireFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'An argument is required by the filter',
    data: { doFormat: true }
  },
  [ParseError.WarnWhitespace]: {
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected',
    data: { doFormat: true }
  },
  [ParseError.UnknownFilterArgumentParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown filter argument parameter',
    data: { doFormat: true }
  },
  [ParseError.UnknownProperty]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown property value',
    data: { doFormat: true }
  }
};
