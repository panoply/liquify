import { IFilter, IObject, ITag } from '@liquify/liquid-language-specs';
import { NodeType } from 'lexical/types';
import { TokenType } from 'lexical/tokens';
import { ScanState, ScanCache } from 'lexical/state';
import { ParseError } from 'lexical/errors';
import { errors } from 'tree/errors';
import { IAST } from 'tree/ast';
import * as spec from 'parser/specs';
import * as s from 'parser/stream';
import * as r from 'lexical/regex';
import * as c from 'lexical/characters';

/**
 * Start Position
 *
 * The starting position index of each tag,
 * this is reset every time we encounter an
 * open delimiter match
 */
export let start: number;

/**
 * Error Number
 *
 * Parsing errors, holds value of the parse errors
 * encountered while scanning tags.
 */
export let error: number;

/**
 * Cache
 *
 * Can hold any value, is used as a cache
 * and its value may represent anything within
 * the stream.
 */
export let cache: number = ScanCache.Reset;

/**
 * Scan State
 *
 * The state at which the scan is processing. This
 * changes each time we come across characters important
 * in the sequence.
 */
export let state: number = ScanState.CharSeq;

/**
 * Pairs
 *
 * Holds a number value and used to count start
 * and end characters, eg: []
 */
const pairs: number[] = [];

/**
 * Runs document scan
 *
 * @param {number} [offset=0]
 * The position offset from which to start scanning
 */
