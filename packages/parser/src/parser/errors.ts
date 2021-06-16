import { ParseError, ErrorLevel } from 'lexical/errors';
import { Range } from 'vscode-languageserver-textdocument';

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
export const errors = (error = 0, range: Range, offset: number) => ({
  [ParseError.ParsingError]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Parse error',
    data: {
      offset
    }
  },

  [ParseError.MissingTagName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: {
      offset
    }
  },

  [ParseError.MissingTagName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing tag name',
    data: {
      offset
    }
  },
  [ParseError.MissingObjectName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing Object name',
    data: {
      offset
    }
  },
  [ParseError.MissingBracketNotation]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing object property bracket notation',
    data: {
      offset
    }
  },
  [ParseError.MissingStartTag]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing Start tag',
    data: {
      offset
    }
  },
  [ParseError.MissingEndTag]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing end tag',
    data: {
      offset
    }
  },
  [ParseError.MissingOpenDelimiter]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing opening tag delimiter',
    data: {
      offset
    }
  },
  [ParseError.MissingCloseDelimiter]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing closing tag delimiter',
    data: {
      offset
    }
  },
  [ParseError.MissingColon]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing colon separator',
    data: {
      offset
    }
  },
  [ParseError.MissingQuotation]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Malformed string, missing quotation character',
    data: {
      offset
    }
  },
  [ParseError.MissingProperty]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing object property',
    data: {
      offset
    }
  },
  [ParseError.MissingFilter]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing Filter, a filter must follow a pipe character',
    data: {
      offset
    }
  },
  [ParseError.MissingFilterArgument]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing filter argument',
    data: {
      offset
    }
  },
  [ParseError.MissingFilterSeparator]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing filter separator character',
    data: {
      offset
    }
  },
  [ParseError.MissingNumber]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing number',
    data: {
      offset
    }
  },
  [ParseError.MissingCondition]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing conditional value',
    data: {
      offset
    }
  },
  [ParseError.MissingIterationIteree]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing iteree value',
    data: {
      offset
    }
  },
  [ParseError.MissingIterationArray]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Missing iteration value',
    data: {
      offset
    }
  },
  [ParseError.InvalidName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid name value has been expressed',
    data: {
      offset
    }
  },
  [ParseError.InvalidTagName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid tag name',
    data: {
      offset
    }
  },
  [ParseError.InvalidObjectName]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid object name was expressed',
    data: {
      offset
    }
  },
  [ParseError.InvalidProperty]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid Property',
    data: {
      offset
    }
  },
  [ParseError.InvalidPropertyNotation]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid Property Notation, expected "." or "[" character',
    data: {
      offset
    }
  },
  [ParseError.InvalidCharacter]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid character',
    data: {
      offset
    }
  },
  [ParseError.InvalidCharacters]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid characters or word',
    data: {
      offset
    }
  },
  [ParseError.InvalidFilter]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid or unknown filter',
    data: {
      offset
    }
  },
  [ParseError.InvalidSyntactic]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid syntactic tag placement',
    data: {
      offset
    }
  },
  [ParseError.InvalidPlacement]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid tag placement',
    data: {
      offset
    }
  },
  [ParseError.InvalidOperator]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Invalid operator sequence',
    data: {
      offset
    }
  },
  [ParseError.RejectString]: {
    range,
    severity: ErrorLevel.Error,
    message: 'String value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectNumber]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectInteger]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Number value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectBoolean]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Boolean value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectArray]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Array value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectObject]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Object value not accepted',
    data: {
      offset
    }
  },
  [ParseError.RejectProperty]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Property value is not of type object',
    data: {
      offset
    }
  },
  [ParseError.RejectParameters]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Tag does not accept parameters',
    data: {
      offset
    }
  },
  [ParseError.RejectFilterArguments]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Filter does not accept arguments',
    data: {
      offset
    }
  },
  [ParseError.RejectWhitespace]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Extraneous and/or unnecessary spacing characters',
    data: {
      offset
    }
  },
  [ParseError.RejectWhitespaceControl]: {
    range,
    severity: ErrorLevel.Error,
    message: 'Tag does not accept whitespace strips',
    data: {
      offset
    }
  },

  /* -------------------------------------------- */
  /* WARNINGS                                     */
  /* -------------------------------------------- */

  [ParseError.WarnWhitespace]: {
    range,
    severity: ErrorLevel.Warning,
    message: 'Extraneous whitespace detected',
    data: {
      offset
    }
  },

  [ParseError.UnknownProperty]: {
    range,
    severity: ErrorLevel.Warning,
    message: 'Unknown property value expressed',
    data: {
      offset
    }
  }
}[error]);
