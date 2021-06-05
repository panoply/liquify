import { TokenContext } from 'lexical/context'
import scanner from 'parser/scanner'

/**
 * Context Generator
 *
 * Each token (tag) is constructed in an array,
 * The `context[]` stack is an array or arrays.
 *
 * @param {number} node
 */
export default (function Context (node) {

  const refs = new Map()

  let context = []

  function Update (uri) {

    if (!refs.has(uri)) context = refs.set(uri, []).get(uri)
    else context = refs.get(uri)

  }

  /**
   * Returns the contexts of a specific node on the AST
   *
   * @param {number[]}  offsets
   * @returns {Parser.Context[][]}
   */
  function get (offsets) {

    return offsets.map(offset => context[offset])

  }

  /**
   * Add to stack
   *
   * @param {Parser.TokenContext} type
   */
  function add (type) {

    const entry = {
      type,
      start: scanner.offset,
      end: TokenContext.Newline === type || TokenContext.Whitespace === type
        ? scanner.offset + scanner.space
        : scanner.offset + scanner.token.length,
      value: TokenContext.Newline === type || TokenContext.Whitespace === type
        ? scanner.space
        : type === TokenContext.EndTag ? 'end' + scanner.token : scanner.token

    }

    if (type === TokenContext.OpenTag) node = context.push([ entry ]) - 1
    else if (type === TokenContext.CloseTag) context[node].push(entry)
    else context[node].push(entry)

  }

  /**
   * Delete from array
   *
   * @param {number} start
   * @param {number} [deleteCount=1]
   */
  const remove = (start, deleteCount = 1) => context.splice(start, deleteCount)

  return {

    Update,

    get,
    add,
    remove,

    /**
     * Returns the context list
     *
     * @readonly
     * @returns {Parser.Context[][]}
     */
    get list () { return context },

    /**
     * Returns the context stack size
     *
     * @readonly
     * @returns {number}
     */
    get size () { return context.length - 1 }

  }

}(NaN))
