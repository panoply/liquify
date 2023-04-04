/* eslint-disable no-use-before-define */

import { LiteralUnion } from 'type-fest';
import { GlobalRules } from './rules/global';
import { LiquidRules } from './rules/liquid';
import { MarkupRules } from './rules/markup';
import { StyleRules } from './rules/style';
import { ScriptRules } from './rules/script';
import { MarkupTypes, StyleTypes, ScriptTypes, LiquidTypes, ExtraTypes } from './parse/tokens';

/**
 * Option Rule Names Stirng Literal
 */
export type RuleNames = (
  | keyof GlobalRules
  | keyof LiquidRules
  | keyof MarkupRules
  | keyof StyleRules
  | keyof ScriptRules
)

/**
 * Language Rules names
 */
export type LanguageRuleNames = (
  | 'global'
  | 'liquid'
  | 'markup'
  | 'json'
  | 'style'
  | 'script'
)
/**
 * Lexer Names string literal
 */
export type LexerName = (
  | 'ignore'
  | 'auto'
  | 'text'
  | 'markup'
  | 'script'
  | 'style'
);

/**
 * Lexer Names string literal
 */
export type LanguageName = LiteralUnion<(
  | 'auto'
  | 'text'
  | 'html'
  | 'liquid'
  | 'javascript'
  | 'markdown'
  | 'jsx'
  | 'typescript'
  | 'tsx'
  | 'json'
  | 'css'
  | 'scss'
  | 'sass'
  | 'less'
  | 'xml'
  | 'unknown'
), string>

/**
 * The formatted proper names of supported languages
 */
export interface LanguageOfficialNameMap {
  text: 'Plain Text';
  html: 'HTML';
  liquid: 'Liquid';
  javascript: 'JavaScript'
  jsx: 'JSX';
  typescript: 'TypeScript';
  tsx: 'TSX';
  json: 'JSON';
  css: 'CSS';
  scss: 'SCSS';
  sass: 'SASS';
  less: 'LESS';
  xml: 'XML';
  yaml: 'YAML';
  markdown: 'Markdown';
}

/**
 * Language Proper name string literal
 */
export type LanguageOfficialName = LiteralUnion<keyof LanguageOfficialNameMap, string>;

/**
 * Lexer names as an array type
 */
export type LexerArray = LexerName[];

/**
 * Structure reference applied on parser. Otherwise known
 * as `scope` in the parser.
 */
export type Structure = [ token: string, index: number ];

/**
 * Structure Array Reference
 */
export class StructureEntries extends Array<Structure> {

  /**
   * The last know entry in the stack, which is referred to
   * to as `scope` in Prettify. Returns an object type,
   */
  get scope(): Structure;
  /**
   * An additional method for working with the `parse.structure` array.
   * This will update the last known entry with provided values. The function
   * accepts either `string`, `number`  types as a first parameter.
   *
   * - When a `string` type is provided then the last known token `[][0]` entry is updated
   * - When a `number` type is provided then the last known index `[][1]` entry is updated
   *
   * To update both the `Structure` array last known `token` and `index` entries then pass
   * the `token` as first parameter and `index` as second parameter.
   */
  update(token: string | number, index?: number): Structure;
  /**
   * Clear the structure entries, removing all values, excluded the initial `['global', -1]`
   * scope entry.
   */
  clear(): Structure;
  /**
   * The `parse.structure` array pop method is configured to
   * prevent removal of the initial `['global', -1]` scope entry.
   */
  pop(): Structure;

}
/**
 * Token Types string literal
 */
export type Types = LiteralUnion<`${
  | MarkupTypes
  | ExtraTypes
  | ScriptTypes
  | LiquidTypes
  | StyleTypes
}`, string>

/**
 * Statistic Reporting Model
 */
export interface Stats {
  /**
   * Parse processing time in miliseconds or seconds, eg: `100ms` or `1s`
   */
  time: string;
  /**
   * The number of characters contained in the source string.
   */
  chars: number;
  /**
   * The offical language name that was parsed
   */
  language: LanguageOfficialName;
  /**
   * The lexer name
   */
  lexer: LexerName;
}
