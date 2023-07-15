import { $, q, Type, Within, Errors } from '@liquify/specs';
import { TokenType } from '../lexical/tokens';
import { ScanState, ScanCache } from '../lexical/state';
import { ParseError } from '../lexical/errors';
import { CharCode as c } from '../lexical/characters';
import * as r from '../lexical/regex';
import * as s from './stream';

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

/**
 * Object
 *
 * Holds a number value of last known object offset.
 * Used for aligning bracket notation properties.
 */
export let object: number;

/* -------------------------------------------- */
/* LOCAL SCOPE                                  */
/* -------------------------------------------- */

/**
 * Scan State
 *
 * The state at which the scan is processing. This
 * changes each time we come across characters important
 * in the sequence.
 */
let state: number = ScanState.CharSeq;

/**
 * Cache
 *
 * Can hold any value, is used as a cache
 * and its value may represent anything within
 * the stream.
 */
let cache: number = ScanCache.Reset;

/**
 * Ender
 *
 * Holds a reference to the type of tags
 * ending delimeter reference. This is so we
 * can gracefully consume tokens when errors occur
 */
let ender: number = ScanCache.Reset;

/**
 * Pairs
 *
 * Holds a number value and used to count start
 * and end characters, eg: []
 */
export let pairs: number[] = [];

/* -------------------------------------------- */
/* EXPORT FUNCTION                              */
/* -------------------------------------------- */

/**
 * Runs document scan
 *
 * The position offset from which to start scanning
 */
export function scan (start: number = 0): number {

  // Fast Forward to specified offset
  if (start > 0) s.Jump(start);

  // End of Stream
  if (s.size <= s.offset) {

    // Ensure we clear the query engine
    q.reset();

    return TokenType.EOS;

  }

  return state === ScanState.CharSeq ? CharSeq() : Scan();

};

/* -------------------------------------------- */
/* LOCALE FUNCTIONS                             */
/* -------------------------------------------- */

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
    cache = ScanCache.Reset;
    return LiquidSeq();
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

    q.setHTMLTag(s.token);

    state = ScanState.HTMLAttributeName;

    // We record this token
    token = q.isVoid(s.token)
      ? TokenType.HTMLVoidTagOpen
      : TokenType.HTMLStartTagOpen;

    return token;

  }

  return CharSeq();

}

/**
 * Liquid Sequencing
 *
 * Handles Liquid Delimiters and dispatches to
 * appropriate scanner.
 */
