import type { Helper, Options } from 'types/prettify';
import { prettify } from '@prettify/model';
import { is, not } from '@utils/helpers';
import { cc, NIL, WSP } from '@utils/chars';
import { grammar } from '@options/grammar';

/* -------------------------------------------- */
/* MARKUP BEAUTIFICATION                        */
/* -------------------------------------------- */

prettify.beautify.style = function style (options: Options) {

  /* -------------------------------------------- */
  /* CONSTANTS                                    */
  /* -------------------------------------------- */

  /**
   * The beautified result
   */
  const build: string[] = [];

  /**
   * Reference to `options.parsed`
   */
  const data = prettify.data;

  /**
   * Cached option markup beautification rules
   */
  const rules = options.style;

  /**
   * Carriage return / Line Feed
   */
  const lf = options.crlf === true ? '\r\n' : '\n';

  /**
   * The input length
   */
  const len = prettify.end > 0 ? prettify.end + 1 : data.token.length;

  /**
   * Line preservation
   */
  const pres = options.preserveLine + 1;

  /**
   * Single unit of indentation
   */
  const tab = (() => {

    let aa = 0;
    const bb = [];

    do {
      bb.push(options.indentChar);
      aa = aa + 1;
    } while (aa < options.indentSize);

    return bb.join(NIL);

  })();

  /* -------------------------------------------- */
  /* LEXICAL SCOPES                               */
  /* -------------------------------------------- */

  /**
   * Indentation level - References `options.indentLevel`
   */
  let indent = options.indentLevel;

  /**
   * Holds the current index position.
   */
  let a = prettify.start;

  /**
   * When store - Holds reference to something (unsure what this is for?)
   */
  let when = [ NIL, NIL ];

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Type token helper utilities for querying
   * the `data.types` (options.parsed) AST tree.
   */
  const type: Helper.Type = {
    is: (index: number, name: string) => data.types[index] === name,
    not: (index: number, name: string) => data.types[index] !== name,
    idx: (index: number, name: string) => index > -1 && (data.types[index] || NIL).indexOf(name)
  };

  /**
   * Applies New lines plus indentation
   */
  function newline (tabs: number) {

    const linesout = [];

    const total = (() => {

      if (a === len - 1) return 1;

      if (data.lines[a + 1] - 1 > pres) return pres;
      if (data.lines[a + 1] > 1) return data.lines[a + 1] - 1;

      return 1;

    })();

    let index = 0;

    if (tabs < 0) tabs = 0;

    do {
      linesout.push(lf);
      index = index + 1;
    } while (index < total);

    if (tabs > 0) {
      index = 0;
      do {
        linesout.push(tab);
        index = index + 1;
      } while (index < tabs);
    }

    build.push(linesout.join(NIL));

  };

  // console.log(data);
  /* -------------------------------------------- */
  /* BEAUTIFICATION LOOP                          */
  /* -------------------------------------------- */

  do {

    if (type.is(a + 1, 'end') || type.is(a + 1, 'template_end') || type.is(a + 1, 'template_else')) {

      indent = indent - 1;

    }

    if (type.is(a, 'template') && data.lines[a] > 0) {

      build.push(data.token[a]);

      if (not(data.token[a + 1], cc.SEM) && grammar.style.units.has(data.token[a + 1]) === false) {

        newline(indent);

      }

    } else if (type.is(a - 1, 'selector') && type.is(a, 'template') && type.is(a + 1, 'selector')) {

      build.push(data.token[a]);

      // Template token select is proceeded by another selector
      // type then we apply an additional whitespace dash
      //
      if (is.last(data.token[a - 1], cc.DSH) && (
        is(data.token[a + 1], cc.DOT) ||
        is(data.token[a + 1], cc.HSH) ||
        is(data.token[a + 1], cc.AND)
      )) {

        build.push(WSP);

      }

    } else if (type.is(a, 'template_else')) {

      build.push(data.token[a]);

      indent = indent + 1;

      newline(indent);

    } else if (type.is(a, 'start') || type.is(a, 'template_start')) {

      indent = indent + 1;

      build.push(data.token[a]);

      if (type.not(a + 1, 'end') && type.not(a + 1, 'template_end')) {

        newline(indent);

      }

    } else if (is(data.token[a], cc.SEM) || (
      type.is(a, 'end') ||
      type.is(a, 'template_end') ||
      type.is(a, 'comment')
    )) {

      build.push(data.token[a]);

      if (type.is(a + 1, 'value')) {

        if (data.lines[a + 1] === 1) {

          build.push(WSP);

        } else if (data.lines[a + 1] > 1) {

          newline(indent);

        }

      } else if (type.not(a + 1, 'separator')) {

        if (type.not(a + 1, 'comment') || (type.is(a + 1, 'comment') && data.lines[a + 1] > 1)) {

          newline(indent);

        } else {

          build.push(WSP);

        }
      }

    } else if (is(data.token[a], cc.COL)) {

      build.push(data.token[a]);

      if (type.not(a + 1, 'selector') && not(data.token[a + 1], cc.COM)) {

        build.push(WSP);

      }

    } else if (type.is(a, 'selector') || type.is(a, 'at_rule')) {

      if (rules.classPadding === true && type.is(a - 1, 'end') && data.lines[a] < 3) {

        build.push(lf);

      }

      if (data.token[a].indexOf('and(') > 0) {

        data.token[a] = data.token[a].replace(/and\(/, 'and (');

        build.push(data.token[a]);

      } else if (data.token[a].indexOf('when(') > 0) {

        when = data.token[a].split('when(');

        build.push(when[0].replace(/\s+$/, NIL));

        newline(indent + 1);

        build.push(`when (${when[1]}`);

      } else {

        build.push(data.token[a]);
      }

      if (type.is(a + 1, 'start')) {

        build.push(WSP);

      }

    } else if (is(data.token[a], cc.COM)) {

      if (type.is(a + 1, 'value')) {

        newline(indent);
        build.push(data.token[a]);

      } else {

        build.push(data.token[a]);
      }
      if (type.is(a + 1, 'selector') || type.is(a + 1, 'property')) {
        newline(indent);
      } else {
        build.push(WSP);
      }

    } else if (data.stack[a] === 'map' && is(data.token[a + 1], cc.RPR) && a - data.begin[a] > 5) {

      build.push(data.token[a]);

      newline(indent);

    } else if (data.token[a] === 'x;') {

      newline(indent);

    } else if ((type.is(a, 'variable') || type.is(a, 'function')) &&
      rules.classPadding === true &&
      type.is(a - 1, 'end') &&
      data.lines[a] < 3
    ) {

      build.push(lf);
      build.push(data.token[a]);

    } else if (not(data.token[a], cc.SEM)) {

      build.push(data.token[a]);

    }

    a = a + 1;

  } while (a < len);

  prettify.iterator = len - 1;

  return build.join(NIL);

};
