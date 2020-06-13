/**
 * Type Definitions
 *
 * Please note that this project does is not written in TypeScript
 * and interfaces defined here are processed by JSDocs in order to
 * provide IntelliSense code completion features.
 */

import { Diagnostic, Range } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JSONDocument, ASTNode } from "vscode-json-languageservice";
import { Stylesheet } from "vscode-css-languageservice";

/* ---------------------------------------------------------------- */
/* DOCUMENTS                                                        */
/* ---------------------------------------------------------------- */

/**
 * Documents
 *
 * @export
 * @interface document
 */
export type document = {
  ast: AST[];
  diagnostics: Diagnostic[];
  completions: string[];
  embedded: string[];
  offsets: number[];
};

/* ---------------------------------------------------------------- */
/* FORMATTING                                                       */
/* ---------------------------------------------------------------- */

/**
 * Formatting Associate Tags
 *
 * @export
 */
export type FormattingAssociateTags = {
  language: keyof Services;
  kind?: "html" | "liquid";
  name: string;
  type?: TokenTypes;
  attr?: string;
};

/**
 * Formatting Rules and Settings
 *
 * @export
 */
export type FormattingRules = {
  ignore: {
    files: string[];
    tags: string[];
  };
  associateTags: FormattingAssociateTags[];
  excludedRules: string[];
  editorRules: {
    tabSize: number;
    wordWrapColumn: number;
  };
  customRules: {
    html?: object;
    css?: object;
    scss?: object;
    json?: object;
    javascript?: object;
  };
  languageRules: {
    html: object;
    css: object;
    scss: object;
    json: object;
    javascript: object;
  };
};

/* ---------------------------------------------------------------- */
/* VALIDATIONS                                                      */
/* ---------------------------------------------------------------- */

type TagValidation = {
  pair?: boolean;
  placement?: boolean;
  whitespace?: boolean;
  newline?: boolean;
};

type ControlValidation = {
  condition?: boolean;
  operator?: boolean;
};

type IterationValidation = {
  operator?: boolean;
  parameter?: boolean;
  iteree?: boolean;
};

type ObjectValidation = {
  name?: boolean;
  property?: boolean;
};

type FilterValidation = {
  existence?: boolean;
  parameter?: boolean;
};

/**
 * Validation Rules
 *
 * @export
 */
export type ValidationRules = {
  tag?: TagValidation;
  control?: ControlValidation;
  iteration?: IterationValidation;
  object?: ObjectValidation;
  filter?: FilterValidation;
};

/**
 * Validation Runner Parameters
 *
 * @export
 */
export type ValidationRunnerParams =
  | undefined
  | {
      tag?: keyof TagValidation;
      control?: keyof ControlValidation;
      iteration?: keyof IterationValidation;
      object?: keyof ObjectValidation;
      filter?: keyof FilterValidation;
    };

/**
 * Validation Requests
 *
 * @export
 */
export type ValidationRequests = {
  delayMs: number;
  pending: object;
};

/**
 * Validation Requests
 *
 * @export
 */
export type ValidationRuleModel = {
  name: string;
  token: string;
  tag: number;
  type: number;
  offset: number[];
  objects: object;
};

export type ValidationPromises = Promise<object[]>[];

/**
 * Tag Validation Rule Params
 *
 * @export
 */
export type ValidationRuleParams = (
  document: TextDocument,
  ASTnode: ASTValidationNode,
  rules: object,
  diagnostics: Diagnostic[]
) => object[];

/**
 * Meta Validation Settings
 *
 * @export
 */
export type ValidationMeta = {
  group: string;
  onCall: boolean;
  tags: number[];
  types: number[];
  rules: object;
};

/* ---------------------------------------------------------------- */
/* PARSER                                                           */
/* ---------------------------------------------------------------- */

export type ContentChangeParams = {
  range: {
    start: number;
    end: number;
  };
  rangeLength: number;
  text: string;
};

/**
 * Token Types
 *
 * @export
 */
export type IncrementalExecute = (
  ASTNode: DocumentModel,
  contentChange: ContentChangeParams
) => (
  params: []
) => {
  ast: {
    index: number;
    items: AST[];
  };
  offsets: {
    index: number;
    items: number[];
  };
};

/**
 * Token Types
 *
 * @export
 */
export type IncrementalUpdate = (
  ASTNode: DocumentModel,
  contentChange: ContentChangeParams,
  from?: number
) => {
  index: number;
  items: AST[] | number[];
};

/**
 * Token Types
 *
 * @export
 */
export type GetOffsetNearChange = (
  ASTNode: DocumentModel,
  contentChange: ContentChangeParams
) => number | null;

/**
 * Token Types
 *
 * @export
 */
export type GetOffsetOfToken = (
  ASTNode: DocumentModel,
  contentChange: ContentChangeParams,
  offsetAt: number
) => {
  ASTNode: AST;
  nodeIndex: number;
  nodeOffset: number[];
  offsetKeys: number;
};

/**
 * Token Types
 *
 * @export
 */
export type TokenTypes =
  | "associate"
  | "control"
  | "comment"
  | "embedded"
  | "filter"
  | "import"
  | "iteration"
  | "object"
  | "variable";

/**
 * Token Context
 *
 * @export
 */
export type TokenContext = {
  delimeters: string[];
  content: string[];
};

/**
 * Parsed Diagnostics Array
 *
 * @export
 */
export type ParsedDiagnostics = [number, Promise<object[]>];

/**
 * Embedded Documents
 *
 * @export
 */
export type EmbeddedDocuments = {
  id: number;
  uri: string;
  offset: [number, number];
  document: TextDocument;
};

/**
 * Documents Manager Model
 *
 * @export
 */
export type DocumentModel = {
  document: TextDocument;
  ast: AST[];
  diagnostics: ParsedDiagnostics[];
  embeds: EmbeddedDocuments[];
  lastOffset: number;
};

/* ---------------------------------------------------------------- */
/* AST - ABSTRACT SYNTAX TREE                                       */
/* ---------------------------------------------------------------- */

/**
 * AST - Liquid syntax node tree
 *
 * @export
 */
export type AST = {
  name: string;
  tag: number;
  type: number;
  kind: number;
  token: string[];
  offset: number[];
  objects?: Map<number, string[]> | boolean;
  children?: string[];
  languageId?: string;
  embeddedDocument?: TextDocument;
  languageDocument?: JSONDocument | Stylesheet;
};

/**
 * AST - Liquid syntax node tree
 *
 * @export
 */
export type ASTValidationNode = {
  name: string;
  tag: number;
  type: number;
  kind: number;
  token: string;
  offset: number[];
  objects?: Map<number, string[]> | boolean;
  children?: string[];
  languageId?: string;
  embeddedDocument?: TextDocument;
  languageDocument?: JSONDocument | Stylesheet;
};

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
