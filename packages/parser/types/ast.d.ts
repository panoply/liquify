import { TokenType } from "enums/types";
import { TokenKind } from "enums/kinds";
import { TokenContext } from "enums/context";
import { TokenStack } from "enums/stack";
import { TokenTags } from "enums/tags";
import { TextDocumentItem, TextDocumentContentChangeEvent } from "vscode-languageserver";
import { TextDocument, Position, Range } from 'vscode-languageserver-textdocument'
import { IParseError, Token,  Offsets } from './index'

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


export class IAST {
  textDocument: TextDocument
  nodes: Parser.ASTNode[]
  embeds: number[]
  errors:IParseError[]
  cursor: [number, number]
  node: ASTNode
  get isEmbed(): boolean;
  update(change: TextDocumentContentChangeEvent): number;
  rangeFromOffsets(start: number, end: number): Range
  getNodeAt(position: Position | number): boolean
  getEmbedAt (position: Position | number):boolean
  getEmbeds(languages?: string[]): Parser.ASTNode[] | false
  getNodes(indexes: number[]): Parser.ASTNode[]
  getNodeContext(node?: Parser.ASTNode): {
    get context(): Context[]
  }
  getAssociates(): Parser.ASTNode[]
  getVariables(): void
  getScope (): void
  withinNode (position: Position | number): boolean
  withinBody(position: Position | number): boolean
  withinScope (position: Position | number): boolean
  withinToken (position: Position | number): boolean
  withinEmbed (position: Position | number): boolean
}

export interface IDocument {
  create: (textDocumentItem: TextDocumentItem) => IAST
  update: (textDocumentChange: TextDocumentContentChangeEvent) => IAST
}

/* -------------------------------------------- */
/*                      AST                     */
/* -------------------------------------------- */
export interface ASTNode {
  name: string;
  get start(): number;
  get end(): number;
  get context(): number[];
  get document(): TextDocument;
  token: Token[];
  language: string & Languages,
  type: TokenTags;
  errors: number
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
}
