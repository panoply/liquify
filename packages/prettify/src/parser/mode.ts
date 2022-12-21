import type { Prettify, LanguageProperName } from 'types/prettify';
import { comment } from '@parser/comment';
import { parse } from '@parser/parse';
import { size, repeatChar } from '@utils/helpers';
import { NIL } from '@utils/chars';
import { keys } from '@utils/native';
import { detect, reference } from '@parser/language';

/**
 * Parse Input
 *
 * This a a little wrapper function which will invoke the
 * lexer and construct the data structure we will use in
 * the beautify process.
 */
export function parser (prettify: Prettify) {

  const { source, options } = prettify;
  const { lexer, language } = options;

  if (typeof prettify.lexers[lexer] === 'function') {
    prettify.lexers[lexer](`${source} `);
  } else {
    parse.error = `Specified lexer, ${lexer}, is not a function.`;
  }

  // Validate that all the data arrays are the same length
  let a = 0;
  let b = 0;

  const k = keys(parse.data);
  const c = k.length;

  do {

    b = a + 1;

    do {

      if (parse.data[k[a]].length !== parse.data[k[b]].length) {
        parse.error = `"${k[a]}" array is of different length than "${k[b]}"`;
        break;
      }

      b = b + 1;

    } while (b < c);

    a = a + 1;

  } while (a < c - 1);

  // Fix begin values.
  // They must be reconsidered after reordering from object sort
  if (parse.data.begin.length > 0) {
    if (lexer === 'script' && ((
      language === 'json' &&
      options.json.objectSort === true
    ) || (
      options.language !== 'json' &&
      options.script.objectSort === true
    ))) {
      parse.sortCorrect(0, parse.count + 1);
    } else if (lexer === 'style' && options.style.sortProperties === true) {
      parse.sortCorrect(0, parse.count + 1);
    }
  }

  return parse.data;

}

/**
 * Stats Information
 *
 * Wrapper for execution statistics available on
 * the export `format.stats`. Timer starts as soon
 * as the function is invoked.
 */
function stats (language: LanguageProperName) {

  const start: number = Date.now();
  const store: Partial<Prettify['stats']> = { language, chars: -1 };

  return (output: number): Prettify['stats'] => {

    store.chars = output;
    store.size = size(output);
    store.time = (Date.now() - start).toFixed(1) as any;

    return store as Prettify['stats'];

  };

}

/**
 * Blank Document
 *
 * Small function for dealing with blank or empty source strings.
 * Instead of Prettify passing an empty document to a lexer, we
 * quickly reason with the input.
 */
function blank (prettify: Prettify) {

  const { languageName } = reference(prettify.options.language);
  const crlf = prettify.options.crlf === true ? '\r\n' : '\n';
  const input = prettify.source.match(/\n/g);
  const timer = stats(languageName);

  let output: string = NIL;

  if (input === null) {

    if (prettify.options.endNewline) output = crlf;

    prettify.stats = timer(output.length);

  } else {

    output = input[0].length > prettify.options.preserveLine
      ? repeatChar(prettify.options.preserveLine, crlf)
      : repeatChar(input[0].length, crlf);

    if (prettify.options.endNewline) output += crlf;

    prettify.stats = timer(output.length);

  }

  return output;

}

/**
 * Mode Execution
 *
 * This function executes parse and beautification
 * actions.
 */
export function execute (prettify: Prettify) {

  prettify.data = parse.full();

  if (!/\S/.test(prettify.source)) return blank(prettify);

  if (prettify.options.language === 'text') {

    prettify.options.language = 'text';
    prettify.options.languageName = 'Plain Text';
    prettify.options.lexer = 'markup';

  } else if (prettify.options.language === 'auto' || prettify.options.language === undefined) {

    const { lexer, language, languageName } = detect(prettify.source);

    if (language === 'unknown') {
      console.warn('Prettify: unknown and/or unsupport language');
      console.info('Prettify: define a support language (fallback is HTML)');
    }

    prettify.options.lexer = lexer;
    prettify.options.language = language;
    prettify.options.languageName = languageName;

  } else {

    const { lexer, language, languageName } = reference(prettify.options.language);

    if (language === 'unknown') {
      console.warn(`Prettify: unsupport ${prettify.options.language}`);
      console.info('Prettify: language is not supported (fallback is HTML)');
    }

    prettify.options.lexer = lexer;
    prettify.options.language = language;
    prettify.options.languageName = languageName;

  }

  const time = stats(prettify.options.languageName);
  const mode = prettify.mode;
  const crlf = prettify.options.crlf === true ? '\r\n' : '\n';

  let output: string = prettify.source;

  if (comment(prettify) === false) {
    prettify.stats = time(output.length);
    return output;
  }

  prettify.data = parser(prettify);

  if (mode === 'parse') {
    prettify.stats = time(output.length);
    return parse.data;
  }

  output = prettify.beautify[prettify.options.lexer](prettify.options);
  output = prettify.options.endNewline === true
    ? output.replace(/\s*$/, crlf)
    : output.replace(/\s+$/, NIL);

  prettify.stats = time(output.length);
  prettify.end = 0;
  prettify.start = 0;

  return output;
}
