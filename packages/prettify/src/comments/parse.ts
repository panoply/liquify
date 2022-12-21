import { Record, WrapComment } from 'types/prettify';
import { parse } from '@parser/parse';
import { prettify } from '@prettify/*';
import { NWL, NIL, WSP, cc as ch } from '@utils/chars';
import { sanitizeComment, ws, is, not } from '@utils/helpers';
import { CharEscape, LiqDelims, StripEnd, StripLead } from '@utils/regex';

/**
 * Wrap Comment Block
 *
 * Beautification and handling for block style comments.
 * Traversal lexing for all comment identified sequences.
 */
export function wrapCommentBlock (config: WrapComment): [string, number] {

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  /**
   * Deconstructed Rules
   */
  const { options } = prettify;

  /**
   * The composed output structure
   */
  const build = [];

  /**
   * An additional composed structure
   */
  const second = [];

  /**
   * Line endings
   */
  const lf = options.crlf === true ? '\r\n' : NWL;

  /**
   * Sanatized opening delimiter sequence
   */
  const sanitize = config.begin.replace(CharEscape, sanitizeComment);

  /**
   * Whether or not we are dealing with a Liquid comment
   */
  const liqcomm = is(config.begin[0], ch.LCB) && is(config.begin[1], ch.PER);

  /**
   * Regular expression for ignore comment starters
   */
  const regIgnore = new RegExp(`^(${sanitize}\\s*@prettify-ignore-start)`);

  /**
   * Regular expression start type comment blocks
   */
  const regStart = new RegExp(`(${sanitize}\\s*)`);
  /**
   * Liquid ending expression
   */
  const regEnd: RegExp = liqcomm
    ? new RegExp(`\\s*${config.ender.replace(LiqDelims, i => is(i, ch.LCB) ? '{%-?\\s*' : '\\s*-?%}')}$`)
    : new RegExp(config.ender.replace(CharEscape, sanitizeComment));

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  /**
   * Starting index offset of the comment
   */
  let a = config.start;
  let b = 0;
  let c = 0;
  let d = 0;

  /**
   * Length store reference
   */
  let len = 0;

  /**
   * Newlines store reference
   */
  let lines = [];

  /**
   * Whitespace reference
   */
  let space = NIL;

  /**
   * Iterator `b` line
   */
  let bline = NIL;

  /**
   * Whether or not empty line is contained
   */
  let emptyLine = false;

  /**
   * Whether or not bullet point lines are contained
   */
  let bulletLine = false;

  /**
   * Whether or not numbered lines are contained
   */
  let numberLine = false;

  /**
   * The generated output token
   */
  let output = NIL;

  /**
   * Termination length, ie: The `end` tag token size
   */
  let terml = config.ender.length - 1;

  /**
   * Last known character of the terminator, ie: `end[end.length - 1]`
   */
  let term = config.ender.charAt(terml);

  /**
   * Terminator wrap length
   */
  let twrap = 0;

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Empty Lines
   *
   * Detects new lines and populates the `second[]` store build.
   */
  function emptyLines () {

    if (/^\s+$/.test(lines[b + 1]) || lines[b + 1] === NIL) {
      do b = b + 1;
      while (b < len && (/^\s+$/.test(lines[b + 1]) || lines[b + 1] === NIL));
    }

    if (b < len - 1) second.push(NIL);

  };

  /**
   * Ignore Comment
   *
   * Detects and traverses an ignore control type comment.
   */
  function ignoreComment (): [string, number] {

    let termination = NWL;

    a = a + 1;

    do {

      build.push(config.chars[a]);

      // Supports comment start/end comment ignores using Liquid
      // tags. We don't have any knowledge of the comment formation
      // upon parse, this will re-assign the terminator
      //
      if (build.slice(build.length - 20).join(NIL) === '@prettify-ignore-end') {

        if (liqcomm) {
          const d = config.chars.indexOf('{', a);
          if (is(config.chars[d + 1], ch.PER)) {
            const ender = config.chars.slice(d, config.chars.indexOf('}', d + 1) + 1).join(NIL);
            if (regEnd.test(ender)) config.ender = ender;
          }
        }

        a = a + 1;
        break;
      }

      a = a + 1;

    } while (a < config.end);

    b = a;

    terml = config.begin.length - 1;
    term = config.begin.charAt(terml);

    do {

      // Script OR Style Comment Blocks
      if (config.begin === '/*' && is(config.chars[b - 1], ch.FWS) && (
        is(config.chars[b], ch.ARS) ||
        is(config.chars[b], ch.FWS)
      )) {

        break;
      }

      // Markup Comment Blocks
      if (
        config.begin !== '/*' &&
        config.chars[b] === term &&
        config.chars.slice(b - terml, b + 1).join(NIL) === config.begin
      ) {

        break;
      }

      b = b - 1;

    } while (b > config.start);

    if (config.begin === '/*' && is(config.chars[b], ch.ARS)) {
      termination = '\u002a/';
    } else if (config.begin !== '/*') {
      termination = config.ender;
    }

    terml = termination.length - 1;
    term = termination.charAt(terml);

    if (termination !== NWL || config.chars[a] !== NWL) {

      do {

        build.push(config.chars[a]);

        if (termination === NWL && config.chars[a + 1] === NWL) {
          break;
        }

        if (config.chars[a] === term && config.chars.slice(a - terml, a + 1).join(NIL) === termination) {
          break;
        }

        a = a + 1;

      } while (a < config.end);

    }

    if (config.chars[a] === NWL) a = a - 1;

    output = build.join(NIL).replace(StripEnd, NIL);

    return [ output, a ];
  }

  do {

    build.push(config.chars[a]);

    if (config.chars[a] === NWL) parse.lineNumber = parse.lineNumber + 1;
    if (config.chars[a] === term && config.chars.slice(a - terml, a + 1).join(NIL) === config.ender) break;

    a = a + 1;

  } while (a < config.end);

  output = build.join(NIL);

  if (regIgnore.test(output) === true) return ignoreComment();

  if (
    ((
      liqcomm === true &&
      options.liquid.preserveComment === true
    ) || (
      liqcomm === false &&
      options.markup.preserveComment === true
    )) ||
    options.wrap < 1 ||
    a === config.end || (
      output.length <= options.wrap &&
      output.indexOf(NWL) < 0
    ) || (
      config.begin === '/*' &&
      output.indexOf(NWL) > 0 &&
      output.replace(NWL, NIL).indexOf(NWL) > 0 &&
      (/\n(?!(\s*\*))/).test(output) === false
    )
  ) {

    return [ output, a ];
  }

  b = config.start;

  if (b > 0 && not(config.chars[b - 1], ch.NWL) && ws(config.chars[b - 1])) {
    do b = b - 1;
    while (b > 0 && not(config.chars[b - 1], ch.NWL) && ws(config.chars[b - 1]));
  }

  space = config.chars.slice(b, config.start).join(NIL);

  const spaceLine = new RegExp(NWL + space, 'g');

  lines = output
    .replace(/\r\n/g, NWL)
    .replace(spaceLine, NWL)
    .split(NWL);

  len = lines.length;
  lines[0] = lines[0].replace(regStart, NIL);
  lines[len - 1] = lines[len - 1].replace(regEnd, NIL);

  if (len < 2) lines = lines[0].split(WSP);

  if (lines[0] === NIL) {
    lines[0] = config.begin;
  } else {
    lines.splice(0, 0, config.begin);
  }

  len = lines.length;
  b = 0;

  do {

    bline = (b < len - 1) ? lines[b + 1].replace(StripLead, NIL) : NIL;

    if (/^\s+$/.test(lines[b]) === true || lines[b] === NIL) {

      emptyLines();

    } else if (
      lines[b].replace(StripLead, NIL).length > options.wrap &&
      lines[b].replace(StripLead, NIL).indexOf(WSP) > options.wrap
    ) {

      lines[b] = lines[b].replace(StripLead, NIL);

      c = lines[b].indexOf(WSP);

      second.push(lines[b].slice(0, c));

      lines[b] = lines[b].slice(c + 1);

      b = b - 1;

    } else {

      lines[b] = (config.begin === '/*' && lines[b].indexOf('/*') !== 0)
        ? `   ${lines[b].replace(StripLead, NIL).replace(StripEnd, NIL).replace(/\s+/g, WSP)}`
        : `${lines[b].replace(StripLead, NIL).replace(StripEnd, NIL).replace(/\s+/g, WSP)}`;

      twrap = b < 1 ? options.wrap - (config.begin.length + 1) : options.wrap;

      c = lines[b].length;
      d = lines[b].replace(StripLead, NIL).indexOf(WSP);

      if (c > twrap && d > 0 && d < twrap) {

        c = twrap;

        do {
          c = c - 1;
          if (ws(lines[b].charAt(c)) && c <= options.wrap) break;
        } while (c > 0);

        if (/^\s*\d+\.\s/.test(lines[b]) === true && /^\s*\d+\.\s/.test(lines[b + 1]) === false) {
          lines.splice(b + 1, 0, '1. ');
        }

        if ((/^\s+$/).test(lines[b + 1]) === true || lines[b + 1] === NIL) {

          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          emptyLine = true;
          b = b - 1;

        } else if (/^\s*[*-]\s/.test(lines[b + 1])) {

          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          bulletLine = true;
          b = b - 1;

        } else if (/^\s*\d+\.\s/.test(lines[b + 1])) {

          second.push(lines[b].slice(0, c));
          lines[b] = lines[b].slice(c + 1);
          numberLine = true;
          b = b - 1;

        } else if (lines[b].replace(StripLead, NIL).indexOf(WSP) < options.wrap) {
          lines[b + 1] = lines[b].length > options.wrap
            ? lines[b].slice(c + 1) + lf + lines[b + 1]
            : `${lines[b].slice(c + 1)} ${lines[b + 1]}`;
        }

        if (emptyLine === false && bulletLine === false && numberLine === false) {

          lines[b] = lines[b].slice(0, c);

        }

      } else if (
        lines[b + 1] !== undefined && (
          (
            lines[b].length + bline.indexOf(WSP) > options.wrap &&
            bline.indexOf(WSP) > 0
          ) || (
            lines[b].length + bline.length > options.wrap &&
            bline.indexOf(WSP) < 0
          )
        )
      ) {

        second.push(lines[b]);

        b = b + 1;

      } else if (
        lines[b + 1] !== undefined &&
        /^\s+$/.test(lines[b + 1]) === false &&
        lines[b + 1] !== NIL &&
        /^\s*(?:[*-]|\d+\.)\s/.test(lines[b + 1]) === false
      ) {

        // LIQUID COMMENTS ARE AUGMENTED HERE
        second.push(lines[b]);

        emptyLine = true;
      } else {

        second.push(lines[b]);
        emptyLine = true;

      }

      bulletLine = false;
      numberLine = false;
    }

    b = b + 1;

  } while (b < len);

  if (second.length > 0) {

    if (second[second.length - 1].length > options.wrap - (config.ender.length + 1)) {
      second.push(config.ender);
    } else {

      second.push(config.ender);
      // second[second.length - 1] = `${second[second.length - 1]} ${config.ender}`;
    }

    output = second.join(lf);

  } else {
    lines[lines.length - 1] = lines[lines.length - 1] + config.ender;
    output = lines.join(lf);
  }

  // console.log(output);

  /* -------------------------------------------- */
  /* RETURN COMMENT                               */
  /* -------------------------------------------- */

  return [ output, a ];

}

