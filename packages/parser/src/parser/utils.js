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
