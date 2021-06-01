import { is } from 'rambda'

/**
 * Creates an empty object
 *
 * @export
 * @returns {object}
 */
export function object () {

  return Object.create(null)

}

export function errors () {

  return {

    get get () { return errors },

    remove: (index) => {

      errors.splice(pair, 1)

    },

    hierarch: (node) => {

      const diagnostic = Errors(ParseError.MissingEndTag, {
        range: node.range,
        node: node.node,
        offset: node.offset,
        token: node.token[0]
      })

      errors.push(diagnostic)

    },

    /**
         * Set Errors
         *
         * @param {number} error
         * @memberof Node
         */
    add: (error, token) => {

      if (error) {

        const diagnostic = Errors(error, {
          range: scanner.range,
          node,
          offset: scanner.offset,
          token: token || scanner.token
        })

        errors.push(diagnostic)

      }

    }

  }

}

/**
 * AST Node Hierarch
 *
 * Tracks nodes which require start and end
 * tags so we can correctly populate the AST.
 *
 * @typedef {Array<string|number>} Hierarch
 */
export function hierarch () {

  /**
   * AST Node Hierarch
   *
   * @type {Hierarch}
   */
  const hierarch = []

  return {

    /**
     * Returns the hierarchal state array
     *
     * @readonly
     * @returns {Hierarch}
     */
    get get () { return hierarch },

    /**
     * Returns the hierarchal pair by choosing
     * the closest token (bottom-up) which exists
     * in the tree
     *
     * @readonly
     * @returns {number}
     */
    pair (token) {

      const state = hierarch.lastIndexOf(token)
      const index = hierarch[state + 1]

      hierarch.splice(state, 2)

      return typeof index === 'number' ? index : -1

    }

  }

}

/**
 * Creates an empty object
 *
 * @export
 * @returns {object}
 */
export function OffsetsFromRange ({ textDocument }, { start, end }) {

  return [
    textDocument.offsetAt(start),
    textDocument.offsetAt(end)
  ]
}

/**
 * ForEach Function
 *
 * Old school iterator function for quickly looping
 * over an array, provides a `break` option to cancel
 * out when matching Number is found
 *
 * @export
 * @returns {object}
 */
export function ForEach (array, fn) {

  let i = 0
  const l = array.length

  for (; i < l; i++) if (is(Number, fn(array[i], i))) break

  return array

}