/**
 * Wrap Comment Lines
 *
 * Parsing of comment line type tokens
 * Beautification and handling for block style comments.
 * Traversal lexing for all comment identified sequences.
 */
export function wrapCommentLine (config: WrapComment): [string, number] {

  const { wrap, preserveComment } = prettify.options;

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  let a: number = config.start;
  let b: number = 0;
  let output: string = NIL;
  let build: string[] = [];

  function recurse () {

    let line = NIL;

    do {
      b = b + 1;
      if (is(config.chars[b + 1], ch.NWL)) return;
    } while (b < config.end && ws(config.chars[b]));

    if (config.chars[b] + config.chars[b + 1] === '//') {

      build = [];

      do {
        build.push(config.chars[b]);
        b = b + 1;
      } while (b < config.end && not(config.chars[b], ch.NWL));

      line = build.join(NIL);

      if (/^\/\/ (?:[*-]|\d+\.)/.test(line) === false && /^\/\/\s*$/.test(line) === false) {
        output = `${output} ${line.replace(/(^\/\/\s*)/, NIL).replace(StripEnd, NIL)}`;
        a = b - 1;
        recurse();
      }
    }

  };

  function wordWrap () {

    /**
     * Line store
     */
    const lines: string[] = [];

    /**
     * Record to be applied in data structure
     */
    const record: Partial<Record> = {
      ender: -1,
      types: 'comment',
      lexer: config.lexer,
      lines: parse.linesSpace
    };

    if (parse.count > -1) {
      record.begin = parse.structure[parse.structure.length - 1][1];
      record.stack = parse.structure[parse.structure.length - 1][0];
      record.token = parse.data.token[parse.count];
    } else {
      record.begin = -1;
      record.stack = 'global';
      record.token = NIL;
    };

    let c = 0;
    let d = 0;

    output = output
      .replace(/\s+/g, WSP)
      .replace(StripEnd, NIL);

    d = output.length;

    if (wrap > d) return;

    do {
      c = wrap;

      if (not(output[c], ch.WSP)) {

        do c = c - 1;
        while (c > 0 && not(output[c], ch.WSP));

        if (c < 3) {
          c = wrap;
          do c = c + 1;
          while (c < d - 1 && not(output[c], ch.WSP));
        }

      }

      lines.push(output.slice(0, c));

      output = `// ${output.slice(c).replace(StripLead, NIL)}`;

      d = output.length;
    } while (wrap < d);

    c = 0;
    d = lines.length;

    do {

      record.token = lines[c];
      parse.push(parse.data, record as Record, NIL);
      record.lines = 2;
      parse.linesSpace = 2;
      c = c + 1;

    } while (c < d);

  };

  do {
    build.push(config.chars[a]);
    a = a + 1;
  } while (a < config.end && not(config.chars[a], ch.NWL));

  if (a === config.end) {

    // Necessary because the wrapping logic expects line termination
    config.chars.push(NWL);

  } else {
    a = a - 1;
  }

  output = build.join(NIL).replace(StripEnd, NIL);

  if ((/^(\/\/\s*@prettify-ignore-start\b)/).test(output) === true) {

    let termination = NWL;

    a = a + 1;

    do {

      build.push(config.chars[a]);
      a = a + 1;

    } while (a < config.end && (
      not(config.chars[a - 1], 100) || (
        is(config.chars[a - 1], 100) &&
        build.slice(build.length - 20).join(NIL) !== '@prettify-ignore-end'
      ))
    );

    b = a;

    do; while (b > config.start && is(config.chars[b - 1], ch.FWS) && (
      is(config.chars[b], ch.ARS) ||
      is(config.chars[b], ch.FWS)
    ));

    if (is(config.chars[b], ch.ARS)) termination = '\u002a/';
    if (termination !== NWL || not(config.chars[a], ch.NWL)) {

      do {
        build.push(config.chars[a]);
        if (termination === NWL && is(config.chars[a + 1], ch.NWL)) break;
        a = a + 1;
      } while (a < config.end && (termination === NWL || (
        termination === '\u002a/' && (
          is(config.chars[a - 1], ch.ARS) ||
          is(config.chars[a], ch.FWS)
        ))
      ));

    }

    if (config.chars[a] === NWL) a = a - 1;

    output = build.join(NIL).replace(StripEnd, NIL);

    return [ output, a ];
  }

  if (output === '//' || preserveComment === true) return [ output, a ];

  output = output.replace(/(\/\/\s*)/, '// ');

  if (wrap < 1 || (a === config.end - 1 && parse.data.begin[parse.count] < 1)) return [ output, a ];

  b = a + 1;

  recurse();
  wordWrap();

  /* -------------------------------------------- */
  /* RETURN COMMENT                               */
  /* -------------------------------------------- */

  return [ output, a ];

}
