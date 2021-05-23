import { Diagnostic, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

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

export as namespace Document;
