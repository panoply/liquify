import { Scope, LanguageIds } from "./documents";
import { Diagnostic, Range, DocumentLink } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JSONDocument, ASTNode } from "vscode-json-languageservice";
import { Stylesheet } from "vscode-css-languageservice";

/**
 * Tags are captured and applied as an array of strings.
 * There should never be more than 2 values that exist
 * here. When the parser encounters tag blocks, value will be 2.
 *
 * ---
 *
 * A simple if condition _tag_ and object _singular_:
 *
 * ```liquid
 * {% if condition %}
 *  {{ tag }}
 * {% endif %}
 * ````
 * The parsed results would reflect the following:
 *
 * ```js
 * [
 *  // The `if` condition
 *  { token: ["{% if condition %}", "{% endif %}"] },
 *  // The `tag` object
 *  { token: ["{{ tag }}"] }
 * ]
 * ```
 *
 * The token value length is either 2 (tag blocks) or
 * 1 (singular).
 *
 */
export type Token = [start: string, end?: string]


/**
 * Tags offsets reflect the positions of each captured token
 * in the document. Offsets will either have a value of 2 or 4.
 *
 * ---
 *
 * When the parser encounters the following:
 *
 * ```liquid
 * {% if condition %}
 *  {{ tag }}
 * {% endif %}
 * ```
 * The parsed results would reflect the following:
 *
 * ```js
 * [
 *  // The `if` condition
 *  { offset: [ 0, 19, 30, 41 ] },
 *  // The `tag` object
 *  { offset: [ 20, 29 ] }
 * ]
 * ```
 *
 * Offset values will be incrementally modified post initial parse
 *
 */
export type Offsets = [number, number, number?, number?]

/**
 * Object properties are the the index offset location for
 * the starting point of properties.
 *
 * ---
 *
 * When the parser encounters the following tag:
 *
 * ```liquid
 * {{ object.prop | filter: object2.prop1.prop2 }}
 * ````
 *
 * The parsed results would reflect the following:
 *
 * ```js
 * {
 *   "10": [ "object", "prop"],
 *   "39": [ "object2", "prop1", "prop2" ]
 * }
 * ```
 * The property here reflects the starting position of
 * each objects possible properties. This enables completions
 * to be consumed and provided effectively.
 *
 */
export type Objects = { [offset: string]: string[] }

/**
 * Tag filters are parsed and applied when a `|` pipe character
 * is detected within a tag. Not all tags accept filter values
 * and the parser will refer to a tags specification reference before
 * it begins parsing filters.
 *
 * ---
 *
 * When the parser encounters the following tag:
 *
 * ```liquid
 * {{ some_object | append: 'foo' | replace: 'f',  'b'  }}
 * ````
 *
 * The parsed results would reflect the following:
 *
 * ```js
 * {
 *   append: { value: "object" },
 *   replace: { from: "f", to: "b" }
 * }
 * ```
 */
export type Filters = { [offset: string]: string[] }

/**
 * Tag Parameters are applied to the AST Node only when detected
 * or else this property will be undefined. Tag parameters are
 * rather hard to detect in the Liquid Language as they can be applied
 * and attach value with or without seperators character (eg: `,` )
 *
 * ---
 *
 * When the parser encounters the following tag:
 *
 * ```liquid
 * {% for tag in tags limit: 10 %}
 *  ...
 * {% endfor %}
 * ````
 *
 * The "limit: 10" value contained in the above tag will be
 * parsed and applied to the the node. It's important to note the
 * parameters are understood in various structures.
 *
 * ```liquid
 * {% render 'product' with featured_product as product %}
 * {% render 'name', my_variable: my_variable, another: 'foo' %}
 * {% include file.jekyll param="value" %}
 * ```
 *
 * The parser will also understand the parameters values provided
 * in the above example but can only do so because the render tag
 * has a specification attributed to it.
 */
export type Parameters = { [offset: string]: string[] }

/* -------------------------------------------- */
/*                  TOKEN TAGS                  */
/* -------------------------------------------- */

