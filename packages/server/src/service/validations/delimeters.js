
/**
 * Delimeter
 *
 * @param {string} token
 */
export default function (token, diagnostics) {

  const left = token.slice(0, 2)
  const right = token.slice(token.length - 2, token.length)

  if ((left === '{{' && right === '}}') || (left === '{%' && right === '%}')) {
    return token.slice(2, token.length - 2)
  } else {
    diagnostics.push('Tag failed to parse')
  }
}
