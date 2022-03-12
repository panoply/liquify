import { IGlobalOptions, IJSONOptions, IMarkupOptions, IScriptOptions, IStyleOptions } from './options';

/**
 * Updates formatting options
 *
 * Accepts global rule object
 */
export function options (options: IGlobalOptions): void

/**
 * Executes Markup beautification
 *
 * **Support Languages:**
 *
 * - HTML
 * - Liquid
 * - HTML + Liquid
 */
export function markup (input: string, options?: IMarkupOptions): Promise<string>

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
export function script (input: string, options?: IScriptOptions): Promise<string>

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
export function style (input: string, options?: IStyleOptions): Promise<string>

/**
 * Executes JSON beautification
 *
 * **Support Languages:**
 *
 * - JSON
 */
export function json (input: string, options?: IJSONOptions): Promise<string>
