import { TextDocument, Position } from "vscode-languageserver-textdocument";
import { Diagnostic, TextDocumentItem } from "vscode-languageserver";
import { ASTNode, IAST } from "./ast";
export {
  TextDocumentContentChangeEvent as ContentChanges,
  TextDocumentItem,
} from "vscode-languageserver";
export * as TextDocument from "vscode-languageserver-textdocument";

export interface Scope {
  /**
   * AST
   *
   */
  iAST: IAST;

  /**
   * TextDocument
   *
   */
  textDocument: TextDocument;
}
