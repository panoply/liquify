import { TokenContext } from 'lexical/context';
import {
  Range
} from 'vscode-languageserver-textdocument';

/**
 * Abstract Syntax Tree
 *
 * This instance is generated for every document. It
 * contains methods to interact with parsed nodes and
 * also perform actions.
 */

/* -------------------------------------------- */
/* AST NODE                                     */
/* -------------------------------------------- */

/**
 * Node Children
 *
 * The Children property array contains the children contained
 * within a tag.
 *
 * **IMPORTANT**
 *
 * It's important to not that values here are only
 * applied to token that accept accept child tags, eg: `{% else %}`
 */
export interface Children {
  name: string;
  token: string;
  offset: number[];
  range: Range;
  objects?: Specs.Objects;
}

/**
 * Node Context
 *
 * Decribes the inner context of each node token.
 */
export interface Context {
  type: TokenContext;
  value?: string | number;
  start: number;
  end: number;
}
