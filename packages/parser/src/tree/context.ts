import { TokenContext } from 'lexical/context';
import { token, spaces, offset } from 'parser/stream';

export interface IContext {
  type: TokenContext;
  value?: string | number;
  start: number;
  end: number;
}

export let context = [];

let node: number = NaN;

/**
 * Returns the contexts of a specific node on the AST
 *
 * @param {number[]}  offsets
 * @returns {Parser.Context[][]}
 */
export const get = (offsets: number[]): [IContext][] => offsets.map(n => context[n]);

/**
 * Add to stack
 */
export const add = (type: TokenContext) => {

  const entry = {
    type,
    start: offset,
    end: TokenContext.Newline === type || TokenContext.Whitespace === type
      ? offset + spaces
      : offset + token.length,
    value: TokenContext.Newline === type || TokenContext.Whitespace === type
      ? spaces
      : type === TokenContext.EndTag
        ? 'end' + token
        : token
  };

  if (type === TokenContext.OpenTag) node = context.push([ entry ]) - 1;
  else if (type === TokenContext.CloseTag) context[node].push(entry);
  else context[node].push(entry);
};

export const remove = (start: number) => {
  context.splice(start);
  node = start;
};

export const reset = () => { context = []; };

export const size = () => context.length - 1; ;
