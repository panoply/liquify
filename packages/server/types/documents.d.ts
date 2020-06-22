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

/**
 * An event describing a change to a text document. If range and rangeLength are omitted
 * the new text is considered to be the full content of the document.
 */
export interface ContentChanges {
  /**
   * The range offsets of the document that changed.
   */
  range?: {
    start: number;
    end: number;
  };
  /**
   * The length of the range that got replaced.
   */
  rangeLength?: number;
  /**
   * The new text of the document.
   */
  text: string;
}

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
   * Document Settings
   *
   * @type {object}
   */
  contentChanges: ContentChanges[];

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
  content: string;

  getText: (range?: Range) => string;
}

/* -------------------------------------------- */
/*           DOCUMENT FUNCTION PARAMS           */
/* -------------------------------------------- */

export as namespace Document;
