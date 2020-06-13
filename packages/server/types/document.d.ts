import { Diagnostic, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { AST } from "./ast";

export interface Document {
  ast: AST[];
  settings: {};
  textDocument: TextDocument;
  diagnostics: Diagnostic[];
}
