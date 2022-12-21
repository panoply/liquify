import { ResponseError, CancellationToken, LSPErrorCodes } from 'vscode-languageserver';

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

export function runSafe<T> (
  callback: () => Thenable<T>,
  error: T,
  message: string,
  token: CancellationToken
): Thenable<T | ResponseError<any>> {

  return new Promise<T | ResponseError<any>>((resolve) => {

    if (token.isCancellationRequested) {
      resolve(cancel());
      return;
    }

    return callback().then(result => {

      if (token.isCancellationRequested) {
        resolve(cancel());
      } else {
        resolve(result);
      }

    }, e => {

      console.error(formatError(message, e));
      resolve(error);

    });

  });

}

function cancel<E> () {

  return new ResponseError<E>(LSPErrorCodes.RequestCancelled, 'Request cancelled');
}
