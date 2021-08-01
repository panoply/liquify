import * as rules from './rules';
import { prettydiff } from './prettydiff/index';
import {
  IGlobalOptions,
  IMarkupOptions,
  IStyleOptions,
  IJSONOptions,
  IScriptOptions
} from './options';

/**
 * Updates formatting options
 *
 * Accepts global rule object
 */
export function options (options: IGlobalOptions) {

  const { assign } = Object;

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
export function markup (input: string, options?: IMarkupOptions): string {

  if (options) Object.assign(rules.style, options);
  if (prettydiff.options.language !== 'html') prettydiff.options = rules.markup;

  prettydiff.options.source = input;
  const formatted = prettydiff();
  Object.assign(rules.markup, prettydiff.options);

  if (prettydiff.sparser.parseError.length) {
    throw new Error(prettydiff.sparser.parseError);
  }

  return formatted;

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
export function script (input: string, options?: IScriptOptions): string {

  if (options) Object.assign(rules.script, options);
  if (prettydiff.options.language !== 'javascript') prettydiff.options = rules.script;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  Object.assign(rules.script, prettydiff.options);

  if (prettydiff.sparser.parseError.length) {
    throw new Error(prettydiff.sparser.parseError);
  }

  return formatted;

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
export function style (input: string, options?: IStyleOptions): string {

  if (options) Object.assign(rules.style, options);
  if (prettydiff.options.language !== 'css') prettydiff.options = rules.style;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  Object.assign(rules.style, prettydiff.options);

  if (prettydiff.sparser.parseError.length) {
    throw new Error(prettydiff.sparser.parseError);
  }

  return formatted;

}

/**
 * Executes JSON beautification
 *
 * **Support Languages:**
 *
 * - JSON
 */
export function json (input: string, options?: IJSONOptions): string {

  if (options) Object.assign(rules.json, options);
  if (prettydiff.options.language !== 'json') prettydiff.options = rules.json;

  prettydiff.options.source = input;

  const formatted = prettydiff();

  Object.assign(rules.json, prettydiff.options);

  if (prettydiff.sparser.parseError.length) {
    throw new Error(prettydiff.sparser.parseError);
  }

  return formatted;

}
