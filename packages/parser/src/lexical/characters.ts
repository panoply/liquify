/* eslint-disable no-unused-vars */

export enum CharCode {

  /**
   * `*` – Whitespace - Used to space characters
   */
  ARS = 42,

  /**
   * `<` – Left Angle Bracket - Used in HTML delimiters and Liquid operators
   */
  LAN = 60,

  /**
   * `>` – Right Angle Bracket - Used in HTML delimiters and Liquid operators
   */
  RAN = 62,

  /**
   * `{` – Left Curly Brace - Used in Liquid delimiters
   */
  LCB = 123,

  /**
   * `}` – Right Curly Brace - Used in Liquid delimiters
   */
  RCB = 125,

  /**
   * `!` – Bang character - Used in HTML comments and Liquid operators
   */
  BNG = 33,

  /**
   * `?` – Question Mark character - Used in Liquid tokens (sometimes)
   */
  QWS = 63,

  /**
   * `-` – Dash character - Used in Liquid delimiters (whitespace)
   */
  DSH = 45,

  /**
   * `%` – Percent character - Used in Liquid delimiters
   */
  PER = 37,

  /**
   * `|` – Pipe character - Used in Liquid filters
   */
  PIP = 124,

  /**
   * `.` – Dot chacter - Used in Liquid object properties
   */
  DOT = 46,

  /**
   * `:` – Colon character - Used in Liquid filter and iteration parameters
   */
  COL = 58,

  /**
   * `,` – Comma character - Used in Liquid filter parameters
   */
  COM = 44,

  /**
   * `=` – Equals character - Used in Liquid operators and assignments
   */
  EQS = 61,

  /**
   * `/` – Forward Slash Character - Used in HTML closing tags
   */
  FWS = 47,

  /**
   * `\` – Backward Slash Character - Used in HTML closing tags
   */
  BWS = 92,

  /**
   * `"` – Double Quoted Character - Used in Liquid to define string values
   */
  DQO = 34,

  /**
   * `'` – Single Quoted Character - Used in Liquid to define string values
   */
  SQO = 39,

  /**
   * `\n` – Newline Character - Used to check newlines
   */
  NWL = 10,

  /**
   * `\r` – Carriage Return Character - Used to check newlines
   */
  CAR = 13,

  /**
   * `\f` – Form Return Character - Used to check newlines
   */
  LFD = 12,

  /**
   * `\t` – Tabs - Used for tab spaces
   */
  TAB = 9,

  /**
   * `\s` – Whitespace - Used to space characters
   */
  WSP = 32,

  /**
   * `[` – Left Open Bracket - Used to Liquid arrays
   */
  LOB = 91,

  /**
   * `]` – Left Open Bracket - Used to Liquid arrays
   */
  ROB = 93,

  /**
   * `(` – Left Open Parenthesis - Used to Liquid Iterations
   */
  LOP = 40,

  /**
   * `)` – Right Open Parenthesis - Used to Liquid Iterations
   */
  ROP = 41,

}
