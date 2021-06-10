import { TokenContext } from '../lexical/context';
import { Scanner } from '../parser/scanner';

/**
 * Context Generator
 *
 * Each token (tag) is constructed in an array,
 * The `context[]` stack is an array or arrays.
 *
 * @param {number} node
 */
export const Context = ((node) => {

  let context = [];

  /**
   * Returns the contexts of a specific node on the AST
   *
   * @param {number[]}  offsets
   * @returns {Parser.Context[][]}
   */
  function get (offsets) {
    return offsets.map((offset) => context[offset]);
  }

  /**
   * Add to stack
   *
   * @param {Parser.TokenContext} type
   */
  function add (type) {
    const entry = {
      type,
      start: Scanner.offset,
      end:
        TokenContext.Newline === type || TokenContext.Whitespace === type
          ? Scanner.offset + Scanner.space
          : Scanner.offset + Scanner.token.length,
      value:
        TokenContext.Newline === type || TokenContext.Whitespace === type
          ? Scanner.space
          : type === TokenContext.EndTag
            ? 'end' + Scanner.token
            : Scanner.token
    };

    if (type === TokenContext.OpenTag) node = context.push([ entry ]) - 1;
    else if (type === TokenContext.CloseTag) context[node].push(entry);
    else context[node].push(entry);
  }

  /**
   * Delete from array
   *
   * @param {number} start
   */
  const remove = (start) => {
    context.splice(start);

    node = start;
  };
  return {
    get,
    add,
    remove,
    reset: () => {
      context = [];
    },

    /**
     * Returns the context list
     *
     * @readonly
     * @returns {Parser.Context[][]}
     */
    get list () {
      return context;
    },

    /**
     * Returns the context stack size
     *
     * @readonly
     * @returns {number}
     */
    get size () {
      return context.length - 1;
    }
  };
})(NaN);