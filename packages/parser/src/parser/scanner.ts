import * as spec from '@liquify/liquid-language-specs';
import { Types } from '@liquify/liquid-language-specs';
import { TokenType } from 'lexical/tokens';
import { ScanState, ScanCache } from 'lexical/state';
import { ParseError } from 'lexical/errors';
import * as s from 'parser/stream';
import * as r from 'lexical/expressions';
import * as c from 'lexical/characters';

/* -------------------------------------------- */
/* EXPORT SCOPE                                 */
/* -------------------------------------------- */

/**
 * Start Position
 *
 * The starting position index of each tag,
 * this is reset every time we encounter an
 * open delimiter match
 */
export let begin: number;

/**
 * Token
 *
 * Holds the current token record we are scanning
 * and is used to keep track of the token we are within
 */
export let token: number;

/**
 * Error Number
 *
 * Parsing errors, holds value of the parse errors
 * encountered while scanning tags.
 */
export let error: number;

/* -------------------------------------------- */
/* LOCAL SCOPE                                  */
/* -------------------------------------------- */

/**
 * Cache
 *
 * Can hold any value, is used as a cache
 * and its value may represent anything within
 * the stream.
 */
let cache: number = ScanCache.Reset;

/**
 * Scan State
 *
 * The state at which the scan is processing. This
 * changes each time we come across characters important
 * in the sequence.
 */
let state: number = ScanState.CharSeq;

/**
 * Pairs
 *
 * Holds a number value and used to count start
 * and end characters, eg: []
 */
let pairs: number[] = [];

/**
 * Runs document scan
 *
 * @param {number} [offset=0]
 * The position offset from which to start scanning
 */
export function scan (start: number = 0): number {

  // Fast Forward to specified offset
  if (start > 0) s.Jump(start);

  // End of Stream
  if (s.size <= s.offset) return TokenType.EOS;

  return state === ScanState.CharSeq ? CharSeq() : Scan();

};

/**
 * Character Sequencing
 *
 * Advances source to delimiter start characters.
 * Sequence will capture HTML or Liquid characters.
 *
 * @returns {number}
 */
function CharSeq (): number {

  // Reset Liquid comment trackers
  if (cache === TokenType.Comment) {
    if (s.ConsumeUntil(r.CommentTagEnd)) {
      cache = ScanCache.Reset;
    }
  }

  // Search until we hit a character of interest
  s.UntilSequence(r.Delimiters);

  // Liquid opening tag delimiter, eg: {{ or {%
  if (s.IsCodeChar(c.LCB)) {
    if (s.IsRegExp(r.DelimitersOpen)) return LiquidSeq();
  }

  // HTML closing tag delimiter, eg: >
  if (s.IsCodeChar(c.RAN)) {
    if (token === TokenType.HTMLVoidTagOpen || token === TokenType.HTMLStartTagOpen) {
      state = ScanState.HTMLTagClose;
      return Scan();
    }
  }

  // HTML starting delimiter character, eg: <
  if (s.IsCodeChar(c.LAN)) return HTMLSeq();

  // Reset state if not CharSeq, lets continue sequencing...
  if (state !== ScanState.CharSeq) state = ScanState.CharSeq;

  // Skip all whitespacing (including newlines)
  s.SkipWhitespace();

  // Increment the position
  s.Advance(1);

}

/**
 * HTML Sequencing
 *
 * Handles HTML Delimiters and dispatches to
 * appropriate scanner.
 */
function HTMLSeq (): number {

  // Assert Start position of token
  begin = s.cursor;

  s.Advance(1);

  // Character is a forward slash and proceeded by no whitespace, eg: `</`
  if (s.IfCodeChar(c.FWS)) {

    // Check we have a tag name, do not conumse though, eg: `</tag`
    if (s.IfRegExp(r.HTMLTagEndName)) {
      state = ScanState.AfterHTMLEndTagName;
      return TokenType.HTMLEndTagOpen;
    }
  }

  // We are within a HTML start tag, eg: <^tag
  if (s.IfRegExp(r.HTMLTagName)) {

    state = ScanState.HTMLAttributeName;

    // We record this token
    token = s.TokenContains(r.HTMLVoidTags)
      ? TokenType.HTMLVoidTagOpen
      : TokenType.HTMLStartTagOpen;

    return token;

  }

  return CharSeq();

}