export type TokenTags =
  /**
   * Start Tag refers to a starting tag token of tag blocks. If
   * the parser detects a start tag post-parse, an error will be
   * thrown as start tags should conclude as type pair.
   *
   * ---
   * ```liquid
   *
   * {% tag %}
   * ```
   */
  | 1

  /**
   * Close Tag refers to closing tag token of tag blocks. If
   * the parser detects a close tag post-parse, an error will be
   * thrown as end tags should conclude as type pair.
   *
   * ---
   * ```liquid
   *
   * {% endtag %}
   * ```
   */
  | 2

  /**
   * Child Tag refers to child tag token within tag blocks
   *
   * ---
   * ```liquid
   *
   * {% elsif %}
   * ```
   */
  | 3

  /**
   * Singular Tag refers to a single non-block tag
   *
   * ---
   * ```liquid
   *
   * {% tag %}
   * {{ tag }}
   * ```
   */
  | 4

  /**
   * Pair Tag refers to a completed tag block. Pairs tags
   * are re-assigned to start tags to signify a sucessful and
   * completed tag block.
   *
   * ---
   * ```liquid
   *
   * {% tag condition %}
   *
   * {% endtag %}
   * ```
   *
   * When a start or close tag is detected, the parser will
   * throw an error. Pair type tags are valid.
   */
  | 5



/* -------------------------------------------- */
/*                  TOKEN KINDS                 */
/* -------------------------------------------- */

export type TokenKinds =
  /**
   * Tag Kind uses HTML Language syntax
   */
  | 1
  /**
   * Tag Kind uses Liquid Language syntax
   */
  | 2



/* -------------------------------------------- */
/*                  TOKEN TYPES                 */
/* -------------------------------------------- */

export type TokenTypes =
  /**
   * Associate Type, eg: `<tag> </tag>` | `{% tag %} {% endtag %}`
   */
  | 1
  /**
   * Control Type, eg: `{% if %}` | `{% unless %}`
   */
  | 2
  /**
   *  Comment Type, eg: `{% comment %}` | `<!--` | `/*` | `//`
   */
  | 3
  /**
   * Embedded Type, eg: `{% schema %}` | `<script>`
   */
  | 4
  /**
   * Include Type, eg: `{% include '' %}` | `{% render '' %}`
   */
  | 5
  /**
   * Iteration Type, eg: `{% for %}` | `{% cycle %}`
   */
  | 6
  /**
   * Object Type, eg: `{{ tag }}`
   */
  | 7
  /**
   * Output Type, eg: `{% assign = '' %}` | `{% capture %}`
   */
  | 8


/**
 * The Children property array contains the children contained
 * within a tag. It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 *
 * ---
 *
 * When the parser encounters the following tags:
 *
 * ```liquid
 * {% if condition %}
 *  {{ foo }}
 * {% else %}
 *  {{ bar }}
 * {% endif %}
 * ````
 *
 * The parsed results would reflect the following:
 *
 * ```js
 * {
 *  token: [ "{% if condition %}", "{% endif %}" ]
 *  children: [
 *    {
 *      name: 'else',
 *      token: [ '{% else %}' ],
 *      offset: [ 30, 40 ]
 *      // etc ....
 *    }
 *  ]
 * }
 * ```
 * Each child token of the tag, will be pushed onto the array
 * stack in ascending order. Diagnostics will validate placements.
 *
 */
export interface Children {

  name: string;
  tag: TokenTags;
  token: Token;
  offset: Offsets;
  objects?: Objects;

}

/* -------------------------------------------- */
/*                      AST                     */
/* -------------------------------------------- */

export interface AST {
  name: string;
  token: Token
  tag?: number;
  type?: TokenTypes;
  kind?: TokenKinds;
  offset: Offsets;
  objects?: Objects;
  filters?: Filters;
  parameters?: Parameters;
  children?: Children[];
  languageId?: string;
  lineOffset?: number;
  embeddedId?: number;
  embeddedDocument?: TextDocument;
  linkedId?: number;
  linkedDocument?: DocumentLink;
}



/* -------------------------------------------- */
/*                SCANNER OPTIONS               */
/* -------------------------------------------- */

export interface ScannerOptions  {
  ast?: AST[]
  content?: string
  isIncrement?: boolean
  index?:  undefined | number
}


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

/* -------------------------------------------- */
/*                    PARSER                    */
/* -------------------------------------------- */

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
  ASTNode: AST,
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
  ASTNode: AST,
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
  ASTNode: AST,
  contentChange: ContentChangeParams
) => number | null;

/**
 * Token Types
 *
 * @export
 */
export type GetOffsetOfToken = (
  ASTNode: AST,
  contentChange: ContentChangeParams,
  offsetAt: number
) => {
  ASTNode: AST;
  nodeIndex: number;
  nodeOffset: number[];
  offsetKeys: number;
};


/* -------------------------------------------- */
/*                 TOKEN CONTEXT                */
/* -------------------------------------------- */

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

/* -------------------------------------------- */
/*                    EXPORT                    */
/* -------------------------------------------- */

export as namespace Parser;
