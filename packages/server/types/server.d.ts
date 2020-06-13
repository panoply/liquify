import { TextDocument } from "vscode-languageserver-textdocument";
import { JSONDocument, ASTNode } from "vscode-json-languageservice";
import { Stylesheet } from "vscode-css-languageservice";

/* ---------------------------------------------------------------- */
/* SERVER                                                           */
/* ---------------------------------------------------------------- */

/**
 * Client Initialization Options
 *
 * @export
 */
export type initializationOptions = {
  engine: "standard" | "shopify" | "jekyll";
  rcfile: string;
  spec: Specification;
  validate: ValidationRules;
  services: Services;
  format: FormattingRules;
};

/**
 * Provider Services Capability
 *
 * @export
 */
export type Provide = {
  format: boolean;
  hover: boolean;
  completion: boolean;
  validate: boolean;
};

/**
 * Language Services
 *
 * @export
 */
export type Services = {
  json: boolean;
  css: boolean;
  scss: boolean;
  javascript: boolean;
};

/**
 * Server Configure Event Parameter
 *
 * @export
 */
export type ServerConfigureParams =
  | "onDidChangeWatchedFiles"
  | "onDidChangeConfiguration";
