import { Diagnostic, Range } from "vscode-languageserver";
import { AST } from "./parser";

/* -------------------------------------------- */
/*             LANGUAGE IDENTIFIERS             */
/* -------------------------------------------- */

export type LanguageIds =
  | "liquid"
  | "liquid-shopify"
  | "liquify-jekyll"
  | "liquid-11ty";

/* -------------------------------------------- */
/*             DOCUMENT MODEL SCOPE             */
/* -------------------------------------------- */

export interface Scope {
  /**
   * Document URI indentifier
   */
  readonly uri: string;

  /**
   * Document Language ID
   */
  languageId: LanguageIds;

  /**
   * Document Version
   *
   * @type {number}
   */
  version: number;

  /**
   * AST
   *
   * @type {AST[]}
   */
  ast: AST[];

  /**
   * Document Settings
   *
   * @type {object}
   */
  settings: object;

  /**
   * Diagnostics validations for the document
   *
   * @type {Diagnostic[]}
   */
  diagnostics: Diagnostic[];

  /**
   * Frontmatter converted to JSON
   */
  frontmatter: object;

  /**
   * Linked Document index key locations
   * that exist in the AST
   */
  linkedDocuments: number[];

  /**
   * Embedded Documents index key locations
   * that exist in the AST
   */
  embeddedDocuments: number[];

  /**
   * Line Offsets
   *
   * @type {number[]}
   */
  lineOffsets: number[];

  /**
   * Document Text
   *
   * @type {function}
   */
  getText: (range?: Range) => string;
}

/* -------------------------------------------- */
/*           DOCUMENT FUNCTION PARAMS           */
/* -------------------------------------------- */

export as namespace Document;
