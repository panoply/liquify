
type languageAuto = [
  string,
  string,
  string
];

type lexers = 'markup' | 'script' | 'style';

type lexerArray = Array<lexers>;

export interface Parsed {
  begin: number[];
  ender: number[];
  lexer: string[];
  lines: number[];
  stack: string[];
  token: string[];
  types: string[];
}

interface Lexers { [key:string]: (source: string) => Parsed; }

interface option {
  default: boolean | number | string;
  definition: string;
  label: string;
  lexer: Array<'all'> | lexerArray;
  type: 'boolean' | 'number' | 'string';
  values?: {
    [key: string]: string;
  }
}

interface record {
  begin: number;
  ender: number;
  lexer: string;
  lines: number;
  stack: string;
  token: string;
  types: string;
}

interface spacer {
  array: string[];
  end : number;
  index: number;
}

interface splice {
  data: Parsed;
  howmany: number;
  index: number;
  record?: record;
}

interface wrapConfig {
  chars: string[];
  end: number;
  lexer: string;
  opening: string;
  start: number;
  terminator: string;
}

export interface Language {
  auto(sample: string, defaultLang: string): languageAuto;
  nameproper(input : string): string;
  setlexer(input : string): string;
}

export interface OptionDef {
  [key:string]: option;
}

export interface Parse {
  concat(data: Parsed, array: Parsed): void;
  count: number;
  data: Parsed;
  datanames: string[];
  lineNumber: number;
  linesSpace: number;
  objectSort(data: Parsed): void;
  pop(data: Parsed): record;
  push(data: Parsed, record: record, structure: string): void;
  references: string[][];
  safeSort(array: any[], operation: string, recursive: boolean): any[];
  sortCorrection(start:number, end:number): void;
  spacer(args: spacer): number;
  splice(spliceData: splice): void;
  structure: Array <[string, number]>;
  wrapCommentBlock(config: wrapConfig): [string, number];
  wrapCommentLine(config: wrapConfig): [string, number];
}

export interface Sparser {
  lexers?: Lexers;
  libs?: object;
  options?: any;
  parse?: Parse;
  parser(): Parsed;
  parseError?: string;
  version?: {
  date: string;
  number: string;
};
}
