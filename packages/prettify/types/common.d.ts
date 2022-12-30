/* eslint-disable no-use-before-define */

import { LiteralUnion } from 'type-fest';
import { MarkupTypes, StyleTypes, ScriptTypes, ExtraTypes } from './parse/tokens';
import { GlobalOptions } from './rules/global';
import { LiquidOptions } from './rules/liquid';
import { MarkupOptions } from './rules/markup';
import { StyleOptions } from './rules/style';
import { ScriptOptions } from './rules/script';

/**
 * Option Rule Names Stirng Literal
 */
export type RuleNames = (
  keyof LiquidOptions |
  keyof MarkupOptions |
  keyof GlobalOptions |
  keyof StyleOptions |
  keyof ScriptOptions
)

/**
 * Lexer Names string literal
 */
export type LexerNames = (
  | 'auto'
  | 'text'
  | 'markup'
  | 'script'
  | 'style'
);

/**
 * Lexer Names string literal
 */
export type LanguageNames = LiteralUnion<(
  | 'auto'
  | 'text'
  | 'html'
  | 'liquid'
  | 'javascript'
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
export interface LanguageProperNames {
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
export type LanguageProperName = LiteralUnion<keyof LanguageProperNames, string>;

/**
 * Lexer names as an array type
 */
export type LexerArray = LexerNames[];

/**
 * Structure reference applied on parser
 */
export type Structure = [token: string, index: number];

/**
 * Token Types string literal
 */
export type Types = LiteralUnion<`${MarkupTypes | ExtraTypes | ScriptTypes | StyleTypes}`, string>
