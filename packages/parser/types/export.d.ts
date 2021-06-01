import { Context, IParseError, Variation  } from "./index";
import { ASTNode } from "./ast";
import { Scope, TextDocument } from "./vscode";
import { Options } from "./options";
export { TokenKind } from '../src/enums/kinds'
export { TokenTags } from '../src/enums/tags'

interface CharCodes  {
  /**
   * `*` – Whitespace - Used to space characters
   */
  ARS?: number;

  /**
   * `<` – Left Angle Bracket - Used in HTML delimiters and Liquid operators
   */
  LAN?: number;

  /**
   * `>` – Right Angle Bracket - Used in HTML delimiters and Liquid operators
   */
  RAN?: number;

  /**
   * `{` – Left Curly Brace - Used in Liquid delimiters
   */
  LCB?: number;

  /**
   * `}` – Right Curly Brace - Used in Liquid delimiters
   */
  RCB?: number;

  /**
   * `!` – Bang chanter - Used in HTML comments and Liquid operators
   */
  BNG?: number;

  /**
   * `-` – Dash character - Used in Liquid delimiters (whitespace)
   */
  DSH?: number;

  /**
   * `%` – Percent character - Used in Liquid delimiters
   */
  PER?: number;

  /**
   * `|` – Pipe character - Used in Liquid filters
   */
  PIP?: number;

  /**
   * `.` – Dot chacter - Used in Liquid object properties
   */
  DOT?: number;

  /**
   * `:` – Colon character - Used in Liquid filter and iteration parameters
   */
  COL?: number;

  /**
   * `,` – Comma character - Used in Liquid filter parameters
   */
  COM?: number;

  /**
   * `=` – Equals character - Used in Liquid operators and assignments
   */
  EQS?: number;

  /**
   * `/` – Forward Slash Character - Used in HTML closing tags
   */
  FWS?: number;

  /**
   * `\` – Backward Slash Character - Used in HTML closing tags
   */
  BWS?: number;

  /**
   * `"` – Double Quoted Character - Used in Liquid to define string values
   */
  DQO?: number;

  /**
   * `'` – Single Quoted Character - Used in Liquid to define string values
   */
  SQO?: number;

  /**
   * `\n` – Newline Character - Used to check newlines
   */
  NWL?: number;

  /**
   * `\r` – Carriage Return Character - Used to check newlines
   */
  CAR?: number;

  /**
   * `\f` – Form Return Character - Used to check newlines
   */
  LFD?: number;

  /**
   * `\t` – Tabs - Used for tab spaces
   */
  TAB?: number;

  /**
   * `\s` – Whitespace - Used to space characters
   */
  WSP?: number;

  /**
   * `[` – Left Open Bracket - Used to Liquid arrays
   */
  LOB?: number;

  /**
   * `]` – Left Open Bracket - Used to Liquid arrays
   */
  ROB?: number;

  /**
   * `(` – Left Open Parenthesis - Used to Liquid Iterations
   */
  LOP?: number;

  /**
   * `)` – Right Open Parenthesis - Used to Liquid Iterations
   */
  ROP?: number;
}


export const CodeChars: CharCodes


// for consumers of Leaflet using modules
export function LiquidParser (options: Options): {
  engine: (engine: Specs.Engine) => void;
  get errors(): IParseError[];
  get spec(): Variation;
  get node(): ASTNode;
  get context(): Context;
  get isEmbeddedNode(): boolean;
  parse: (scope: Scope) => Scope;
  getAssociates: (AST: ASTNode[]) => ASTNode[];
  getEmbeds: (AST: ASTNode[], languages?: string[]) => ASTNode[] | false;
  getEmbeddedNode(
    AST: ASTNode[],
    position: TextDocument.Position | number
  ): ASTNode;
  getNode: (
    AST: ASTNode[],
    position: TextDocument.Position | number
  ) => ASTNode;
  withinEmbed: (offset: number) => boolean;
  withinToken: (offset: number) => boolean;
  withinNode: (offset: number) => boolean;
  withinScope(AST: ASTNode[], position: TextDocument.Position): boolean;
  isCodeChar(code: number, position: TextDocument.Position): boolean;
  isRegExp(regex: RegExp, position: TextDocument.Position): boolean;
}


