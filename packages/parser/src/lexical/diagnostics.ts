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
    format?: boolean
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
    data: { format: false }

  },
  [ParseError.DuplicatedParameters]: {
    severity: ErrorLevel.Error,
    message: 'Duplicate/repeating parameters. Parameters must be unique!',
    data: { format: true }

  },
  [ParseError.RejectFloat]: {
    severity: ErrorLevel.Warning,
    message: 'Number sequence is not an integer.',
    data: { format: true }
  },
  [ParseError.RejectFilters]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: { format: true }

  },
  [ParseError.ParsingError]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: { format: false }
  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: { format: false }

  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: { format: false }

  },
  [ParseError.MissingObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Missing Object name',
    data: { format: true }
  },
  [ParseError.MissingBracketNotation]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation',
    data: { format: false }
  },
  [ParseError.MissingStartTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing start tag',
    data: { format: false }
  },
  [ParseError.MissingEndTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing end tag',
    data: { format: false }
  },
  [ParseError.MissingOpenDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter',
    data: { format: false }
  },
  [ParseError.MissingCloseDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter',
    data: { format: false }
  },
  [ParseError.MissingColon]: {
    severity: ErrorLevel.Error,
    message: 'Missing colon separator',
    data: { format: true }
  },
  [ParseError.MissingQuotation]: {
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character',
    data: { format: false }
  },
  [ParseError.MissingProperty]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property',
    data: { format: true }
  },
  [ParseError.MissingFilter]: {
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character',
    data: { format: true }
  },
  [ParseError.MissingFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter argument',
    data: { format: true }
  },
  [ParseError.MissingFilterSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character',
    data: { format: true }
  },
  [ParseError.MissingNumber]: {
    severity: ErrorLevel.Error,
    message: 'Missing number',
    data: { format: true }
  },
  [ParseError.MissingCondition]: {
    severity: ErrorLevel.Error,
    message: 'Missing conditional value',
    data: { format: true }
  },
  [ParseError.MissingIterationIteree]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteree value',
    data: { format: true }
  },
  [ParseError.MissingIterationArray]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteration value',
    data: { format: true }
  },
  [ParseError.MissingIterationRangeSeperator]: {
    severity: ErrorLevel.Error,
    message: 'Missing interation range seperator',
    data: { format: false }
  },
  [ParseError.InvalidArgument]: {
    severity: ErrorLevel.Error,
    message: 'Invalid argument expressed',
    data: { format: true }
  },
  [ParseError.InvalidDecimalPoint]: {
    severity: ErrorLevel.Error,
    message: 'Hanging decimal point on number',
    data: { format: true }
  },
  [ParseError.InvalidName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed',
    data: { format: true }
  },
  [ParseError.InvalidTagName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag name',
    data: { format: false }
  },
  [ParseError.InvalidObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed',
    data: { format: false }
  },
  [ParseError.InvalidProperty]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property',
    data: { format: true }
  },
  [ParseError.InvalidPropertyNotation]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character',
    data: { format: true }
  },
  [ParseError.InvalidCharacter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid character',
    data: { format: true }
  },
  [ParseError.InvalidCharacters]: {
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word',
    data: { format: true }
  },
  [ParseError.InvalidFilter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter',
    data: { format: true }
  },
  [ParseError.InvalidSyntactic]: {
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement',
    data: { format: false }
  },
  [ParseError.InvalidPlacement]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement',
    data: { format: false }
  },
  [ParseError.InvalidOperator]: {
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence',
    data: { format: true }
  },
  [ParseError.InvalidIterationType]: {
    severity: ErrorLevel.Warning,
    message: 'Value is not an array type and cannot be iterated',
    data: { format: true }
  },
  [ParseError.InvalidIterationParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Iteration parameter is not valid',
    data: { format: true }
  },
  [ParseError.RejectString]: {
    severity: ErrorLevel.Error,
    message: 'String value not accepted',
    data: { format: true }
  },
  [ParseError.RejectNumber]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: { format: true }
  },
  [ParseError.RejectItereeTypeValue]: {
    severity: ErrorLevel.Error,
    message: 'Iteree value must be a keyword',
    data: { format: true }
  },
  [ParseError.RejectInteger]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: { format: true }
  },
  [ParseError.RejectBoolean]: {
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted',
    data: { format: true }
  },
  [ParseError.RejectArray]: {
    severity: ErrorLevel.Error,
    message: 'Array value not accepted',
    data: { format: true }
  },
  [ParseError.RejectObject]: {
    severity: ErrorLevel.Error,
    message: 'Object value not accepted',
    data: { format: true }
  },
  [ParseError.RejectProperty]: {
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object',
    data: { format: true }
  },
  [ParseError.RejectParameters]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters',
    data: { format: true }
  },
  [ParseError.RejectFilterArguments]: {
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments',
    data: { format: true }
  },
  [ParseError.RejectWhitespace]: {
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters',
    data: { format: true }
  },
  [ParseError.RejectWhitespaceControl]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips',
    data: { format: true }
  },
  [ParseError.RequireFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'An argument is required by the filter',
    data: { format: true }
  },
  [ParseError.WarnWhitespace]: {
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected',
    data: { format: true }
  },
  [ParseError.UnknownFilterArgumentParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown filter argument parameter',
    data: { format: true }
  },
  [ParseError.UnknownProperty]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown property value',
    data: { format: true }
  }
};
