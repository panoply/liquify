// @ts-nocheck

import fs from 'fs'

/* -------------------------------------------- */
/* VALIDATIONS                                  */
/* -------------------------------------------- */

/**
 * Map the `props` and generate a temporary specification
 * object reference. Used by `object_property` validation.
 *
 * @export
 * @param {string} prop - The string value matched by expression
 */
export const matchProps = prop => name => new RegExp(`${prop.split('.')[0]}`).test(name)

/* -------------------------------------------- */
/* # REGEX UTILS                                */
/* -------------------------------------------- */

export const closestValue = (
  array
  , value
) => {

  let result,
    last

  array.some((item) => {
    const delta = Math.abs(value - item)
    if (delta >= last) return true
    result = item
    last = delta
  })

  return result

}

/**
 * In Range
 *
 * Checks if n is between start and up to, but not including, end.
 *
 * @param {number} offset
 * @param {number} rangeStart
 * @param {number} rangeEnd
 */
export const inRange = (
  offset
  , rangeStart
  , rangeEnd = 0
) => typeof rangeStart === 'number' && ((
  rangeStart < offset && offset < rangeEnd
) || (
  rangeEnd < offset && offset < rangeStart
))

/**
 * Join an array of expressions
 *
 * @export
 * @param {array} array
 */
export const regexArr = (exp, flag) => new RegExp(exp.join('|'), flag || '')

/**
 * Build a Regular expression match from specification tags
 *
 * @export
 * @param {array} items
 * @param {string} tag
 */
export const regexBuild = items => tag => ([
  ...new Set(items.filter(key => key[0] === tag).map(value => value[1]))
]).join('|')

/* --------------------------------------------- */

/**
 * Map the `name` values within reference specifications
 *
 * @export
 * @param {object} name
 */
export const mapName = ({ name }) => (name)

/* --------------------------------------------- */

/**
 * Map the `properties` values within reference specification
 * and generate a workable array.
 *
 * @export
 * @param {object} level
 */
export const propLevels = level => (
  function next (item) {
    return item?.properties ? [
      item.name,
      item.properties.map(next).map(props => props)
    ] : item.name
  }(level)
)

/* --------------------------------------------- */

/**
 * Pending Validation
 *
 * @param {string} uri
 */
export const pendingValidation = pending => (
  uri
  , request = pending[uri]
) => request && (
  clearTimeout(request)
  , delete pending[uri]
)

/* --------------------------------------------- */

/**
 * Asynchr
 *
 * @export
 * @param {string} path
 * @returns
 */
export const readFile = async path => new Promise(
  (
    resolve
    , reject
  ) => fs.readFile(path, 'utf8', (
    err
    , data
  ) => err ? reject(err) : resolve(JSON.parse(require('strip-json-comments')(data), null)))
)
