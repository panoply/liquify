import { IGlobalOptions } from './types/options';
import { json, markup, script, style, options } from './modes';

export class Prettify implements IPrettify {

  constructor (rules: IGlobalOptions) { if (rules) options(rules); }

  /**
   * Formatting Error
   *
   * If formatting encountered an error this value
   * will contain a string else it will be null
   */
  error = null

  /**
   * Updates formatting options
   *
   * Accepts a global rule object, updates all formatting
   * options
   */
  rules (rules: IGlobalOptions) { return options(rules); }

  /**
   * Executes Markup beautification
   *
   * **Support Languages:**
   *
   * - HTML
   * - Liquid
   * - HTML + Liquid
   */
  markup (input: string) { return markup(input); }

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
  script (input: string) { return script(input); }

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
  style (input: string) { return style(input); }

  /**
   * Executes JSON beautification
   *
   * **Support Languages:**
   *
   * - JSON
   */
  json (input: string) { return json(input); }

}
