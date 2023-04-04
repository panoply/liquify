/* eslint no-unused-vars: "off" */

import { ParseError, ErrorLevel } from './errors';
import type { Diagnostic, Range } from 'vscode-languageserver-types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IDiagnostic extends Omit<Diagnostic, 'range'> {
  range?: Range | {
    start: number,
    end: number
  }
  data?: {
    offset?: number,
    doFormat?: boolean,
    isEmbed?: boolean
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
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.Deprecation]: {
    severity: ErrorLevel.Warning,
    message: 'Deprecated',
    source: 'Liquid HTML Parser',
    data: { doFormat: true }
  },
  [ParseError.DuplicatedHTMLAttributes]: {
    severity: ErrorLevel.Warning,
    message: 'Duplicate attributes defined. Tag attributes should be unique!',
    source: 'Liquid HTML Parser',
    data: { doFormat: true }
  },
  [ParseError.DuplicatedParameters]: {
    severity: ErrorLevel.Error,
    message: 'Duplicate/repeating parameters. Parameters must be unique!',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectFloat]: {
    severity: ErrorLevel.Warning,
    message: 'Number sequence is not an integer.',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectFilters]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    source: 'Liquid Parser',
    data: { doFormat: true }

  },
  [ParseError.ParsingError]: {
    severity: ErrorLevel.Error,
    message: 'Parse error',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingHTMLAttributeValue]: {
    severity: ErrorLevel.Warning,
    message: 'Missing attribute value. This attribute requires a value!',
    source: 'Liquid HTML Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingTagName]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    source: 'Liquid Parser',
    data: { doFormat: false }

  },
  [ParseError.MissingObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Missing Object name',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingBracketNotation]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingStartTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing start tag',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingEndTag]: {
    severity: ErrorLevel.Error,
    message: 'Missing end tag',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingOpenDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingCloseDelimiter]: {
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingColon]: {
    severity: ErrorLevel.Error,
    message: 'Missing colon separator',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingQuotation]: {
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingProperty]: {
    severity: ErrorLevel.Error,
    message: 'Missing object property',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingFilter]: {
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter argument',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingFilterSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingNumber]: {
    severity: ErrorLevel.Error,
    message: 'Missing number',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingCondition]: {
    severity: ErrorLevel.Error,
    message: 'Missing conditional value',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationIteree]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteree value',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationArray]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteration value',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationParameterValue]: {
    severity: ErrorLevel.Error,
    message: 'Missing iteration parameter value',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingArgumentSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag argument separator character',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingIterationRangeSeparator]: {
    severity: ErrorLevel.Error,
    message: 'Missing interation range seperator',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.MissingTagArgument]: {
    severity: ErrorLevel.Error,
    message: 'Missing tag argument',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.MissingWhitespace]: {
    severity: ErrorLevel.Error,
    message: 'Missing whitespace between characters',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidHTMLAttribute]: {
    severity: ErrorLevel.Warning,
    message: 'Invalid attribute expressed. This attribute value belongs on a different tag.',
    source: 'Liquid HTML Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidHTMLAttributeValue]: {
    severity: ErrorLevel.Warning,
    message: 'Invalid attribute value. The value provided to this attribute is invalid',
    source: 'Liquid HTML Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidArgument]: {
    severity: ErrorLevel.Error,
    message: 'Invalid argument expressed',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidNumberRange]: {
    severity: ErrorLevel.Error,
    message: 'Invalid number range provided',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidDecimalPoint]: {
    severity: ErrorLevel.Error,
    message: 'Hanging decimal point on number',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidTagName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag name',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.InvalidObjectName]: {
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.InvalidProperty]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidPropertyNotation]: {
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidCharacter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid character',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidCharacters]: {
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidFilter]: {
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidSyntactic]: {
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.InvalidPlacement]: {
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement',
    source: 'Liquid Parser',
    data: { doFormat: false }
  },
  [ParseError.InvalidOperator]: {
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidIterationType]: {
    severity: ErrorLevel.Warning,
    message: 'Value is not an array type and cannot be iterated',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.InvalidIterationParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Iteration parameter is not valid',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectString]: {
    severity: ErrorLevel.Error,
    message: 'String value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectNumber]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectItereeTypeValue]: {
    severity: ErrorLevel.Error,
    message: 'Iteree value must be a keyword',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectInteger]: {
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectBoolean]: {
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectArray]: {
    severity: ErrorLevel.Error,
    message: 'Array value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectObject]: {
    severity: ErrorLevel.Error,
    message: 'Object value not accepted',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectProperty]: {
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectParameters]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectFilterArguments]: {
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectWhitespace]: {
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RejectWhitespaceControl]: {
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.RequireFilterArgument]: {
    severity: ErrorLevel.Error,
    message: 'An argument is required by the filter',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.WarnWhitespace]: {
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.UnknownFilterArgumentParameter]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown filter argument parameter',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.UnknownObject]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown object',
    source: 'Liquid Parser',
    data: { doFormat: true }
  },
  [ParseError.UnknownProperty]: {
    severity: ErrorLevel.Warning,
    message: 'Unknown property value',
    source: 'Liquid Parser',
    data: { doFormat: true }
  }
};
