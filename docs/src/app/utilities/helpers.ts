import { create, assign } from './native';

/**
 * Object Generator
 *
 * I don't like creating objects that use the  prototype because it's
 * fucking despicable. This function produces `null` prototype objects
 * typically used for creating grammars and datasets.
 */
export function object<T> (dataset: T): T {

  return assign(create(null), dataset);

}

/**
 * Converts byte size to killobyte, megabyte,
 * gigabyte or terrabyte
 */
export function size (bytes: number): string {

  const kb = 1024;
  const mb = 1048576;
  const gb = 1073741824;

  if (bytes < kb) return bytes + ' B';
  else if (bytes < mb) return (bytes / kb).toFixed(1) + ' KB';
  else if (bytes < gb) return (bytes / mb).toFixed(1) + ' MB';
  else return (bytes / gb).toFixed(1) + ' GB';

};
