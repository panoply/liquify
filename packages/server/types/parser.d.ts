/* -------------------------------------------- */
/*              REGULAR EXPRESSIONS             */
/* -------------------------------------------- */

export type ParseExpressions = {
  frontmatter: RegExp;
  comment: RegExp;
  parsing: RegExp;
  objects: RegExp;
  filters: RegExp;
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
export type TokenKinds = {
  1: "html";
  2: "liquid";
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