function LiquidSeq () {

  // Assert Start position of token
  begin = s.offset;

  if (!s.IfCodeChar(c.LCB)) return CharSeq();

  // Liquid output type delimiter, eg: {{ or {{-
  if (s.IfCodeChar(c.LCB)) {
    state = ScanState.AfterOutputTagOpen;
    ender = ScanState.BeforeOutputTagClose;
    return TokenType.OutputTagOpen;
  }

  // Liquid tag delimiter, eg: {% or {%-
  if (s.IfCodeChar(c.PER)) {

    // Lets peek ahead to see if we are dealing with an {% end %}
    // type tag, but we will not consume, just check
    if (s.IsRegExp(r.TagEnder)) {

      ender = ScanState.BeforeEndTagClose;

      if (s.IfCodeChar(c.DSH)) {

        // Skip over whitespace
        s.SkipWhitespace();

      } else {

        // Skip over whitespace
        s.SkipWhitespace();

      }

      // Skip over whitespace
      s.SkipWhitespace();

      // Lets consume the "end" portion of the name, eg: {%- end^tag
      // We have already confirmed this exists in CharSeq
      // We do not returns a token type, we do this at next run
      if (s.IfRegExp(r.KeywordEnd)) {

        // Lets consume the end tag name identifier, eg: {%- endtag^
        if (s.IfRegExp(r.KeywordAlpha)) {
          state = ScanState.BeforeEndTagClose;
          return TokenType.EndTagName;
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

        if (q.isAttributeUniq(s.token)) {

          if (q.isAttribute(s.token)) {
            return TokenType.HTMLAttributeName;
          }

          error = ParseError.InvalidHTMLAttribute;
          return TokenType.ParseError;
        }

        error = ParseError.DuplicatedHTMLAttributes;
        return TokenType.ParseError;
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
        // We are seeking an incomplete string so we can validate
        if (!s.SkipQuotedString(true)) {

          // We have a missing quotation character, eg: "something
          error = ParseError.MissingQuotation;
          return TokenType.ParseError;
        }

        // If we get here, string was successfully consumed, no errros
        // Lets check if the attribute value is a liquid tag or text value
        if (!s.TokenContains(r.DelimitersOpen, true)) {

          // Attribute value is not a liquid tag, lets see if its accepted.
          if (!q.isAttributeValue(s.token)) {
            error = ParseError.InvalidHTMLAttributeValue;
            return TokenType.ParseError;
          }
        }

        return TokenType.HTMLAttributeValue;

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

        state = ScanState.Object;

        // Match captured token with a cursor value
        if (q.setObject(s.token)) {
          return TokenType.ObjectTagName;
        } else {
          error = ParseError.UnknownObject;
        }

        if (s.IsRegExp(r.PropertyNotation)) return TokenType.ObjectTagName;

        // Close the token if path is clear, eg: {{ name ^ }}
        if (s.IsRegExp(r.TagCloseClear)) {
          state = ScanState.BeforeOutputTagClose;
          return TokenType.OutputTagName;
        }

        // Lets look for filter expression
        state = ScanState.Filter;
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
        q.setTag(s.token);

        // When no spec exists for the tag, this is an unknown tag
        if (!$.liquid.tag) {
          state = ScanState.GotoTagEnd;
          return TokenType.Unknown;
        }

        /* COMMENT TYPE ------------------------------- */

        // Comment type tags, eg: {% comment %}
        if (q.isTagType(Type.comment)) {
          state = ScanState.GotoTagEnd;
          ender = ScanState.BeforeStartTagClose;
          return TokenType.StartTagName;
        }

        /* VARIABLE TYPE ------------------------------ */

        // Control type tags, eg: {% assign %} or {% capture %}
        if (q.isTagType(Type.variable)) {

          state = ScanState.VariableIdentifier;

          if ($.liquid.tag?.singleton) {
            ender = ScanState.BeforeSingularTagClose;
            return TokenType.SingularTagName;
          } else {
            ender = ScanState.BeforeStartTagClose;
            return TokenType.StartTagName;
          }
        }

        /* CONTROL TYPE ------------------------------- */

        // Control type tags, eg: {% if %} or {% unless %}
        if (q.isTagType(Type.control)) {

          state = ScanState.Control;

          if ($.liquid.tag?.singleton) {
            ender = ScanState.BeforeSingularTagClose;
            return TokenType.SingularTagName;
          } else {
            ender = ScanState.BeforeStartTagClose;
            return TokenType.StartTagName;
          }
        }

        /* GENERATOR TYPE ----------------------------- */

        if (q.isTagType(Type.generator)) {

          state = ScanState.Argument;

          if ($.liquid.tag?.singleton) {
            ender = ScanState.BeforeSingularTagClose;
            return TokenType.SingularTagName;
          } else {
            ender = ScanState.BeforeStartTagClose;
            return TokenType.StartTagName;
          }
        }

        /* IMPORT TYPE ------------------------------ */

        // Import type tags, eg: {% render %} or {% include %}
        if (q.isTagType(Type.import)) {
          state = ScanState.Import;
          ender = ScanState.BeforeSingularTagClose;
          return TokenType.SingularTagName;
        }

        /* EMBEDDED TYPE ------------------------------ */

        // Embedded language type tags, eg: {% schema %}
        if (q.isTagType(Type.embedded)) {
          state = ScanState.EmbeddedLanguage;
          ender = ScanState.BeforeStartTagClose;
          return TokenType.StartTagName;
        }

        /* ITERATION TYPE ----------------------------- */

        // Iteration type tags, eg: {% for %}
        if (q.isTagType(Type.iteration)) {

          state = ScanState.Iteration;

          if ($.liquid.tag?.singleton) {
            ender = ScanState.BeforeSingularTagClose;
            return TokenType.SingularTagName;
          } else {
            ender = ScanState.BeforeStartTagClose;
            return TokenType.StartTagName;
          }
        }

        /* UNKNOWN TYPE ------------------------------- */
        state = ScanState.GotoTagEnd;

        if (s.IfRegExp(r.KeywordAlpha)) {
          return TokenType.Unknown;
        }

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

      if (error === ParseError.UnknownObject) error = undefined;
      if (error === ParseError.UnknownProperty) error = undefined;

      // Object property dot, eg: object.
      if (s.IfCodeChar(c.DOT)) {

        // If our cache reference is range, lets ensure it handled correctly
        // and we will forward to range end, eg: {% for i in (object.prop..^ %}
        if (cache === ScanCache.IterationRangeStart) {
          if (s.IfCodeChar(c.DOT)) {
            cache = ScanCache.Reset;
            state = ScanState.IterationRangeEnd;
            return Scan();
          }
        }

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

      if (cache === ScanCache.IterationRangeEnd) {
        cache = ScanCache.Reset;
        state = ScanState.IterationRangeClose;
        return Scan();
      }

      // If cache holds a filter reference, we refer to it in the next scan
      if (cache === ScanState.FilterSeparator) {
        cache = ScanCache.Reset;
        state = ScanState.FilterSeparator;
        return Scan();
      }

      if (cache === ScanCache.ObjectAssignment) {
        cache = ScanCache.ObjectAssignment;
        state = ScanState.VariableAssignment;
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

        // Validate the property against the specification
        if (!q.isProperty(s.token)) {
          error = ParseError.UnknownProperty;
        }

        state = ScanState.Object;
        return TokenType.ObjectProperty;
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

      // Check to see if we have empty bracket notations, eg: []
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

          // Advance 1 step to align cursor and tokenize
          s.Advance(1);

          // Report error for the missing property expression
          error = ParseError.MissingProperty;
          state = ScanState.Object;
          return TokenType.ParseError;
        }

        // Validate the property against the specification
        if (!q.isProperty(s.token)) {
          error = ParseError.UnknownProperty;
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

        if (!s.TokenContains(r.DigitOnly)) {
          error = ParseError.RejectFloat;
          return TokenType.ParseError;
        }

        if (pairs.length === 0) object = s.offset;

        // Next character should be closing bracket notation, eg ]
        if (!q.isType(Type.array)) {
          error = ParseError.RejectArray;
        }

        return TokenType.ObjectPropertyNumber;

      }

      // Capture inner variable or object reference, eg: object[variable]
      if (s.IfRegExp(r.PropertyValue)) {

        if (q.setObject(s.token)) {
          // Pass back to object scan and look for properties
          state = ScanState.Object;
          return TokenType.ObjectPropertyObject;
        }

        if (s.IsRegExp(r.PropertyNotation)) {

          // Pass back to object scan and look for properties
          state = ScanState.Object;
          return TokenType.ObjectPropertyObject;
        }

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

        // Next scan we will look for color operator, eg: {{ tag | filter^:}}
        if (q.setFilter(s.token)) {
          state = ScanState.FilterOperator;
          return TokenType.FilterIdentifier;
        }

        // We are dealing with an unknown filter, consume token
        error = ParseError.InvalidFilter;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
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
        if (!$.liquid.argument) {
          error = ParseError.RejectFilterArguments;
          state = ScanState.Filter;
          return TokenType.ParseError;
        }

        // Lets consume the colon operator, eg: {{ tag | filter:^ }}
        s.Advance(1, true);

        state = ScanState.FilterArgument;
        return TokenType.FilterOperator;
      }

      // Filter contains no arguments
      if (!$.liquid.argument) {
        state = ScanState.Filter;
        return Scan();
      }

      // If the first argument is not required we will check if any arguments
      // are required, if all are optional we will pass back to Filter scan
      if (!q.isRequired()) {
        state = q.isOptional() ? ScanState.Filter : ScanState.FilterArgument;
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

      // If the spec query engine is walking over parameter and
      // a string is intercepted, it signifies a new argument.
      if (q.isWithin(Within.Parameter)) {

        // We are looking for specific characters and word boundries
        if (s.IsRegExp(r.ParameterBreak)) {

          // Lets attempt to move to the next argument.
          // If last argument, we can exit the scan with parse error.
          if (!q.nextArgument()) {
            error = ParseError.InvalidArgument;
            state = ScanState.ParseError;
            return TokenType.ParseError;
          }
        }
      }

      if (s.IsRegExp(r.StringQuotations)) {

        // Capture an argument expressed as a string
        if (s.SkipQuotedString(true)) {

          // If value does not match the specification
          if (!q.isValue(s.token)) {
            error = ParseError.InvalidArgument;
            state = ScanState.FilterSeparator;
            return TokenType.ParseError;
          };

          // Make sure filter argument accepts a string
          if (!q.isType(Type.string)) {
            error = ParseError.RejectString;
            state = ScanState.FilterSeparator;
            return TokenType.ParseError;
          }

          state = ScanState.FilterSeparator;
          return TokenType.FilterArgument;
        }

        // We have a missing quotation character, eg: "argument
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // Capture normal expression integer, eg: 1, 25, -50, 100
      if (s.IfRegExp(r.Number)) {

        // Validate integer number types, these are not floats
        if (q.isType(Type.number)) {

          // Test against the argument value
          if (!q.isValue(s.token)) {
            state = ScanState.FilterSeparator;
            error = ParseError.InvalidNumberRange;
            return TokenType.ParseError;
          }

          // Ensure we are dealing with an integer
          if (s.TokenContains(r.Integer)) {
            state = ScanState.FilterSeparator;
            return TokenType.Integer;
          }

          state = ScanState.GotoTagEnd;
          error = ParseError.RejectFloat;
          return TokenType.ParseError;
        }

        // Validate float number types, in the specs they use a number type
        if (q.isType(Type.number)) {

          // Ensure we do not have a hanging decimal, eg: 25.^
          if (s.IsPrevCodeChar(c.DOT)) {
            state = ScanState.GotoTagEnd;
            error = ParseError.InvalidDecimalPoint;
            return TokenType.ParseError;
          }

          // Number can be either float or integer, lets proceed
          state = ScanState.FilterSeparator;
          return TokenType.Integer;
        }

        // If we reach this point, we have an invalid number
        state = ScanState.GotoTagEnd;
        error = ParseError.RejectNumber;
        return TokenType.ParseError;
      }

      // Check for boolean argument values
      if (s.IfRegExp(r.Boolean)) {

        // Ensure the argument accepts a boolean value
        if (q.isType(Type.boolean)) {
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

        // Supply the object to spec query engine, if value is not
        // a known object, we check variables, if non existent we
        // will warn about unknown object reference
        if (!q.setObject(s.token)) {
          error = ParseError.UnknownObject;
        };

        // Check to to see if we are dealing with an object
        if (s.IsRegExp(r.PropertyNotation)) {
          cache = ScanState.FilterSeparator;
          state = ScanState.Object;
          return TokenType.Object;
        }

        // Lets check if the value is an argument parameter
        if (q.isParameter(s.token)) {

          state = ScanState.FilterParameter;

          // Validate that the parameter is unique
          // This is not a critial error, so we continue parsing the tag
          if (q.isError(Errors.ParameterNotUnique)) {
            error = ParseError.DuplicatedParameters;
            return TokenType.ParseError;
          }

          return TokenType.FilterParameter;
        }

        // If we get here, we have a keyword or variable
        state = ScanState.FilterSeparator;
        return TokenType.Variable;

      }

      // Missing filter argument, eg: {{ tag | filter: ^ }}
      if (q.isRequired()) {

        // Consume comma value
        if (s.TokenCodeChar(c.COM)) s.Cursor();
        error = ParseError.RequireFilterArgument;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here we have hanging colon, eg: {{ tag | filter:^ }}
      if (s.TokenCodeChar(c.COL)) {

        // Ensure we have a correctly aligned cursor
        s.ReverseWhitespace();
        error = ParseError.MissingFilterArgument;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here, lets check if another argument exists
      // so as to capture any optional arguments in the q.
      if (!s.IsPrevCodeChar(c.COM) && q.nextArgument()) return Scan();

      s.Cursor(); // Align the cursor with offset

      cache = ScanCache.Reset;
      error = ParseError.InvalidCharacter;
      state = ScanState.ParseError;

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID FILTER ARGUMENT SEPARATOR             */
    /* -------------------------------------------- */
    case ScanState.FilterSeparator:

      // Lets revert the parameter to the argument index
      // We will check for comma and pass back to argument scan.
      if (q.nextParameter() && s.IfCodeChar(c.COM)) {
        state = ScanState.FilterArgument;
        return Scan();
      }

      // Move to the next argument in the spec
      if (q.nextArgument()) {

        // We have a comma separator character, lets proceed
        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterArgument;
          return TokenType.Separator;
        }

        // If the argument is required according to spec but
        // no comma seperator was intercepted we have an error.
        if (q.isRequired()) {

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

      // Ensure we have a clear closing path, eg: {{ tag | filter ^ }}
      if (s.IsRegExp(r.TagCloseClear)) {

        state = $.liquid.tag
          ? ScanState.BeforeSingularTagClose
          : ScanState.BeforeOutputTagClose;

        return TokenType.FilterEnd;

      }

      // Parameter is unknown according to the spec
      // This is not a critial error, so we continue parsing the tag
      if (q.isError(Errors.ParameterUnknown)) {
        error = ParseError.UnknownFilterArgumentParameter;
        state = ScanState.FilterParameter;
        return TokenType.ParseError;
      }

      // We have invalid characters, eg: {{ tag | filter ^# }}
      error = ParseError.InvalidCharacter;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID FILTER PARAMETER                      */
    /* -------------------------------------------- */
    case ScanState.FilterParameter:

      // Parameters must contain a colon character
      if (s.IfCodeChar(c.COL, false)) {
        cache = ScanState.FilterParameter;
        state = ScanState.FilterArgument;
        return Scan();
      }

      // Missing a colon separator, eg: {{ tag | filter: param^ }}
      state = ScanState.GotoTagEnd;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID CONTROL TAG                           */
    /* -------------------------------------------- */
    case ScanState.Control:

      // Make sure the control tag is not empty, eg: {% if ^ %}
      if (s.IsRegExp(r.TagCloseClear)) {

        // We have a valid else tag, eg: {% else^ %}
        if (s.TokenContains(r.KeywordElse)) {
          state = ScanState.BeforeSingularTagClose;
          return TokenType.ControlElse;
        }

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
        if (q.setObject(s.token)) {

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

        // The keyword is not known to our spec, we will now check if
        // if the value contains a property notation character
        if (s.IsRegExp(r.PropertyNotation)) {
          cache = ScanState.ControlOperator;
          state = ScanState.Object;
          return TokenType.Object;
        }

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

      if (s.IfCodeChar(c.COM, false) && q.isParent('case')) {
        state = ScanState.ControlCondition;
        return TokenType.TagArgument;
      }

      // In some cases, a question mark can be suffixed, eg: {% if blog.comments_enabled? %}
      // Lets ensure the previous character was alpha in its sequence and check for this
      if (s.IsPrevRegExp(r.KeywordAlpha) && s.IfCodeChar(c.QWS)) {

        // Typically, this is a truthy, so lets check for ending
        // otherwise we continue traversal and recheck for operator.
        if (s.IsRegExp(r.TagCloseClear)) state = ScanState.BeforeStartTagClose;

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

        // Assign tags accept filters, which means its not a `capture`
        // Pass to the operator scan
        if ($.liquid.tag?.filters) {
          state = ScanState.VariableOperator;
          return TokenType.VariableKeyword;
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
        return Scan();
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidOperator;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID VARIABLE ASSIGNMENT                   */
    /* -------------------------------------------- */
    case ScanState.VariableAssignment:

      if (cache === ScanCache.ObjectAssignment) {
        cache = ScanCache.Reset;
        return TokenType.VariableValueObject;
      }

      // Lets check for a string assignment, eg: {% assign x = 'string' %}
      if (s.IsRegExp(r.StringQuotations)) {

        // We have a string assignment, we will pass to filter next
        if (s.SkipQuotedString(true)) return TokenType.VariableValue;

        // If we get here we have an invalid string (missing quotation)
        // We will also assert a cache to denote we are closing a singular tag
        cache = ScanState.BeforeSingularTagClose;
        state = ScanState.GotoTagEnd;
        error = ParseError.MissingQuotation;
        return TokenType.ParseError;
      }

      if (s.IfRegExp(r.Number)) return TokenType.Number;

      // Variable assignment name can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Lets consult the specification to see if we know about the value
        // being assigned (ie: if it is a known object)
        if (q.setObject(s.token) || q.isVariable(s.token)) {

          cache = ScanState.VariableAssignment;

          // We have set the specification, lets now determine
          // if the value contains object notation and proceed accordingly
          if (s.IsRegExp(r.PropertyNotation)) {
            state = ScanState.Object;
          }

          return TokenType.Object;
        }

        if (s.IsRegExp(r.TagCloseClear)) {
          state = ScanState.BeforeSingularTagClose;
        }

        return TokenType.VariableValue;

      }

      console.log(s.IsRegExp(r.TagCloseClear), q.isVariable(s.token), s.token);

      if (s.IsRegExp(r.TagCloseClear)) {
        state = ScanState.BeforeSingularTagClose;
        return Scan();
      }

      if (s.IsNextCodeChar(c.PIP) || s.IsCodeChar(c.PIP)) {

        // We are dealing with an assign tag and we assume
        // that a filter exists after assignment
        state = ScanState.Filter;
        return Scan();
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID VARIABLE IDENTIFIER TAG               */
    /* -------------------------------------------- */
    case ScanState.Import:

      // Lets check for a string assignment, eg: {% render 'string' %}
      if (s.IsRegExp(r.StringQuotations)) {

        // We have a string assignment, we will pass to filter next
        if (s.SkipQuotedString(true)) return TokenType.ImportFileString;

        // If we get here we have an invalid string (missing quotation)
        // We will also assert a cache to denote we are closing a singular tag
        cache = ScanState.BeforeSingularTagClose;
        state = ScanState.GotoTagEnd;
        error = ParseError.MissingQuotation;
        return TokenType.ParseError;

      }

      // Variable assignment name can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {
        state = ScanState.GotoTagEnd;
        error = ParseError.InvalidFileImport;
        return TokenType.ParseError;
      }

      if (s.IsRegExp(r.TagCloseClear)) {
        state = ScanState.BeforeSingularTagClose;
        return Scan();
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION                             */
    /* -------------------------------------------- */
    case ScanState.Iteration:

      // Lets consume the iteree value which was intercepted
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Iteree cannot be a digit, must be alphanumer combination
        if (s.TokenContains(r.Digit)) {
          state = ScanState.GotoTagEnd;
          error = ParseError.RejectNumber;
          return TokenType.ParseError;
        }

        state = ScanState.IterationIteree;
        return TokenType.Iteration;
      }

      // If we get here, iteree is missing, eg {% for ^ %}
      state = ScanState.GotoTagEnd;
      error = ParseError.MissingIterationIteree;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION ITEREE                      */
    /* -------------------------------------------- */
    case ScanState.IterationIteree:

      state = ScanState.IterationOperator;
      return TokenType.IterationIteree;

    /* -------------------------------------------- */
    /* LIQUID ITERATION OPERATOR                    */
    /* -------------------------------------------- */
    case ScanState.IterationOperator:

      // Lets ensure the iteration tag contains an "in" operator
      if (s.IfRegExp(r.OperatorIteration)) {
        state = ScanState.IterationArray;
        return Scan();
      }

      // Invalid or missing "in" operator
      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidOperator;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION ARRAY                       */
    /* -------------------------------------------- */
    case ScanState.IterationArray:

      // We get here after running an object scan on the array
      // value that was intercepted
      if (cache === ScanState.IterationArray) {
        cache = ScanCache.Reset;
        state = ScanState.IterationParameter;
        return TokenType.IterationArray;
      }

      // Lets consume the iteration array value
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Ensure an alphanumeric combination was passed and not just a number
        if (s.IfRegExp(r.Digit)) {
          state = ScanState.GotoTagEnd;
          error = ParseError.RejectNumber;
          return TokenType.ParseError;
        }

        // Check to to see if we are dealing with an known object
        if (q.setObject(s.token)) {
          cache = ScanState.IterationArray;
          state = ScanState.Object;
          return TokenType.Object;
        } else {
          error = ParseError.UnknownObject;
        }

        // Check to to see if we are dealing with an object
        if (s.IsRegExp(r.PropertyNotation)) {
          cache = ScanState.FilterSeparator;
          state = ScanState.Object;
          return TokenType.Object;
        }

        // If we get here, its an unknown object or variable, lets
        // check to see if any parameter values were passed
        state = ScanState.IterationParameter;
        return TokenType.IterationArray;
      }

      if (s.IfCodeChar(c.LOP)) {
        state = ScanState.IterationRangeStart;
        return Scan();
      }

      // Missing iteration array value
      error = ParseError.MissingIterationArray;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION RANGE CLOSE                 */
    /* -------------------------------------------- */
    case ScanState.IterationRangeClose:

      if (s.IfCodeChar(c.ROP)) {
        state = ScanState.IterationParameter;
        return Scan();
      }

      error = ParseError.MissingBracketNotation;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION RANGE START AND END         */
    /* -------------------------------------------- */
    case ScanState.IterationRangeStart:
    case ScanState.IterationRangeEnd:

      if (s.IfRegExp(r.Digit)) {

        state = state === ScanState.IterationRangeEnd
          ? ScanState.IterationRangeClose
          : ScanState.IterationRangeSeparators;

        return Scan();

      }

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Check to to see if we are dealing with an object
        if (q.setObject(s.token) || s.IsRegExp(r.PropertyNotation)) {

          // Next call we will look for a property notation
          cache = state === ScanState.IterationRangeEnd
            ? ScanCache.IterationRangeEnd
            : ScanCache.IterationRangeStart;

          state = ScanState.Object;
          return TokenType.Object;
        }

        state = state === ScanState.IterationRangeEnd
          ? ScanState.IterationRangeClose
          : ScanState.IterationRangeSeparators;

        return Scan();
      }

      error = ParseError.InvalidNumberRange;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION RANGE SEPARATORS            */
    /* -------------------------------------------- */
    case ScanState.IterationRangeSeparators:

      if (s.IfCodeChar(c.DOT)) {

        if (s.IfCodeChar(c.DOT)) {
          state = ScanState.IterationRangeEnd;
          return TokenType.VariableKeyword;
        }

        error = ParseError.MissingIterationRangeSeparator;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      error = ParseError.InvalidCharacter;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    /* -------------------------------------------- */
    /* LIQUID ITERATION PARAMETER                   */
    /* -------------------------------------------- */
    case ScanState.IterationParameter:

      if (s.IfRegExp(r.KeywordAlpha)) {

        // Lets check that this parameter is valid
        if (q.isParameter(s.token)) {

          // Parameter is a keyword, eg: {% for i in arr reversed %}
          if (q.isType(Type.keyword)) {
            return TokenType.IterationParameter;
          }

          // If we get here the parameter required a value be passed
          // eg: {% for i in arr offset:^ %}
          if (s.IfCodeChar(c.COL, false)) {
            state = ScanState.IterationParameterValue;
            return TokenType.IterationParameter;
          }

          // If we reach this point then the parameter is
          // missing the colon separator, eg: {% for i in arr offset^ %}
          error = ParseError.MissingColon;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;

        }

        // If the parameter is unknown or invalid
        error = q.isError(Errors.ParameterNotUnique)
          ? ParseError.DuplicatedParameters
          : ParseError.InvalidIterationParameter;

        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      state = ScanState.BeforeStartTagClose;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID ITERATION PARAMETER VALUE             */
    /* -------------------------------------------- */
    case ScanState.IterationParameterValue:

      if (s.IsRegExp(r.StringQuotations)) {

        // Capture an argument expressed as a string
        if (s.SkipQuotedString(true)) {

          // Make sure the parameter accepts a string
          if (q.isType(Type.string)) {
            state = ScanState.IterationParameter;
            return TokenType.IterationParameterValue;
          }

          error = ParseError.RejectString;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }

        // We have a missing quotation character, eg: "argument
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // Capture normal expression integer, eg: 1, 25, -50, 100
      if (s.IfRegExp(r.Number)) {

        // Validate integer number types, these are not floats
        if (q.isType(Type.number)) {

          // Ensure we are dealing with an integer
          if (s.TokenContains(r.DigitOnly)) {
            state = ScanState.IterationParameter;
            return TokenType.IterationParameterValue;
          }

          state = ScanState.GotoTagEnd;
          error = ParseError.RejectFloat;
          return TokenType.ParseError;
        }

        // Validate float number types, in the specs they use a number type
        if (q.isType(Type.number)) {

          // Ensure we do not have a hanging decimal, eg: 25.^
          if (s.IsPrevCodeChar(c.DOT)) {
            state = ScanState.GotoTagEnd;
            error = ParseError.InvalidDecimalPoint;
            return TokenType.ParseError;
          }

          // Number can be either float or integer, lets proceed
          state = ScanState.IterationParameter;
          return TokenType.IterationParameterValue;
        }

        // If we reach this point, we have an invalid number
        state = ScanState.GotoTagEnd;
        error = ParseError.RejectNumber;
        return TokenType.ParseError;
      }

      // Check for boolean argument values
      if (s.IfRegExp(r.Boolean)) {

        // Ensure the argument accepts a boolean value
        if (q.isType(Type.boolean)) {
          state = ScanState.IterationParameter;
          return TokenType.IterationParameterValue;
        }

        // If filter does not accept boolean value
        error = ParseError.RejectBoolean;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here, we will have either a variable or reference
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Supply the object to spec query engine, if value is not
        // a known object, we check variables, if non existent we
        // will warn about unknown object reference
        if (!q.setObject(s.token)) error = ParseError.UnknownObject;

        // Check to to see if we are dealing with an object
        if (s.IsRegExp(r.PropertyNotation)) {
          cache = ScanState.IterationParameter;
          state = ScanState.Object;
          return TokenType.Object;
        }

        // If we get here, we have a keyword or variable
        state = ScanState.IterationParameter;
        return TokenType.IterationParameterValue;
      }

      state = ScanState.IterationParameter;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID TAG ARGUMENT                          */
    /* -------------------------------------------- */
    case ScanState.Argument:

      // Lets first check if the provided tag argument is a string, eg: {% tag ^'arg'
      if (s.IsRegExp(r.StringQuotations)) {

        // Capture the argument expressed as a string
        if (s.SkipQuotedString(true)) {

          // If the string value does not match the specification, we have a parse error
          if (!q.isValue(s.token)) {
            error = ParseError.InvalidArgument;
            state = ScanState.GotoTagEnd;
            return TokenType.ParseError;
          };

          // Make sure the tag argument accepts a string type
          // If everything checks out we will proceed to next step.
          if (q.isType(Type.string)) {
            state = ScanState.ArgumentSeparator;
            return TokenType.TagArgument;
          }

          // If we get here the tag argument does not accept a string type
          error = ParseError.RejectString;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;

        }

        // We have a missing quotation character, eg: "argument
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // If we get here, we will have either a variable or reference
      // passed in as an argument value, eg: {% tag ^arg  OR {% tag ^object.prop
      if (s.IfRegExp(r.KeywordAlphaNumeric)) {

        // Make sure filter argument accepts variable keyword types
        if (!q.isType(Type.object)) {
          error = ParseError.InvalidArgument;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }

        // If we get here, we have a keyword or variable
        state = ScanState.ArgumentSeparator;
        return TokenType.TagArgument;
      }

      if (q.isRequired()) {
        error = ParseError.MissingTagArgument;
        state = ScanState.ParseError;
        return Scan();
      }

      state = ScanState.ArgumentSeparator;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID TAG ARGUMENT SEPERATOR                */
    /* -------------------------------------------- */
    case ScanState.ArgumentSeparator:

      // Move to the next argument in the spec
      if (q.nextArgument()) {

        // Let's validate the argument separator, eg: {% tag arg^,
        // If no separator is defined we will assume whitespace
        if ($.liquid.argument.separator && s.IfCodeChar($.liquid.argument.separator)) {
          state = q.isType(Type.parameter) ? ScanState.Parameter : ScanState.Argument;
          return Scan();
        }

        if (!$.liquid.argument.separator) {
          state = ScanState.Argument;
          return Scan();
        }

        // Arguments must be seperated by comma characters
        // We need to align the cursor for diagnostics
        s.Cursor(NaN);
        s.SkipWhitespace();

        state = ScanState.GotoTagEnd;
        error = ParseError.MissingArgumentSeparator;
        return TokenType.ParseError;

      }

      state = ScanState.GotoTagEnd;

      break;

    /* -------------------------------------------- */
    /* LIQUID TAG PARAMETER                         */
    /* -------------------------------------------- */
    case ScanState.Parameter:

      if (s.IfRegExp(r.KeywordAlpha)) {

        // Lets check that this parameter is valid
        if (q.isParameter(s.token)) {
          state = ScanState.ParameterOperator;
          return Scan();
        }

        // If the parameter is unknown or invalid
        error = ParseError.ParsingError;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      state = ScanState.BeforeStartTagClose;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID TAG PARAMETER OPERATOR                */
    /* -------------------------------------------- */
    case ScanState.ParameterOperator:

      if (s.IfCodeChar(c.COL)) {
        state = ScanState.ParameterArgument;
      }

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID TAG PARAMETER ARGUMENT                */
    /* -------------------------------------------- */
    case ScanState.ParameterArgument:

      if (q.isWithin(Within.ParameterValue)) {
        state = ScanState.GotoTagEnd;
        return Scan();
      }

      state = ScanState.GotoTagEnd;
      return Scan();

    /* -------------------------------------------- */
    /* LIQUID TAG PARAMETER ARGUMENT                */
    /* -------------------------------------------- */
    case ScanState.ParameterSeparator:

      return Scan();

    /* -------------------------------------------- */
    /* LIQUID ITERATION ITEREE                      */
    /* -------------------------------------------- */
    case ScanState.EmbeddedLanguage:

      if ($.liquid.tag.language === 'json') {
        state = ScanState.BeforeStartTagClose;
        return TokenType.EmbeddedJSON;
      }

      if ($.liquid.tag.language === 'css') {
        state = ScanState.BeforeStartTagClose;
        return TokenType.EmbeddedCSS;
      }

      if ($.liquid.tag.language === 'scss') {
        state = ScanState.BeforeStartTagClose;
        return TokenType.EmbeddedSCSS;
      }

      if ($.liquid.tag.language === 'javascript') {
        state = ScanState.BeforeStartTagClose;
        return TokenType.EmbeddedJavaScript;
      }

      return Scan();

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
      if (s.IsRegExp(r.DelimitersCloseOutput)) {
        state = ScanState.BeforeOutputTagClose;
        return Scan();
      }

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

      if (state === ScanState.TagClose) {
        if (s.IfRegExp(r.DelimitersCloseOutput)) {
          q.reset(); // Reset the cursor spec
          state = ScanState.CharSeq;
          return TokenType.OutputTagClose;
        }
      }

      // Tag is closed so we will consume, eg: }} or %}
      if (s.IfRegExp(r.DelimitersClose)) {

        state = ScanState.CharSeq;

        // STATE QUALIFIERS

        // Start tag close, eg: {% tag %}^
        if (ender === ScanState.BeforeStartTagClose) return TokenType.StartTagClose;

        // End tag close, eg: {% endtag %}^
        if (ender === ScanState.BeforeEndTagClose) {
          q.reset(); // Reset the cursor spec
          return TokenType.EndTagClose;
        }

        // Output tag close, eg: {{ output }}^
        if (ender === ScanState.BeforeOutputTagClose) {
          q.reset(); // Reset the cursor spec
          return TokenType.OutputTagClose;
        }

        // Singular tag close, eg: {% singular %}^
        if (ender === ScanState.BeforeSingularTagClose) {
          q.reset(); // Reset the cursor spec
          return TokenType.SingularTagClose;
        }

        // FALLBACK

        return TokenType.TagClose;

      }

      return CharSeq(); // Fall through, move to character sequence
  }

  return Scan();

}
