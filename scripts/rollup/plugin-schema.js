import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'

/**
 * @param {string} content
 */
export const json = content => {

  const parsed = JSON.parse(jsonStrip(content.toString()))

  return jsonMinify(parsed)

}
