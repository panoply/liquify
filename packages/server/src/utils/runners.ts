import { ResponseError, CancellationToken, LSPErrorCodes } from 'vscode-languageserver';

/**
 * @param {function} promise
 * @returns {Promise<array>}
 */
export const runPromise = null;

export function formatError (message: string, err: any): string {
  if (err instanceof Error) {
    const error = <Error>err;
    return `${message}: ${error.message}\n${error.stack}`;
  } else if (typeof err === 'string') {
    return `${message}: ${err}`;
  } else if (err) {
    return `${message}: ${err.toString()}`;
  }
  return message;
}

/**
 * Asynchronous Runner
 *
 * @param {function} fn
 * @param {string} errorVal
 * @param {string} errorMessage
 * @param {object} token
 */
export const runAsync = (
  fn: Function
  , errorVal: string
  , errorMessage: string
  , token: {
    isCancellationRequested: boolean
  }
) => new Promise(resolve => setImmediate(() => {

  token.isCancellationRequested && resolve(cancelValue());

  return fn().then(result => {
    if (token.isCancellationRequested) {
      resolve(cancelValue());
    } else {
      resolve(result);
    }
  }, error => {
    console.error(formatError(errorMessage, error));
    resolve(errorVal);
  });

}));

function cancelValue<E> () {
  return new ResponseError<E>(LSPErrorCodes.RequestCancelled, 'Request cancelled');
}
/**
 * Synchronous Runner
 *
 * @param {function} fn
 * @param {string} errorVal
 * @param {string} errorMessage
 * @param {object} token
 */
export const runSync = (
  fn: Function
  , errorVal: string
  , errorMessage: string
  , token: {
    isCancellationRequested: boolean
  }
) => new Promise(resolve => setImmediate(() => {

  if (token.isCancellationRequested) {
    resolve(cancelValue());
  } else {

    try {
      const result = fn();

      if (token.isCancellationRequested) {
        resolve(cancelValue());
        return;
      } else {
        resolve(result);
      }

    } catch (e) {

      console.error(formatError(errorMessage, e));
      resolve(errorVal);
    }
  }
}));