function LiquidSeq () {

  // Assert Start position of token
  begin = s.offset;

  if (!s.IfCodeChar(c.LCB)) return CharSeq();

  // Liquid output type delimiter, eg: {{ or {{-
  if (s.IfCodeChar(c.LCB)) {
    state = ScanState.AfterOutputTagOpen;
    return TokenType.OutputTagOpen;
  }

  // Liquid tag delimiter, eg: {% or {%-
  if (s.IfCodeChar(c.PER)) {

    // Lets peek ahead to see if we are dealing with an {% end %}
    // type tag, but we will not consume, just check
    if (s.IsRegExp(r.TagEnder)) {

      // Skip over whitespace
      s.SkipWhitespace();

      // Lets consume the "end" portion of the name, eg: {%- end^tag
      // We have already confirmed this exists in CharSeq
      // We do not returns a token type, we do this at next run
      if (s.IfRegExp(r.KeywordEnd)) {

        // Lets consume the end tag name identifier, eg: {%- endtag^
        if (s.IfRegExp(r.KeywordAlpha)) {
          state = ScanState.BeforeEndTagClose;
          return TokenType.EndTagOpen;
        }

        // If we get here, we have an invalid end tag name
        error = ParseError.InvalidTagName;
        state = ScanState.ParseError;
        return Scan();
      }
    }

    // Getting here then we dealing with a start or singular type tag
    state = ScanState.AfterTagOpen;
    return TokenType.TagOpen;

  }

}

/**
 * Scannner
 *
 * Liquid c.language syntax tokenizer Scan.
 * TokenType enums are returned
 */
