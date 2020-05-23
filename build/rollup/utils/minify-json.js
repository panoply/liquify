import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'

/**
 * @param {string} content
 */
export default function (content) {

  const parsed = JSON.parse(jsonStrip(content.toString()))

  return jsonMinify(JSON.stringify(parsed))

}
