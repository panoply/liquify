import type { Options, Prettify } from 'types/prettify';
import { prettify } from '@prettify/model';
import { definitions } from '@options/definitions';
import { grammar } from '@options/grammar';
import { parse as parser } from '@parser/parse';
import { execute } from '@parser/mode';
import { keys, assign, defineProperty } from '@utils/native';

/* -------------------------------------------- */
/* LANGUAGE EXPORT                              */
/* -------------------------------------------- */

export { detect as language } from '@parser/language';

/* -------------------------------------------- */
/* FORMATTING HOOKS                             */
/* -------------------------------------------- */
format.before = function (callback: Prettify['hooks']['before'][number]) {

  prettify.hooks.before.push(callback);

};

format.after = function (callback: Prettify['hooks']['after'][number]) {

  prettify.hooks.after.push(callback);

};

/* -------------------------------------------- */
/* OPTIONS LISTENER                             */
/* -------------------------------------------- */

options.listen = function (callback: Prettify['hooks']['rules'][number]) {

  prettify.hooks.rules.push(callback);

};

/* -------------------------------------------- */
/* STATS GETTER                                 */
/* -------------------------------------------- */

defineProperty(format, 'stats', {
  get () {
    return prettify.stats;
  }
});

defineProperty(parse, 'stats', {
  get () {
    return prettify.stats;
  }
});

defineProperty(options, 'rules', {
  get () {
    return prettify.options;
  }
});

/* -------------------------------------------- */
/* FORMAT FUNCTION                              */
/* -------------------------------------------- */

function formatSync (source: string | Buffer, rules?: Options) {

  prettify.source = source;

  if (typeof rules === 'object') prettify.options = options(rules);

  // TRIGGER BEFORE HOOKS
  //
  if (prettify.hooks.before.length > 0) {
    for (const cb of prettify.hooks.before) {
      if (cb(prettify.options, source as string) === false) return source;
    }
  }

  // BEAUTIFY
  //
  const output = execute(prettify);

  // TRIGGER AFTER HOOKS
  //
  if (prettify.hooks.after.length > 0) {
    for (const cb of prettify.hooks.after) {
      if (cb.call(parser.data, output, prettify.options) === false) return source;
    }
  }

  if (parser.error.length) throw new Error(parser.error);

  // RESOLVE OUTPUT
  //
  return output;

}

function format (source: string | Buffer, rules?: Options) {

  prettify.source = source;

  if (typeof rules === 'object') prettify.options = options(rules);

  // TRIGGER BEFORE HOOKS
  //
  if (prettify.hooks.before.length > 0) {
    for (const cb of prettify.hooks.before) {
      if (cb(prettify.options, source as string) === false) return source;
    }
  }

  // BEAUTIFY
  //
  const output = execute(prettify);

  // TRIGGER AFTER HOOKS
  //
  if (prettify.hooks.after.length > 0) {
    for (const cb of prettify.hooks.after) {
      if (cb.call(parser.data, output, prettify.options) === false) return source;
    }
  }

  // RESOLVE OUTPUT
  //
  return new Promise((resolve, reject) => {

    if (parser.error.length) return reject(parser.error);

    return resolve(output);

  });

};

/* -------------------------------------------- */
/* OPTIONS FUNCTION                             */
/* -------------------------------------------- */

function options (rules: Options) {

  for (const rule of keys(rules) as Array<keyof Options>) {

    if ((rule in definitions) && definitions[rule].lexer === 'auto') {
      prettify.options[rule as string] = rules[rule];
    } else if (rule === 'liquid') {
      assign(prettify.options.liquid, rules.liquid);
    } else if (rule === 'markup') {
      assign(prettify.options.markup, rules.markup);
    } else if (rule === 'script') {
      assign(prettify.options.script, rules.script);
    } else if (rule === 'style') {
      assign(prettify.options.style, rules.style);
    } else if (rule === 'json') {
      assign(prettify.options.json, rules.json);
    } else if (rule === 'grammar') {
      grammar.extend(rules.grammar);
    } else if (rule in prettify.options) {
      prettify.options[rule as string] = rules[rule];
    }
  }

  // TRIGGER UPDATED HOOK
  //
  if (prettify.hooks.rules.length > 0) {
    for (const cb of prettify.hooks.rules) cb(prettify.options);
  }

  return prettify.options;

}

/* -------------------------------------------- */
/* PARSE FUNCTION                               */
/* -------------------------------------------- */

function parse (source: string | Buffer, rules?: Options) {

  prettify.source = source;
  prettify.mode = 'parse';

  if (typeof rules === 'object') prettify.options = options(rules);

  const formatted = execute(prettify);

  return new Promise((resolve, reject) => {

    if (parser.error.length) return reject(parser.error);

    return resolve(formatted);

  });

};

function parseSync (source: string | Buffer, rules?: Options) {

  prettify.source = source;
  prettify.mode = 'parse';

  if (typeof rules === 'object') prettify.options = options(rules);

  const parsed = execute(prettify);

  if (parser.error.length) throw new Error(parser.error);

  return parsed;

};

export { formatSync, format, options, parse, parseSync, definitions };
