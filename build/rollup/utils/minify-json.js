import jsonStrip from 'strip-json-comments'
import jsonMinify from 'jsonminify'

/**
 * @param {string} content
 */
export default function (content) {

  const parsed = JSON.parse(jsonStrip(content))
  const minified = jsonMinify(JSON.stringify(parsed))

  return minified

}
