import { LanguageProperName } from '../common';
import { LiteralUnion } from 'type-fest';

export type PatternTypes =
  | 'comment.line' // single block comment
  | 'comment.documentation' // indicates documentation
  | 'comment.block' // multiline comment
  | 'meta.import' // import(), require(), import "", #include <>
  | 'meta.module' // package <name>, module <name>
  | 'section.scope' // begin, end
  | 'constant.type' // same like numeric, string, and boolean
  | 'constant.string' // not important tbh
  | 'constant.numeric' // Int, Uint, Float, Double
  | 'constant.boolean' // True, true, False, false
  | 'constant.dictionary' // Dict, Object, Associative Array
  | 'constant.array' // well.. array ofc
  | 'constant.null' // null, undefined, nil
  | 'keyword' // namespace, class
  | 'keyword.print' // println, echo, console.log(), System.WriteLine()
  | 'keyword.variable' // var, let, const'
  | 'keyword.control' // if, while, for, return, break, continue
  | 'keyword.visibility' // public, private, protected
  | 'keyword.other' // async, await, crate, extern
  | 'keyword.operator' // >, <, -, << not important tbh you could get away with this
  | 'keyword.function' // func pattern() {, function pattern(), fn pattern() {
  | 'macro' // @println, println!
  | 'not'; // not in current language

export interface LanguagePattern {
  pattern: RegExp;
  type: PatternTypes;
  nearTop?: boolean;
  unless?: RegExp;
  deterministic?: LanguageProperName
}

export interface Options {
  heuristic?: boolean;
  noUnknown?: boolean;
}

export interface DetectedLanguage {
  language: LiteralUnion<LanguageProperName, string>;
  statistics: Record<string, number>;
  linesOfCode: number;
}

export interface LanguagePoints {
  language: LiteralUnion<LanguageProperName, string>;
  points: number;
}
