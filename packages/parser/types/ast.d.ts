import { TokenType } from "enums/types";
import { TokenKind } from "enums/kinds";
import { TokenContext } from "enums/context";
import { TokenStack } from "enums/stack";
import { TokenTags } from "enums/tags";
import { ParseError } from "enums/errors";
import { TextDocument } from 'vscode-languageserver-textdocument'
import { IParseError, Token, Range, Offsets } from './index'


/**
 * The Children property array contains the children contained
 * within a tag. It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 */
export interface Children {
  name: string;
  token: string;
  offset: number[];
  range: Range;
  objects?: Specs.Objects;
}

export interface Context {
  type: TokenContext;
  stack?: TokenStack;
  value?: string | number;
  start: number;
  end: number;
}

export type Languages = (
  "liquid" |
  "html" |
  "yaml" |
  "javascript" |
  "json" |
  "css" |
  "scss"
)

/* -------------------------------------------- */
/*                      AST                     */
/* -------------------------------------------- */
export interface ASTNode {
  name: string;
  get start(): number;
  get end(): number;
  get errors(): IParseError[]
  get context(): number[];
  get document(): TextDocument;
  token: Token[];
  language: string & Languages,
  type: TokenType;
  index: number;
  kind: TokenKind;
  offsets: Offsets;
  range: Range;
  children?: Children[];
  content: string;
  singular: boolean
  objects?: { [offset: number]: string[] | number }
  filters?:  { [offset: number]: string }
  attributes?: {
    [attribute: string]: string
  }
  offset(offset: number): void
}
