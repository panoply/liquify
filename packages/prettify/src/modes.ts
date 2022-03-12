import * as rules from './rules';
import { prettydiff } from './prettydiff/index';
import {
  IGlobalOptions,
  IMarkupOptions,
  IStyleOptions,
  IJSONOptions,
  IScriptOptions
} from './types/options';

const { assign } = Object;

/**
 * Updates formatting options
 *
 * Accepts global rule object
 */
export function options (options: IGlobalOptions) {

  assign(rules.markup, options.markup);
  assign(rules.style, options.style);
  assign(rules.json, options.json);
  assign(rules.script, options.script);

}

/**
 * Executes Markup beautification
 *
 * **Support Languages:**
 *
 * - HTML
 * - Liquid
 * - HTML + Liquid
 */
export function markup (input: string, options?: IMarkupOptions): Promise<string> {

  if (options) assign(rules.style, options);
  if (prettydiff.options.language !== 'html') prettydiff.options = rules.markup;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  assign(rules.markup, prettydiff.options);

  return new Promise((resolve, reject) => {

    if (prettydiff.sparser.parseError.length) return reject(prettydiff.sparser.parseError);

    return resolve(formatted);

  });

}

/**
 * Executes Script beautification
 *
 * **Support Languages:**
 *
 * - JavaScript
 * - JavaScript + Liquid
 * - JSX
 * - JSX + Liquid
 * - TypeScript
 * - TypeScript +  Liquid
 */
export function script (input: string, options?: IScriptOptions): Promise<string> {

  if (options) assign(rules.script, options);
  if (prettydiff.options.language !== 'javascript') prettydiff.options = rules.script;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  assign(rules.script, prettydiff.options);

  return new Promise((resolve, reject) => {

    if (prettydiff.sparser.parseError.length) return reject(prettydiff.sparser.parseError);

    return resolve(formatted);

  });

}

/**
 * Executes Style beautification
 *
 * **Support Languages:**
 *
 * - CSS
 * - CSS + Liquid
 * - SCSS
 * - SCSS + Liquid
 * - LESS
 * - LESS +  Liquid
 */
export function style (input: string, options?: IStyleOptions): Promise<string> {

  if (options) assign(rules.style, options);
  if (prettydiff.options.language !== 'css') prettydiff.options = rules.style;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  assign(rules.style, prettydiff.options);

  return new Promise((resolve, reject) => {

    if (prettydiff.sparser.parseError.length) return reject(prettydiff.sparser.parseError);

    return resolve(formatted);

  });

}

/**
 * Executes JSON beautification
 *
 * **Support Languages:**
 *
 * - JSON
 */
export function json (input: string, options?: IJSONOptions): Promise<string> {

  if (options) assign(rules.json, options);
  if (prettydiff.options.language !== 'json') prettydiff.options = rules.json;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  return new Promise((resolve, reject) => {

    if (prettydiff.sparser.parseError.length) return reject(prettydiff.sparser.parseError);

    return resolve(formatted);

  });

}
