import { LiquidParser } from '../../package/parser';

type LogColors = (
  'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgGrey'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright'
);

/* TO TOKEN ----------------------------------- */

export function toToken(input: string): string

/* DO MULTIPLE TESTS -------------------------- */

export function doTests (
  entries: string[] | [string, string][]
): (fn: (props: {
  title: string,
  input: string,
  token: string,
  match: string,
  newline: string
}) => {
  title: string,
  input: string,
  token: string,
  match: string,
  newline: string
}) => void

/* DOCUMENT ----------------------------------- */

export const document: string;

/* LOG ---------------------------------------- */

export function log(
  input: string,
  match: RegExp,
  colour: LogColors[] | LogColors
 ): string

/* SERVER CONFIG ------------------------------ */

export interface Server {
  languageId:string,
  version: number,
  text: document,
  uri: string
}

/* PARSER ------------------------------------- */

export const parser: LiquidParser;

/* NAMESPACE ---------------------------------- */

export as namespace Tests