export function scan (offset: number = 0): number {
  // Fast Forward to specified offset
  if (offset > 0) s.Jump(offset);

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

  if (cache === TokenType.Comment) {
    if (s.ConsumeUntil(r.CommentTagEnd)) {
      cache = ScanCache.Reset;
    }
  }

  // Search until we hit a character of interest
  s.UntilSequence(r.Delimiters);

  // Liquid left-side delimiter detected, eg: {
  if (s.IsCodeChar(c.LCB)) {

    // Validate we have a Liquid tag, eg: {{ or {%
    if (s.IsRegExp(/^\{[{%]/)) {

      // Assert Start position of token
      start = s.offset;

      // Liquid output type delimiter, eg: {{
      if (s.IfRegExp(r.DelimitersOutputOpen)) {
        state = ScanState.AfterOutputTagOpen;
        return TokenType.OutputTagOpen;
      }

      // Liquid tag delimiter, eg: {%
      if (s.IfRegExp(r.DelimitersTagOpen)) {

        // Lets peek ahead to see if we are dealing with an {% end %}
        // type tag, but we will not consume, just check
        if (s.IsRegExp(r.TagIsEnd)) {
          state = ScanState.AfterEndTagOpen;
          return TokenType.EndTagOpen;
        }

        // Getting here then we dealing with a start or singular type tag
        state = ScanState.AfterTagOpen;
        return TokenType.TagOpen;

      }
    }
  }

  // HTML starting delimiter character, eg: <
  if (s.IsCodeChar(c.LAN)) {

    // Assert Start position of token
    start = s.offset;

    // Ensure no whitespace proceeds delimiter, eg: `< tag`
    if (!s.Whitespace()) {

      s.Advance(1);

      // Character is a forward slash and proceeded by no whitespace, eg: `</`
      if (s.IfCodeChar(c.FWS) && !s.Whitespace()) {

        // Check we have a tag name, do not conumse though, eg: `</tag`
        if (s.IsRegExp(r.HTMLTagName)) {
          state = ScanState.AfterHTMLEndTagOpen;
          return TokenType.HTMLEndTagOpen;
        }
      }

      // We have start or void type HTML tag, eg: `<tag`
      if (s.IsRegExp(r.HTMLTagName)) {
        state = ScanState.AfterHTMLStartTagOpen;
        return TokenType.HTMLStartTagOpen;
      }

    }
  }

  // Reset state if not CharSeq, lets continue sequencing...
  if (state !== ScanState.CharSeq) state = ScanState.CharSeq;

  // Skip all whitespacing (including newlines)
  s.SkipWhitespace();

  // Increment the position
  s.Advance(1);

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

    case ScanState.AfterHTMLStartTagOpen:

      // We are within a HTML start tag, eg: <^tag
      if (s.IfRegExp(r.HTMLTagName)) {
        state = ScanState.HTMLAttributeName;
        return s.TokenContains(r.HTMLVoidTags)
          ? TokenType.HTMLVoidTagName
          : TokenType.HTMLStartTagName;
      }

      // This tag means nothing to us, lets keep scanning
      state = ScanState.CharSeq;
      return TokenType.ParseCancel;

    case ScanState.HTMLAttributeName:

      // We have an embedded region, eg `<script>`
      if (s.IfCodeChar(c.RAN)) {
        state = ScanState.CharSeq;
        return TokenType.HTMLStartTagClose;
      }

      // We have an attribute value on the tag, eg: `<script src^`
      if (s.IfRegExp(r.HTMLTagAttribute)) {
        state = ScanState.HTMLAttributeOperator;
        return TokenType.HTMLAttributeName;
      }

      state = ScanState.CharSeq;
      error = ParseError.MissingCloseDelimiter;
      return TokenType.ParseError;

    case ScanState.HTMLAttributeOperator:
      if (s.IfCodeChar(c.EQS)) {
        state = ScanState.HTMLAttributeValue;
        return TokenType.HTMLOperatorValue;
      }

      state = ScanState.HTMLAttributeName;
      return Scan();

    case ScanState.HTMLAttributeValue:

      // Capture HTML string attribute value
      if (s.SkipQuotedString(true)) {
        state = ScanState.HTMLAttributeName;
        return TokenType.HTMLAttributeValue;
      }

      state = ScanState.HTMLAttributeName;
      return Scan();

    case ScanState.AfterHTMLEndTagOpen:

      // The HTML closing tag name, eg: </^tag
      if (s.IfRegExp(r.HTMLTagName)) {
        state = ScanState.BeforeHTMLEndTagClose;
        return TokenType.HTMLEndTagName;
      }

      // The HTML closing tag name, eg: </^>
      if (s.IfCodeChar(c.RAN)) {
        // Begin scanning again after consuming the character
        state = ScanState.CharSeq;

        // Assert the error
        error = ParseError.MissingTagName;
        return TokenType.ParseError;
      }

      // If we get here we have an error, eg: </^
      state = ScanState.CharSeq;
      error = ParseError.InvalidTagName;
      return TokenType.ParseError;

    case ScanState.BeforeHTMLEndTagClose:

      if (s.IfCodeChar(c.RAN)) {
        state = ScanState.CharSeq;
        return TokenType.HTMLEndTagClose;
      }

      // Assert the error
      state = ScanState.CharSeq;
      error = ParseError.MissingCloseDelimiter;
      return TokenType.ParseError;

    case ScanState.AfterTagOpen:
    case ScanState.AfterEndTagOpen:
    case ScanState.AfterOutputTagOpen:

      // Consume the left side trim dash, eg: {{-^ or {%-^
      if (s.IfCodeChar(c.DSH)) return TokenType.TrimDashLeft;

      // Before output tag name, eg: {{- ^name
      if (state === ScanState.AfterOutputTagOpen) {
        state = ScanState.BeforeOutputTagName;
        return Scan();
      }

      // When we get here its an end type tag
      if (state === ScanState.AfterEndTagOpen) {

        // Lets consume the "end" portion of the name, eg: {%- end^tag
        // We have already confirmed this exists in CharSeq
        // We do not returns a token type, we do this at next run
        if (s.IfRegExp(r.TagEndKeyword)) {
          state = ScanState.BeforeEndTagName;
          return Scan();
        }
      }

      // Before start or singular tag name, eg: {%- ^tag
      state = ScanState.BeforeTagName;
      return Scan();

    case ScanState.BeforeEndTagName:

      // Lets consume the end tag name identifier, eg: {%- endtag^
      if (s.IfRegExp(r.TagName)) {
        state = ScanState.BeforeEndTagClose;
        return TokenType.EndTagName;
      }

      // If we get here, we have an invalid end tag name
      error = ParseError.InvalidTagName;
      state = ScanState.ParseError;
      return Scan();

    case ScanState.BeforeOutputTagName:

      // CHECK 1

      // Lets make sure our intercepted character is valid
      // If this returns a false, we have an invalid  output tag name
      if (!s.IsRegExp(r.OutputFirstCharacter)) {
        error = ParseError.InvalidCharacter;
        state = ScanState.ParseError;
        return Scan();
      }

      // CHECK 2

      // Lets check if output name value is a string, eg: {{ 'value'
      if (s.IsRegExp(r.StringQuotations)) {

        // Next call we will look for a filter value, eg: {{ 'value' |^
        state = ScanState.Filter;

        // Capture the string token value, eg: 'value' or "value"
        if (s.SkipQuotedString()) return TokenType.String;

        // If we get here, string is missing a quotation, eg: {{ 'value^
        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;
        return Scan();
      }

      // CHECK 3

      // Lets check is the value is a integer/float, eg: {{ 100 }}
      if (s.IfRegExp(r.Number)) {
        state = ScanState.Filter;
        return TokenType.Number;
      }

      // CHECK 4

      // Reference or variable name was detected, eg: {{ name }}
      if (s.IfRegExp(r.OutputNameAlpha)) {

        // Match captured token with a cursor value
        spec.Cursor(s.token);

        // Lets check if output name contains an object notation character
        if (s.IsRegExp(r.PropertyNotation)) {

          // Next call we will look for a property notation
          state = ScanState.Object;
          return TokenType.ObjectTagName;
        }

        // Next call we will look for a property notation
        state = ScanState.BeforeOutputTagClose;
        return TokenType.OutputTagName;

      }

      // If we get here, invalid output name
      error = ParseError.InvalidObjectName;
      state = ScanState.ParseError;
      return Scan();

    case ScanState.BeforeTagName:

      // CHECK 1

      // Lets make sure our intercepted character is valid
      // If this returns a false, we have an invalid starting tag name character
      if (!s.IsRegExp(r.TagFirstChar)) {
        error = ParseError.InvalidCharacter;
        state = ScanState.ParseError;
        return Scan();
      }

      // CHECK 2

      // Lets consume the tag name identifier and then consult our
      // specification to determine the type of tag we are dealing with
      if (s.IfRegExp(r.TagName)) {

        // Lets update our specification cursor
        spec.Cursor(s.token);

        // When no spec exists for the tag, this is an unknown tag
        if (spec.cursor === undefined) {
          state = ScanState.GotoTagEnd;
          return TokenType.Unknown;
        }

        // COMMENT TYPE

        // Comment type tags, eg: {% comment %}
        if (spec.TypeOfNode(NodeType.comment)) {
          state = ScanState.GotoTagEnd;
          cache = TokenType.Comment;
          return cache;
        }

        // VARIABLE TYPE

        // Control type tags, eg: {% assign %} or {% capture %}
        if (spec.TypeOfNode(NodeType.variable)) {

          state = ScanState.VariableIdentifier;

          return (spec.cursor as ITag)?.singular
            ? TokenType.SingularTagName
            : TokenType.StartTagName;

        }

        // CONTROL TYPE

        // Control type tags, eg: {% if %} or {% unless %}
        if (spec.TypeOfNode(NodeType.control)) {
          state = ScanState.Control;
          return TokenType.StartTagName;
        }

        // EMBEDDED TYPE

        // Embedded language type tags, eg: {% schema %}
        if (spec.TypeOfNode(NodeType.embedded)) {
          state = ScanState.EmbeddedLanguage;
          return TokenType.StartTagName;
        }

        // ITERATION TYPE

        // Iteration type tags, eg: {% for %}
        if (spec.TypeOfNode(NodeType.iteration)) {
          state = ScanState.Iteration;
          return TokenType.StartTagName;
        }

        state = ScanState.GotoTagEnd;
        return TokenType.Unknown;

      }

      // If we get here, invalid tag name has be intercepted
      // This is going to be because the tag name has invalid characters
      error = ParseError.InvalidTagName;
      state = ScanState.ParseError;
      return Scan();

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

        //  Have pair, remove previous LOB position
        pairs.pop();
        state = ScanState.Object;
        return TokenType.ObjectBracketNotationClose;
      }

      if (pairs.length > 0) {

        // Rewind token to unclosed LOB and capture error
        s.TokenRewind(pairs.shift(), r.PropertyBrackets);

        // Clear the pairs array
        while (pairs.length > 0) pairs.pop();

        error = ParseError.MissingBracketNotation;
        return TokenType.ParseError;
      }

      // Reset the object spec walker
      // spec.object.reset()

      // Check to see if we scanning filter arguments
      if (spec.filter.within) {
        // Reconnect to filter specification
        spec.filter.Cursor();

        // Next characters should be separators, eg: | foo: bar.baz^, }}
        state = ScanState.FilterSeparator;
        return Scan();
      }

      // If Tag is an object, we will look for filters, eg: {{ tag | }}
      if (s.IsCodeChar(c.PIP)) {
        state = ScanState.Filter;
        return Scan();
      }

      state = cache !== ScanCache.Reset ? cache : ScanState.TagClose;

      return Scan();

    case ScanState.ObjectDotNotation:

      // Gets property value on object, eg: "prop" in "object.prop"
      if (s.IfRegExp(r.OutputNameAlpha)) {
        state = ScanState.Object;
        return TokenType.ObjectProperty;
      }

      // Ensure we have a missing property, eg: {{ object.^ }}
      if (s.IsRegExp(r.TagCloseClear)) {
        // Align token cursor, eg: {{ object^. }}
        s.Prev();

        error = ParseError.MissingProperty;
        state = ScanState.ParseError;
        return Scan();
      }

      // Check to see if an extra dot character, eg: {{ object.. }}
      if (s.IsCodeChar(c.DOT)) {
        error = ParseError.InvalidCharacter;
        state = ScanState.ParseError;
      }

      // If we get here, property is invalid
      error = ParseError.InvalidProperty;
      state = ScanState.ParseError;
      return Scan();

    case ScanState.ObjectBracketNotation:

      // Check to see we no empty bracket notations, eg: []
      if (s.IsCodeChar(c.ROB) && s.TokenCodeChar(c.LOB)) {

        // We advance 1 step and also tokenize for error diagnostic
        s.Advance(1, true);

        error = ParseError.MissingProperty;
        state = ScanState.Object;

        // We will continue parsing the token after error
        return TokenType.ParseError;
      }

      // Capture string object property, eg: object["prop"]
      if (s.SkipQuotedString()) {

        // Detect an empty property string value, eg: "" or "   "
        if (s.token.length === 2 || s.TokenContains(r.StringEmpty)) {

          // Advance 1 step to align cursor and tokenize
          s.Advance(1);

          error = ParseError.MissingProperty;
          state = ScanState.Object;

          // We will continue parsing the token after error
          return TokenType.ParseError;
        }

        // Next character should be closing bracket notation, eg ]
        state = ScanState.ObjectBracketNotationEnd;
        return TokenType.ObjectPropertyString;
      }

      // We have a missing quotation character, eg: "prop
      if (s.IsPrevRegExp(r.StringQuotations)) {

        // Advance 1 step to align cursor and tokenize
        s.Advance(1);

        error = ParseError.MissingQuotation;
        state = ScanState.ParseError;

        // We will consume entire token for this error
        return Scan();
      }

      // Property is a number value, eg: object.prop[0]
      if (s.IfRegExp(r.NumberDigit)) {

        // Next character should be closing bracket notation, eg ]
        state = ScanState.ObjectBracketNotationEnd;
        return TokenType.ObjectPropertyNumber;
      }

      // Capture inner variable or object reference, eg: object[variable]
      if (s.IfRegExp(r.PropertyValue)) {

        // Pass it back to object scan, check for any properties
        state = ScanState.Object;
        return TokenType.ObjectProperty;
      }

      // If we get here, property is invalid
      error = ParseError.InvalidProperty;
      state = ScanState.ParseError;
      return Scan();

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

    case ScanState.Filter:
      // Tag has a pipe separator, we will look for a filter
      if (s.IfCodeChar(c.PIP)) {
        state = ScanState.FilterIdentifier;
        return TokenType.Filter;
      }

      // Attempt to close tag, we are here: {{ tag | filter^ }}
      state = ScanState.TagClose;
      return Scan();

    case ScanState.FilterIdentifier:
      // Filter identifier, lets capture, eg: {{ tag | ^filter }}
      if (s.IfRegExp(r.FilterIdentifier)) {
        // Find specification for this filter
        spec.Cursor(s.token);

        // We are dealing with an unknown filter, consume token
        if (spec.cursor === undefined) {
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

      // We wont consume tag, instead we keep scanning
      state = ScanState.Filter;
      return TokenType.ParseError;

    case ScanState.FilterOperator:
      // Check the next token is a colon
      if (s.IsCodeChar(c.COL) && !spec.filter.arguments) {
        // If spec exists and arguments do not exist, throw an error
        error = ParseError.RejectFilterArguments;
        state = ScanState.Filter;

        return Scan();
      }

      // Filter contains no arguments
      if (!spec.filter.arguments) {
        state = ScanState.Filter;
        return Scan();
      }

      // Lets consume the colon operator, eg: {{ tag | filter:^ }}
      if (s.IfCodeChar(c.COL)) {
        state = ScanState.FilterArgumentType;
        return TokenType.FilterOperator;
      }

      // We are missing a colon separator, eg: {{ tag | append^ }}
      error = ParseError.MissingColon;
      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

    case ScanState.FilterArgumentType:

      if (spec.filter.Type('argument')) {
        state = ScanState.FilterArgument;
        return Scan();
      }

      if (spec.filter.Type('parameter')) {
        state = ScanState.GotoTagEnd;
        return Scan();
      }

      if (spec.filter.Type('spread')) {
        state = ScanState.GotoTagEnd;
        return Scan();
      }

      state = ScanState.TagClose;
      return Scan();

    case ScanState.FilterArgument:

      // Capture an argument expressed as a string
      if (s.SkipQuotedString()) {

        // Make sure filter argument accepts a string
        if (spec.filter.Accept('string')) {

          // If another filter argument is required pass to separator
          state = ScanState.FilterSeparator;
          return TokenType.FilterArgument;
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
      if (s.IfRegExp(r.NumberInteger)) {
        // Filter argument accepts number, eg: {{ tag | filter: 10 }}
        if (spec.filter.Accept('integer')) {
          state = ScanState.FilterSeparator;
          return TokenType.Integer;
        }

        error = ParseError.RejectNumber;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // Capture float expression numbers
      if (s.IfRegExp(r.NumberFloat)) {
        // Ensure we accept float numbers
        if (spec.filter.Accept('float')) {
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
      if (s.IfRegExp(r.Booleans)) {
        // Ensure the argument accepts a boolean value
        if (spec.filter.Accept('boolean')) {
          state = ScanState.FilterSeparator;
          return TokenType.Boolean;
        }

        error = ParseError.RejectBoolean;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      // If we get here, we will have either a variable or reference
      if (s.IfRegExp(r.OutputNameAlpha)) {
        // Filter argument accepts reference
        if (spec.filter.Accept('reference')) {
          // Match captured token with a cursor value
          spec.Cursor(s.token);

          // Check to to see if we are dealing with an object
          if (
            spec.TypeOfNode(NodeType.object) ||
            s.IsNextRegExp(r.PropertyNotation)
          ) {

            // Next call we will look for a property notation
            state = ScanState.Object;
            return TokenType.Object;
          }

          state = ScanState.FilterSeparator;
          return TokenType.Variable;
        }
      }

      // Missing filter argument, eg: {{ tag | filter: ^ }}
      state = ScanState.ParseError;
      error = ParseError.MissingFilterArgument;
      return Scan();

    case ScanState.FilterSeparator:
      // Validate filter arguments exists
      if (!spec.filter.exists) {
        // We have a comma separator character, lets proceed
        if (s.IfCodeChar(c.COM)) {
          state = ScanState.FilterArgument;
          return TokenType.Separator;
        }

        // Capture the next character sequence and ensure its valid
        // If the true, we have is invalid character, eg {{ t | foo: bar"^ }}
        if (!s.IsRegExp(r.FilterPipeOrClose)) {
          s.Advance(1, true);
          error = ParseError.InvalidCharacter;
          state = ScanState.GotoTagEnd;
          return TokenType.ParseError;
        }
      }

      // If last argument was processed pass back to filter
      if (spec.filter.last) {
        // Reset filter specification
        spec.filter.Reset();

        // Re-scan for additional filters
        state = ScanState.Filter;
        return Scan();
      }

      // Move to next argument in specification
      spec.filter.Next();

      // We have a comma separator character, lets proceed
      if (s.IfCodeChar(c.COM)) {
        state = ScanState.FilterArgument;
        return TokenType.Separator;
      }

      // TODO THINK ABOUT THIS LOGIC

      if (!spec.filter.required) {
        // Reset filter specification
        spec.filter.Reset();
        state = ScanState.Filter;

        return Scan();
      }

      if (s.IsRegExp(/^['"a-zA-Z0-9]/)) {
        error = ParseError.MissingFilterSeparator;
        state = ScanState.GotoTagEnd;
        return TokenType.ParseError;
      }

      error = s.IfRegExp(r.Spacing)
        ? ParseError.InvalidCharacter
        : ParseError.MissingFilterArgument;

      state = ScanState.GotoTagEnd;
      return TokenType.ParseError;

      // TODO HANDLE THE ARGUMENT TYPES

    case ScanState.FilterParameter:
      break;
    case ScanState.FilterParameterOperator:
      break;
    case ScanState.FilterParameterArgument:
      break;

    case ScanState.ControlCondition:

      // CHECK NUMBER

      // Condition is a integer or float number value, eg: {% if 100 %}
      if (s.IfRegExp(r.Number)) {
        state = ScanState.ControlOperator;
        return TokenType.ControlCondition;
      }

      // CHECK STRING

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

      // CHECK BOOLEAN

      // Lets check for boolean condition, eg {% if foo == true %}
      if (s.IfRegExp(r.Booleans)) {
        state = ScanState.ControlOperator;
        return TokenType.Boolean;
      }

      // CHECK ALPHA NUMERIC

      // Lets check for a reference variable name or object
      if (s.IfRegExp(r.ControlCondition)) {

        // Lets consult the specification to see if we know about the value
        // If we know about the value, we will validate it accordingly
        if (spec.object.Exists(s.token)) {

          // At this point we have a record of this value in the spec
          // We will update spec cursor and begin the specification walk
          spec.Cursor(s.token);

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

    case ScanState.ControlOperator:

      cache = ScanCache.Reset;

      // Lets validate the control operators provided, eg {% if foo ^== %}
      if (s.IfRegExp(r.ControlOperators)) {

        // Lets ensure that a comparison value was passed proceeding the operators
        if (s.IsRegExp(r.TagCloseClear)) {
          state = ScanState.GotoTagEnd;
          error = ParseError.MissingCondition;
          return TokenType.ParseError;
        }

        // Operators are valid, lets pass it back to check for another condition
        state = ScanState.ControlCondition;
        return TokenType.ControlOperator;
      }

      // If we get here no further conditions or comparison values
      // Lets now attempt to close the tag and ensure we have a clearance
      if (s.IsRegExp(r.TagCloseClear)) {
        state = ScanState.BeforeStartTagClose;
        return Scan();
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidOperator;
      return TokenType.ParseError;

    case ScanState.VariableIdentifier:

      // We will consume the variable keyword identifier, eg: {% assing var^ %}
      if (s.IfRegExp(r.TagKeyword)) {

        // TODO: HANDLE CAPTURES

        cache = ScanState.BeforeSingularTagClose;
        state = ScanState.GotoTagEnd;
        return TokenType.VariableKeyword;
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    case ScanState.VariableOperator:

      // If the variable requires an operator character, we consume
      if (s.IfCodeChar(c.EQS)) {
        state = ScanState.VariableAssignment;
        return TokenType.VariableKeyword;
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidOperator;
      return TokenType.ParseError;

    case ScanState.VariableAssignment:

      // Variable name keyword identifier can be wild
      if (s.IfRegExp(r.TagNameWild)) {
        state = ScanState.GotoTagEnd;
        return TokenType.VariableKeyword;
      }

      state = ScanState.GotoTagEnd;
      error = ParseError.InvalidCharacters;
      return TokenType.ParseError;

    // GOTO TAG END
    // -----------------------------------------------------------------
    case ScanState.GotoTagEnd:

      // We will attempt to move to the end of the tag and prevent
      // consuming any tags that might be otherwise nested within
      if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]/, false)) {
        state = cache;
        cache = ScanCache.Reset;
        return Scan();
      }

      // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

      state = ScanState.CharSeq;
      return CharSeq();

    case ScanState.ParseError:

      // Consume the token until ending delimiters
      if (s.ConsumeUnless(/-?[%}]\}/, /\{[{%]/)) {

        state = ScanState.TagClose;
        return cache === ScanCache.GotoEnd
          ? Scan()
          : TokenType.ParseError;
      }

      // TODO: WE WILL NEED TO DISPOSE OF CURRENT TOKEN

      state = ScanState.CharSeq;
      return CharSeq();

    // LIQUID CLOSE TAG
    // -----------------------------------------------------------------
    case ScanState.BeforeStartTagClose:
    case ScanState.BeforeEndTagClose:
    case ScanState.BeforeOutputTagClose:
    case ScanState.BeforeSingularTagClose:

      // Validate right side trim dash character
      if (s.IfCodeChar(c.DSH)) {

        // Check to see if whitespace proceeds the character
        if (s.SkipWhitespace()) {
          error = ParseError.RejectWhitespace;
          return TokenType.ParseError;
        }

        // We have asserted a trim character is valid
        // Next scan ensures the token is closed
        return TokenType.TrimDashRight;

      }

      // Ensure we can close the tag and no invalid characters exist
      if (!s.IsRegExp(/^[%}]\}/)) {

        // We will consume the invalid character or string
        if (s.ConsumeUnless(/[%}]\}/, /\{[{%]/)) {

          error = s.token?.length === 1
            ? ParseError.InvalidCharacter
            : ParseError.InvalidCharacters;

          // Process the error
          return TokenType.ParseError;

        }

        // If we get here we are missing a closing delimiter
        state = ScanState.CharSeq;
        error = ParseError.MissingCloseDelimiter;
        return TokenType.ParseError;
      }

      // Tag is closed so we will consume, eg: }} or %}
      if (s.IfRegExp(r.DelimitersClose)) {

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

      // Fall through, move to character sequencing
      return CharSeq();
  }

  return Scan();

}
