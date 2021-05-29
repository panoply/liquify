import { TextDocument } from "vscode-languageserver-textdocument";
import { Diagnostic } from "vscode-languageserver";
import { ASTNode } from "./ast";
export * as TextDocument from "vscode-languageserver-textdocument";

export interface Scope {
  /**
   * Document URI indentifier
   */
  //readonly uri: string;

  /**
   * Document Language ID
   */
  // languageId: LanguageIds;

  /**
   * Document Version
   *
   * @type {number}
   */
  // version: number;

  /**
   * AST
   *
   */
  ast: ASTNode[];

  /**
   * TextDocument
   *
   */
  textDocument: TextDocument;

  /**
   * Document Settings
   *
   * @type {object}
   */
  // settings: object;

  /**
   * Document Settings
   *
   * @type {object}
   */
  //contentChanges: ContentChanges[];

  /**
   * Diagnostics validations for the document
   */
  diagnostics: Diagnostic[];

  /**
   * Frontmatter converted to JSON
   */
  frontmatter?: object;

  /**
   * Linked Document index key locations
   * that exist in the AST
   */
  linkedDocuments: number[];

  /**
   * Embedded Documents index key locations
   * that exist in the AST
   */
  // embeddedDocuments: Map<string, TextDocument>;

  /**
   * Line Offsets
   *
   * @type {number[]}
   */
  //  lineOffsets: number[];

  /**
   * Document Text
   *
   * @type {function}
   */
  // content: string;
}
