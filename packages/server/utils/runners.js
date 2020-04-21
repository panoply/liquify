import { ResponseError, ErrorCodes } from 'vscode-languageserver'

/**
 * @param {function} promise
 * @returns {Promise<array>}
 */
export const runPromise = null

/**
 * Format Errors
 *
 * @export
 * @param {string} output
 * @param {object} error
 * @returns
 */
export const formatError = (
  output,
  error
) => (error instanceof Error)
  ? `${output}: ${error.message}\n${error.stack}`
  : (typeof error === 'string')
    ? `${output}: ${error}`
    : `${output}: ${error.toString()}` || output

/**
 * Cancel Value (Response Error)
 * @returns {string}
 */
export const cancelValue = () => new ResponseError(
  ErrorCodes.RequestCancelled,
  'Request cancelled'
)

/**
 * Asynchronous Runner
 *
 * @param {function} fn
 * @param {string} errorVal
 * @param {string} errorMessage
 * @param {object} token
 */
export const runAsync = (
  fn
  , errorVal
  , errorMessage
  , token
) => new Promise(resolve => setImmediate(() => {

  token.isCancellationRequested && resolve(cancelValue())

  return fn().then(result => {
    if (token.isCancellationRequested) {
      resolve(cancelValue())
    } else {
      resolve(result)
    }
  }, error => {
    console.error(formatError(errorMessage, error))
    resolve(errorVal)
  })

}))

/**
 * Synchronous Runner
 *
 * @param {function} fn
 * @param {string} errorVal
 * @param {string} errorMessage
 * @param {object} token
 */
export const runSync = (
  fn
  , errorVal
  , errorMessage
  , token
) => new Promise(resolve => setImmediate(() => {
  if (token.isCancellationRequested) {
    resolve(cancelValue())
  } else {
    try {
      const result = fn()
      if (token.isCancellationRequested) {
        resolve(cancelValue())
        return
      } else {
        resolve(result)
      }
    } catch (e) {
      console.error(formatError(errorMessage, e))
      resolve(errorVal)
    }
  }
}))
