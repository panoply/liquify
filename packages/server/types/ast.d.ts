import { Diagnostic, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JSONDocument, ASTNode } from "vscode-json-languageservice";
import { Stylesheet } from "vscode-css-languageservice";
import { TokenTypes, TokenKinds } from "./parser";

type Token = [ start: string, end?: string ]

interface EmbeddedDocument {
  /**
   * Name of the tag
   */
  readonly name: string;
  /**
   * The token/s captured
   */
  readonly token: Token
  /**
   * The token Type
   */
  readonly type: TokenTypes;
  /**
   *
   */
  readonly kind?: keyof TokenKinds;
  readonly offset: number[];
  readonly objects?: Map<number, string[]> | boolean;
  readonly children?: Children[];
  readonly languageId?: string;
  readonly lineOffset?: number;
  readonly embeddedDocument?: TextDocument;
}

interface Children {
  name: string;
  token: string[];
  offset: number[];
  objects?: object[];
}

interface Objects {
  [offset: number]: string[]
}
/**
 * AST - Liquid syntax node tree
 *
 * @export
 */
interface AST {
  name: string;
  tag: number;
  type: number;
  kind: number;
  token: string[];
  offset: number[];
  objects?: Objects;
  params?: object[];
  filters?: object[];
  children?: Children[];
  argument?: object[];
  languageId?: string;
  lineOffset?: number;
  embeddedDocument?: TextDocument;
}


/**
 * AST Embedded Region - Properties present in the embedded regions
 * of the parsed AST representation
 *
 * @export
 */
export type ASTEmbeddedRegion = {
  name: string;
  tag: number;
  type: number;
  kind: number;
  token: { start: string; end: string };
  offset: { start: number[]; end: number[] };
  languageId: string;
  embeddedDocument: TextDocument;
  lineOffset: number;
};