function Scan (): number {

  // Capture whitespace
  if (s.Whitespace()) return TokenType.Whitespace;

  // Capture newlines
  if (s.Newlines()) return TokenType.Newline;

  switch (state) {

    /* -------------------------------------------- */
    /* HTML LIQUID ATTRIBUTES                       */
    /* -------------------------------------------- */
    case ScanState.HTMLLiquidAttribute: return LiquidSeq();

    /* -------------------------------------------- */
    /* HTML ATTRIBUTE NAME                          */
    /* -------------------------------------------- */
    case ScanState.HTMLAttributeName:

      // We have an attribute value on the tag, eg: `<script src^`
      if (s.IfRegExp(r.HTMLAttributeName)) {
        state = ScanState.HTMLAttributeOperator;
        return TokenType.HTMLAttributeName;
      }

      // We have a Liquid attribute value, we parse the delimiters
      if (s.IsRegExp(r.DelimitersOpen)) {
        state = ScanState.HTMLLiquidAttribute;
        return TokenType.HTMLLiquidAttribute;
      }

      // Next scan we will pass back to CharSeq
      state = ScanState.HTMLTagClose;
      return Scan();

    /* -------------------------------------------- */
    /* HTML TAG CLOSE                               */
    /* -------------------------------------------- */
    case ScanState.HTMLTagClose:

      // We have a closing delimiter
      // Handle self closing void type tags, eg: `<tag />`
      if (s.IfCodeChar(c.RAN) || s.IfRegExp(r.HTMLSelfClose)) {

        state = ScanState.CharSeq;
        token = token === TokenType.HTMLVoidTagOpen
          ? TokenType.HTMLVoidTagClose
          : TokenType.HTMLStartTagClose;

        return token; // Return a start tag close
      }

      // If we get here we are missing a closing delimiter
      error = ParseError.MissingCloseDelimiter;
      state = ScanState.CharSeq;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* HTML ATTRIBUTE OPERATOR                      */
    /* -------------------------------------------- */
    case ScanState.HTMLAttributeOperator:

      if (s.IfCodeChar(c.EQS)) {
        state = ScanState.HTMLAttributeValue;
        return TokenType.HTMLOperatorValue;
      }

      state = ScanState.HTMLAttributeName;
      return Scan();

    /* -------------------------------------------- */
    /* HTML ATTRIBUTE NAME                          */
    /* -------------------------------------------- */
    case ScanState.HTMLAttributeValue:

      state = ScanState.HTMLAttributeName;

      // Capture HTML string attribute value
      // Handle attributes that are not using quotations, eg: <tag attr=foo
      if (s.IsRegExp(r.StringQuotations)) {

        // Skip the string, Liquid tags nested within will also be skipped
        if (s.SkipQuotedString(true)) return TokenType.HTMLAttributeValue;

        // We have a missing quotation character, eg: "something
        error = ParseError.MissingQuotation;
        return TokenType.ParseError;
      }

      return Scan();

    /* -------------------------------------------- */
    /* HTML END TAG NAME                            */
    /* -------------------------------------------- */
    case ScanState.AfterHTMLEndTagName:

      state = ScanState.CharSeq;

      if (s.IfCodeChar(c.RAN)) {
        token = undefined;
        return TokenType.HTMLEndTagClose;
      };

      // Assert an error if missing close tag delimiter detected
      error = ParseError.MissingCloseDelimiter;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID TAG OPENINGS                          */
    /* -------------------------------------------- */
    case ScanState.AfterTagOpen:
    case ScanState.AfterOutputTagOpen:

      // Consume the left side trim dash, eg: {{-^ or {%-^
      if (s.IfCodeChar(c.DSH)) return TokenType.TrimDashLeft;

      // Before output tag name, eg: {{- ^name
      if (state === ScanState.AfterOutputTagOpen) {
        state = ScanState.BeforeOutputTagName;
        return Scan();
      }

      // Before start or singular tag name, eg: {%- ^tag
      state = ScanState.BeforeTagName;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID END TAG NAME                          */
    /* -------------------------------------------- */
    case ScanState.BeforeEndTagName:

      // Lets consume the end tag name identifier, eg: {%- endtag^
      if (s.IfRegExp(r.KeywordAlpha)) {
        state = ScanState.BeforeEndTagClose;
        return TokenType.EndTagName;
      }

      // If we get here, we have an invalid end tag name
      error = ParseError.InvalidTagName;
      state = ScanState.ParseError;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID OUTPUT TAG NAME                       */
    /* -------------------------------------------- */
    case ScanState.BeforeOutputTagName:

      /* STRING OUTPUT TAG -------------------------- */

      // Output tag name as a string, eg: {{ 'value' }}
      if (s.IsRegExp(r.StringQuotations)) {

        // Capture the string token value, eg: 'value' or "value"
        if (s.SkipQuotedString(true)) {
          state = ScanState.Filter;
          return TokenType.OutputTagName;
        }

        // If we get here, string is missing a quotation, eg: {{ 'value^
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      /* NUMBER OUTPUT TAG -------------------------- */

      // Output tag name as an integer or float, eg: {{ 100 }}
      if (s.IfRegExp(r.Number)) {
        state = ScanState.Filter;
        return TokenType.Number;
      }

      /* OBJECT OUTPUT TAG -------------------------- */

      // Output tag name as a variable or object, eg: {{ name }}
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Match captured token with a cursor value
        if (spec.object(s.token) || s.IsRegExp(r.PropertyNotation)) {
          state = ScanState.Object;
          return TokenType.ObjectTagName;
        }

        // Close the token if path is clear, eg: {{ name ^ }}
        state = s.IsRegExp(r.TagCloseClear)
          ? ScanState.BeforeOutputTagClose
          : ScanState.Filter;

        return TokenType.OutputTagName;

      }

      // Ensure we have cleared closing path on the tag
      if (s.IsRegExp(r.TagCloseClear)) {
        error = ParseError.MissingTagName;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here, invalid output name has be intercepted
      // This is going to be because the name has invalid characters
      error = ParseError.InvalidCharacter;
      state = ScanState.ParseError;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID START OR SINGULAR TAG NAME            */
    /* -------------------------------------------- */
    case ScanState.BeforeTagName:

      // Lets consume the tag name identifier and then consult our
      // specification to determine the type of tag we are dealing with
      if (s.IfRegExp(r.KeywordAlpha)) {

        // Lets update our specification cursor
        spec.tag(s.token);

        // When no spec exists for the tag, this is an unknown tag
        if (!spec.cursor.tag) {
          state = ScanState.GotoTagEnd;
          return TokenType.Unknown;
        }

        /* COMMENT TYPE ------------------------------- */

        // Comment type tags, eg: {% comment %}
        if (spec.typeofTag(Types.Tag.comment)) {
          state = ScanState.GotoTagEnd;
          cache = TokenType.Comment;
          return cache;
        }

        /* VARIABLE TYPE ------------------------------ */

        // Control type tags, eg: {% assign %} or {% capture %}
        if (spec.typeofTag(Types.Tag.variable)) {

          state = ScanState.VariableIdentifier;

          return spec.cursor.tag?.singular
            ? TokenType.SingularTagName
            : TokenType.StartTagName;

        }

        /* CONTROL TYPE ------------------------------- */

        // Control type tags, eg: {% if %} or {% unless %}
        if (spec.typeofTag(Types.Tag.control)) {
          state = ScanState.Control;
          return TokenType.StartTagName;
        }

        /* EMBEDDED TYPE ------------------------------ */

        // Embedded language type tags, eg: {% schema %}
        if (spec.typeofTag(Types.Tag.embedded)) {
          state = ScanState.EmbeddedLanguage;
          return TokenType.StartTagName;
        }

        /* ITERATION TYPE ----------------------------- */

        // Iteration type tags, eg: {% for %}
        if (spec.typeofTag(Types.Tag.iteration)) {
          state = ScanState.Iteration;
          return TokenType.StartTagName;
        }

        /* UNKNOWN TYPE ------------------------------- */

        state = ScanState.GotoTagEnd;
        return TokenType.Unknown;
      }

      // If we get here we have a missing tag name, eg {% ^ %}
      if (s.IsRegExp(r.TagCloseClear)) {
        error = ParseError.MissingTagName;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here an invalid tag name has be intercepted
      // This is going to be because the tag name has invalid characters
      error = ParseError.InvalidCharacter;
      state = ScanState.ParseError;

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID OBJECT                                */
    /* -------------------------------------------- */
    case ScanState.Object:

      if (error === ParseError.UnknownProperty) error = undefined;

      // Object property dot, eg: object.
      if (s.IfCodeChar(c.DOT)) {

        // If object is not of type object, then no properties should exist
        state = ScanState.ObjectDotNotation;
        return TokenType.ObjectDotNotation;
      }

      // Object property bracket notation, eg: object[
      if (s.IfCodeChar(c.LOB)) {

        // Track start and end brackets
        pairs.push(s.offset);

        state = ScanState.ObjectBracketNotation;
        return TokenType.ObjectBracketNotationOpen;
      }

      // We have bracket notation end character, eg: ]
      if (s.IfCodeChar(c.ROB)) {

        if (pairs.length === 0) {
          error = ParseError.InvalidCharacter;
          return TokenType.ParseError;
        }

        pairs.pop(); // We have a pair, remove previous LOB offset location
        state = ScanState.Object;
        return TokenType.ObjectBracketNotationClose;
      }

      // Handle unterminated brackets, eg: {{ object['prop'^ }}
      if (pairs.length > 0) {

        // Rewind token to unclosed LOB and capture error
        s.TokenRewind(pairs.shift(), r.PropertyBrackets);

        if (error !== ParseError.MissingProperty) {
          pairs = []; // Clear the pairs array
          error = ParseError.MissingBracketNotation;
          return TokenType.ParseError;
        }
      }

      // If cache holds a filter reference, we refer to it in the next scan
      if (cache === ScanState.FilterSeparator) {
        cache = ScanCache.Reset;
        state = ScanState.FilterSeparator;
        return Scan();
      }

      // Lets look for filters pipes, eg: {{ tag | }}
      if (s.IsCodeChar(c.PIP)) {
        state = ScanState.Filter;
        return Scan();
      }

      // If cache reference exists, we will refer to it, else we close the tag
      state = cache !== ScanCache.Reset ? cache : ScanState.TagClose;

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID OBJECT DOT NOTATION                   */
    /* -------------------------------------------- */
    case ScanState.ObjectDotNotation:

      // Gets property value on object, eg: "prop" in "object.prop"
      if (s.IfRegExp(r.PropertyValue)) {

        state = ScanState.Object;

        return TokenType.ObjectProperty;
        // Validate the property against the specification
        // if (spec.propofObject(s.token)) return TokenType.ObjectProperty;

        // When we get here the spec has no knowledge of the object
        // error = ParseError.UnknownProperty;
        // return TokenType.ParseError;
      }

      // Check if an extra dot character was expressed, eg: {{ object.. }}
      if (s.IsCodeChar(c.DOT)) {
        error = ParseError.InvalidCharacter;
        state = ScanState.ParseError;
      }

      // If we get here, the object property is invalid
      error = ParseError.InvalidProperty;
      state = ScanState.Object;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID OBJECT BRACKET NOTATION               */
    /* -------------------------------------------- */
    case ScanState.ObjectBracketNotation:

      // Check to see we no empty bracket notations, eg: []
      if (s.IsCodeChar(c.ROB) && s.TokenCodeChar(c.LOB, false)) {

        // We advance 1 step and also tokenize for error diagnostic
        s.Advance(1, true);

        error = ParseError.MissingProperty;
        state = ScanState.Object;
        return TokenType.ParseError;
      }

      // Capture string object property, eg: object["prop"]
      if (s.SkipQuotedString(true)) {

        // Detect an empty property string value, eg: "" or "   "
        if (s.TokenContains(r.Whitespace)) {

          s.Advance(1); // Advance 1 step to align cursor and tokenize
          error = ParseError.MissingProperty;
          state = ScanState.Object;
          return TokenType.ParseError;
        }

        // Validate the property against the specification
        if (!spec.propofObject(s.token)) {
          error = ParseError.UnknownProperty;
          state = ScanState.Object;
          return TokenType.ParseError;
        }

        // Next character should be closing bracket notation, eg ]
        state = ScanState.ObjectBracketNotationEnd;
        return TokenType.ObjectProperty;
      }

      // We have a missing quotation character, eg: "prop
      if (s.IsPrevRegExp(r.StringQuotations)) {

        s.Advance(1); // Advance 1 step to align cursor and tokenize

        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // Property is a number value, eg: object.prop[0]
      if (s.IfRegExp(r.Digit)) {

        state = ScanState.ObjectBracketNotationEnd;

        // Next character should be closing bracket notation, eg ]
        if (spec.typeofObject(Types.Basic.array)) {
          return TokenType.ObjectPropertyNumber;
        }

        error = ParseError.RejectArray;
        return TokenType.ParseError;
      }

      // Capture inner variable or object reference, eg: object[variable]
      if (s.IfRegExp(r.PropertyValue)) {
        state = ScanState.Object; // Pass back to object scan and look for properties
        return TokenType.ObjectProperty;
      }

      // If we get here, property is invalid
      error = ParseError.InvalidProperty;
      state = ScanState.ParseError;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID OBJECT BRACKET NOTATION END           */
    /* -------------------------------------------- */
    case ScanState.ObjectBracketNotationEnd:

      // We will attempt to close the right side bracket notation
      if (s.IfCodeChar(c.ROB)) {

        if (pairs.length === 0) {
          error = ParseError.InvalidCharacter;
          return TokenType.ParseError;
        }

        //  Have pair, remove previous LOB position
        pairs.pop();

        state = ScanState.Object;
        return TokenType.ObjectBracketNotationClose;
      }

      // If we get here, there is a missing bracket, eg: object["prop"
      error = ParseError.MissingBracketNotation;
      state = ScanState.Object;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER                                */
    /* -------------------------------------------- */
    case ScanState.Filter:

      // Tag has a pipe separator, we will look for a filter
      if (s.IfCodeChar(c.PIP)) {
        state = ScanState.FilterIdentifier;
        return TokenType.Filter;
      }

      // Attempt to close tag, we are here: {{ tag | filter^ }}
      state = ScanState.TagClose;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID FILTER IDENTIFIER                     */
    /* -------------------------------------------- */
    case ScanState.FilterIdentifier:

      // Filter identifier, lets capture, eg: {{ tag | ^filter }}
      if (s.IfRegExp(r.KeywordAlpha)) {

        // Find specification for this filter
        spec.filter(s.token);

        // We are dealing with an unknown filter, consume token
        if (!spec.cursor.filter) {
          error = ParseError.InvalidFilter;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }

        // Next scan we will look for color operator, eg: {{ tag | filter^:}}
        state = ScanState.FilterOperator;
        return TokenType.FilterIdentifier;
      }

      // If we get here, its an empty filter expression, eg: {{ tag | }}
      error = ParseError.MissingFilterArgument;
      state = ScanState.Filter;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER OPERATOR COLON                 */
    /* -------------------------------------------- */
    case ScanState.FilterOperator:

      // Check the next token is a colon
      if (s.IsCodeChar(c.COL)) {

        // If spec exists and arguments do not exist, throw an error
        if (!spec.cursor.argument) {
          error = ParseError.RejectFilterArguments;
          state = ScanState.Filter;
          return TokenType.ParseError;
        }
      }

      // Lets consume the colon operator, eg: {{ tag | filter:^ }}
      if (s.IfCodeChar(c.COL)) {
        state = ScanState.FilterArgument;
        return TokenType.FilterOperator;
      }

      // Filter contains no arguments
      if (!spec.cursor.argument) {
        state = ScanState.Filter;
        return Scan();
      }

      // We are missing a colon separator, eg: {{ tag | append^ }}
      error = ParseError.MissingColon;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER ARGUMENT                       */
    /* -------------------------------------------- */
    case ScanState.FilterArgument:

      // Capture an argument expressed as a string
      if (s.SkipQuotedString(true)) {

        // Filter Parameter
        if (cache === ScanState.FilterParameter) {
          cache = TokenType.String;
          state = ScanState.FilterParameterArgument;
          return Scan();
        }

        // Make sure filter argument accepts a string
        if (spec.typeofArgument(Types.Basic.string)) {

          if (spec.argument.isValue(s.token)) {
            state = ScanState.FilterSeparator;
            return TokenType.FilterArgument;
          };

          error = ParseError.InvalidArgument;
          state = ScanState.FilterSeparator;
          return TokenType.ParseError;
        }

        // If we get here, the filter argument does not accept string type
        error = ParseError.RejectString;
        state = ScanState.FilterSeparator;
        return TokenType.ParseError;
      }

      // We have a missing quotation character, eg: "argument
      if (s.IsPrevRegExp(r.StringQuotations)) {
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // Capture normal expression integer
      if (s.IfRegExp(r.Integer)) {

        // Filter Parameter
        if (cache === ScanState.FilterParameter) {
          cache = TokenType.Integer;
          state = ScanState.FilterParameterArgument;
          return Scan();
        }

        // Filter argument accepts number, eg: {{ tag | filter: 10 }}
        if (spec.typeofArgument(Types.Basic.number)) {
          state = ScanState.FilterSeparator;
          return TokenType.Integer;
        }

        error = ParseError.RejectNumber;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // Capture float expression numbers
      if (s.IfRegExp(r.Float)) {
        if (spec.typeofArgument(Types.Basic.number)) {

          // Ensure number is not missing decimal
          if (s.IfCodeChar(c.DOT)) {
            error = ParseError.MissingNumber;
            return TokenType.ParseError;
          }

          state = ScanState.FilterSeparator;
          return TokenType.Float;
        }

        error = ParseError.RejectInteger;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // Check for boolean argument values
      if (s.IfRegExp(r.Boolean)) {

        // Filter Parameter
        if (cache === ScanState.FilterParameter) {
          cache = TokenType.Boolean;
          state = ScanState.FilterParameterArgument;
          return Scan();
        }

        // Ensure the argument accepts a boolean value
        if (spec.typeofArgument(Types.Basic.boolean)) {
          state = ScanState.FilterSeparator;
          return TokenType.Boolean;
        }

        // If filter does not accept boolean value
        error = ParseError.RejectBoolean;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here, we will have either a variable or reference
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Check to to see if we are dealing with an object
        if (spec.object(s.token) || s.IsRegExp(r.PropertyNotation)) {

          // Next call we will look for a property notation
          cache = ScanState.FilterSeparator;
          state = ScanState.Object;
          return TokenType.ObjectTagName;
        }

        state = ScanState.FilterSeparator;
        return TokenType.Variable;
      }

      // Missing filter argument, eg: {{ tag | filter: ^ }}
      if (spec.cursor?.argument?.required) {

        // If current stream token is comma value, consume it
        if (s.TokenCodeChar(c.COM)) s.Cursor();

        error = ParseError.MissingFilterArgument;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // Align the cursor with offset
      s.Cursor();

      cache = ScanCache.Reset;
      error = ParseError.InvalidCharacter;
      state = ScanState.ParseError;

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID FILTER ARGUMENT SEPARATOR             */
    /* -------------------------------------------- */
    case ScanState.FilterSeparator:

      // Move to the next argument in the spec
      if (spec.argument.next()) {

        // We have a comma separator character, lets proceed
        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterArgument;
          return TokenType.Separator;
        }

        // If the argument is required according to spec but
        // no comma seperator was intercepted we have an error.
        if (spec.cursor.argument?.required) {

          // Arguments must be seperated by comma characters
          // We need to align the cursor for diagnostics
          s.Cursor(NaN);
          s.SkipWhitespace();

          error = ParseError.MissingFilterSeparator;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }
      }

      // We have another filter value, eg: {{ tag | upcase ^| }}
      if (s.IfCodeChar(c.PIP)) {
        state = ScanState.FilterIdentifier;
        return TokenType.Filter;
      }

      // Check if the filter argument accepts parameters
      if (spec.argument.param) {
        if (s.IfCodeChar(c.COM) || s.IsCodeChar(c.COL)) {
          state = ScanState.FilterParameter;
          return Scan();
        }
      }

      // Ensure we have a clear closing path, eg: {{ tag | filter ^ }}
      if (s.IfRegExp(r.TagCloseClear)) {
        state = ScanState.GotoTagEnd;
        return TokenType.FilterEnd;
      }

      if (s.IfCodeChar(c.COM)) {
        state = ScanState.FilterArgument;
        return Scan();
      }

      // We have invalid characters, eg: {{ tag | filter ^# }}
      error = ParseError.InvalidCharacter;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER PARAMETER                      */
    /* -------------------------------------------- */
    case ScanState.FilterParameter:

      // Consume the parameter name, eg: {{ tag | filter: param^: }}
      if (s.IfRegExp(r.KeywordAlpha)) {

        // Validate that the parameter is unique
        if (!spec.argument.isParamUnique(s.token)) {
          error = ParseError.DuplicatedParameters;
          return TokenType.ParseError;
        }

        // No spacing between parameter and colon, eg: {{ tag | filter ^ : }}
        if (s.SkipWhitespace()) {
          s.Cursor(); // Align the cursor with offset
          error = ParseError.RejectWhitespace;
          return TokenType.ParseError;
        }
      }

      // Parameters must contain a colon character
      if (s.IfCodeChar(c.COL, false)) {

        state = ScanState.FilterArgument;
        cache = ScanState.FilterParameter;

        if (spec.argument.isParamProp(s.token)) return Scan();

      }

      // Missing a colon separator, eg: {{ tag | filter: param^ }}
      error = ParseError.MissingColon;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER PARAMETER ARGUMENT             */
    /* -------------------------------------------- */
    case ScanState.FilterParameterArgument:

      // Next scan we will look for argument seperator
      state = ScanState.FilterSeparator;

      // Validate the intercepted value against the specification
      if (!spec.argument.isParamValue(s.token)) {
        error = ParseError.InvalidArgument;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If filter argument parameter was a string
      if (cache === TokenType.String) {

        cache = ScanCache.Reset;

        // Ensure the intercepted value is the correct type
        if (!spec.argument.isParamValueType(Types.Basic.string)) {
          error = ParseError.RejectString;
          return TokenType.ParseError;
        }

        // Scan for additional arguments
        return TokenType.FilterArgument;
      }

      // If filter argument parameter was an integer
      if (cache === TokenType.Integer) {

        cache = ScanCache.Reset;

        // Ensure the intercepted value is the correct type
        if (!spec.argument.isParamValueType(Types.Basic.number)) {
          error = ParseError.RejectNumber;
          return TokenType.ParseError;
        }

        // Scan for additional arguments
        return TokenType.FilterArgument;
      }

      // If filter argument parameter was an boolean
      if (cache === TokenType.Boolean) {

        cache = ScanCache.Reset;

        if (!spec.argument.isParamValueType(Types.Basic.boolean)) {
          error = ParseError.RejectBoolean;
          return TokenType.ParseError;
        }

        // Scan for additional arguments
        return TokenType.FilterArgument;
      }

      break;

    /* -------------------------------------------- */
    /* LIQUID CONTROL TAG                           */
    /* -------------------------------------------- */
    case ScanState.Control:

      // Make sure the control tag is not empty, eg: {% if ^ %}
      if (s.IsRegExp(r.TagCloseClear)) {
        state = ScanState.GotoTagEnd;
        error = ParseError.MissingCondition;
        return TokenType.ParseError;
      }

      // Lets progress forward and check condition
      state = ScanState.ControlCondition;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID CONTROL CONDITION                     */
    /* -------------------------------------------- */
    case ScanState.ControlCondition:

      /* NUMBER CONDITION --------------------------- */

      // Condition is a integer or float number value, eg: {% if 100 %}
      if (s.IfRegExp(r.Number)) {
        state = ScanState.ControlOperator;
        return TokenType.ControlCondition;
      }

      /* STRING CONDITION --------------------------- */

      // Condition is a string value, eg: {% if 'foo' %}
      if (s.IsRegExp(r.StringQuotations)) {

        // If the condition value is a valid string
        if (s.SkipQuotedString()) {
          state = ScanState.ControlOperator;
          return TokenType.String;
        }

        // We have a missing quotation character, eg: {% "prop
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      /* BOOLEAN CONDITION -------------------------- */

      // Lets check for boolean condition, eg {% if foo == true %}
      if (s.IfRegExp(r.Boolean)) {
        state = ScanState.ControlOperator;
        return TokenType.Boolean;
      }

      /* ALPHANUMERIC ------------------------------- */

      // Lets check for a reference variable name or object
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Lets consult the specification to see if we know about the value
        // If we know about the value, we will validate it accordingly
        if (spec.object(s.token)) {

          // We have set the specification, lets now determine
          // if the value contains object notation and proceed accordingly
          if (s.IsRegExp(r.PropertyNotation)) {
            cache = ScanState.ControlOperator;
            state = ScanState.Object;
            return TokenType.Object;
          }

          // If we get here, lets check for operators as the provided
          // value contains no object notations, its likely a variable
          state = ScanState.ControlOperator;
          return TokenType.Object;
        }

        // TODO: HANDLE UNKNOWN OBJECTS

        // When we get here, the spec does not know about the condition value,
        // So lets  check for an operator
        state = ScanState.ControlOperator;
        return TokenType.Variable;
      }

      // Control tags require end tags, lets assert this
      state = ScanState.BeforeStartTagClose;
      cache = ScanCache.Reset;

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID CONTROL OPERATOR                      */
    /* -------------------------------------------- */
    case ScanState.ControlOperator:

      cache = ScanCache.Reset;

      // Lets validate the control operators provided, eg {% if foo ^== %}
      if (s.IfRegExp(r.OperatorControl)) {

        // Lets ensure that a comparison value was passed proceeding the operators
        if (s.IsRegExp(r.TagCloseClear)) {
          state = ScanState.GotoTagEnd;
          error = ParseError.MissingCondition;
          return TokenType.ParseError;
        }

        // Operators are valid, lets check for another condition
        state = ScanState.ControlCondition;
        return TokenType.ControlOperator;
      }

      // If we get here no further conditions or comparison values
      // Lets now attempt to close the tag and ensure we have a clearance
      if (s.IsRegExp(r.TagCloseClear)) {
        state = ScanState.BeforeStartTagClose;
        return Scan();
      }

      // If we get we have an invalid operator sequence
      error = ParseError.InvalidOperator;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID VARIABLE IDENTIFIER TAG               */
    /* -------------------------------------------- */
    case ScanState.VariableIdentifier:

      // We will consume the variable keyword identifier, eg: {% assing var^ %}
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        if (s.TokenContains(r.Digit)) {
          error = ParseError.InvalidName;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }

        // Assign tags accept filters, which mean its not a `capture``
        // Pass to the operator scan
        if (spec.cursor.tag?.filters) {
          state = ScanState.VariableOperator;
          return Scan();
        }

        // TODO: HANDLE CAPTURES
        cache = ScanState.BeforeSingularTagClose;
        state = ScanState.GotoTagEnd;
        return TokenType.VariableKeyword;

      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID VARIABLE OPERATOR                     */
    /* -------------------------------------------- */
    case ScanState.VariableOperator:

      // If the variable requires an operator character, we consume
      if (s.IfCodeChar(c.EQS)) {
        state = ScanState.VariableAssignment;
        return TokenType.VariableKeyword;
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidOperator;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID VARIABLE ASSIGNMENT                   */
    /* -------------------------------------------- */
    case ScanState.VariableAssignment:

      state = ScanState.Filter;

      if (s.IsRegExp(r.StringQuotations)) {

        if (s.SkipQuotedString(true)) return TokenType.String;

        error = ParseError.MissingQuotation;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) return TokenType.VariableKeyword;

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION TAGS                        */
    /* -------------------------------------------- */
    case ScanState.Iteration:

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.KeywordAlpha)) {
        state = ScanState.IterationIteree;
        return TokenType.Iteration;
      }

      break;

    case ScanState.IterationIteree:

      state = ScanState.IterationOperator;
      return TokenType.IterationIteree;

    case ScanState.IterationOperator:

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.OperatorIteration)) {
        state = ScanState.IterationArray;
        return Scan();
      }

      break;

    case ScanState.IterationArray:

      if (cache === ScanState.IterationArray) {

        cache = ScanCache.Reset;
        state = ScanState.BeforeStartTagClose;
        return TokenType.IterationArray;

      }

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Check to to see if we are dealing with an object
        if (spec.object(s.token) || s.IsRegExp(r.PropertyNotation)) {

          // Next call we will look for a property notation
          cache = ScanState.IterationArray;
          state = ScanState.Object;
          return TokenType.Object;
        }

        state = ScanState.IterationArray;
        return TokenType.IterationArray;
      }

      if (s.IfCodeChar(c.LOP)) {
        state = ScanState.IterationRangeStart;
        return TokenType.VariableKeyword;
      }

      break;

    case ScanState.IterationRangeStart:

      if (s.IfRegExp(r.Digit)) {
        state = ScanState.IterationRangeSeparators;
        return TokenType.VariableKeyword;
      }

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Check to to see if we are dealing with an object
        if (spec.object(s.token) || s.IsRegExp(r.PropertyNotation)) {

          // Next call we will look for a property notation
          cache = ScanState.IterationRangeSeparators;
          state = ScanState.Object;
          return TokenType.ObjectTagName;
        }

        state = ScanState.IterationArray;
        return TokenType.VariableKeyword;
      }

      break;
    case ScanState.IterationRangeSeparators:

      if (s.IfCodeChar(c.DOT)) {

        if (s.IfCodeChar(c.DOT)) {
          state = ScanState.IterationRangeStart;
          return TokenType.VariableKeyword;
        }

        error = ParseError.MissingIterationRangeSeperator;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      error = ParseError.InvalidCharacter;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* GOTO TAG END                                 */
    /* -------------------------------------------- */
    case ScanState.GotoTagEnd:

      // We will attempt to move to the end of the tag and prevent
      // consuming any tags that might be otherwise nested within
      if (s.ConsumeUnless(/-?[%}]}/, /{[{%]/, false)) {
        state = ScanState.TagClose;
        return Scan();
      }

      // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

      state = ScanState.CharSeq;
      return CharSeq();

    /* -------------------------------------------- */
    /* PARSE ERROR TAG CONSUMER                     */
    /* -------------------------------------------- */
    case ScanState.ParseError:

      // Consume the token until ending delimiters
      if (s.ConsumeUnless(/-?[%}]}/, /{[{%]/)) {
        state = ScanState.TagClose;
        return cache === ScanCache.GotoEnd ? Scan() : TokenType.ParseError;
      }

      // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

      state = ScanState.CharSeq;
      return CharSeq();

    /* -------------------------------------------- */
    /* CLOSE LIQUID TAG                             */
    /* -------------------------------------------- */
    case ScanState.TagClose:
    case ScanState.BeforeStartTagClose:
    case ScanState.BeforeEndTagClose:
    case ScanState.BeforeOutputTagClose:
    case ScanState.BeforeSingularTagClose:

      // Validate right side trim dash character
      if (s.IfCodeChar(c.DSH)) {

        // Check to see if whitespace proceeds, eg: {{ tag -^ }}
        if (s.SkipWhitespace()) {
          error = ParseError.RejectWhitespace;
          return TokenType.ParseError;
        }

        // We have asserted a trim character is valid
        // Next scan ensures the token is closed
        return TokenType.TrimDashRight;
      }

      // Ensure we can close the tag and no invalid characters exist
      if (!s.IsRegExp(r.DelimitersClose)) {

        // We will consume the invalid character or string
        if (s.ConsumeUnless(/[%}]}/, /{[{%]/)) {

          // Ensure we are reporting plurals to the end user.
          error = s.token?.length === 1
            ? ParseError.InvalidCharacter
            : ParseError.InvalidCharacters;

        } else {

          // If we get here we have missing a closing delimiter, eg: {{ tag^
          state = ScanState.CharSeq;
          error = ParseError.MissingCloseDelimiter;
        }

        return TokenType.ParseError;
      }

      // Tag is closed so we will consume, eg: }} or %}
      if (s.IfRegExp(r.DelimitersClose)) {

        // Reset the cursor spec
        spec.reset();

        // Start tag close, eg: {% tag %}^
        if (state === ScanState.BeforeStartTagClose) {
          state = ScanState.CharSeq;
          return TokenType.StartTagClose;
        }

        // End tag close, eg: {% endtag %}^
        if (state === ScanState.BeforeEndTagClose) {
          state = ScanState.CharSeq;
          return TokenType.EndTagClose;
        }

        // Output tag close, eg: {{ output }}^
        if (state === ScanState.BeforeOutputTagClose) {
          state = ScanState.CharSeq;
          return TokenType.OutputTagClose;
        }

        // Singular tag close, eg: {% singular %}^
        if (state === ScanState.BeforeSingularTagClose) {
          state = ScanState.CharSeq;
          return TokenType.SingularTagClose;
        }
      }

      return CharSeq(); // Fall through, move to character sequence
  }

  return Scan();

}
