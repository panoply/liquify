import { readFile } from 'node:fs/promises';
import { join } from 'path';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type SnippetCallback = (sample: string, meta?: {
  /**
   * The number of samples provided
   */
  size: number;
  /**
   * Whether or not this is the last items
   */
  last: boolean;
  /**
   * The current index
   */
  index: number;
  /**
   * The current sample string tokens split at delimiters
   */
  tokens: string[];
}) => void

/**
 * For Each Snippet (Liquid Parser)
 *
 * Accepts an array list of code sample snippets and
 * returns a curried function callback for each sample in the list.
 */
export const forSnippet = (samples: string[]) => (callback: SnippetCallback) => {

  const size = samples.length;

  for (let n = 0; n < size; n++) {

    const sample = samples[n];
    const last = n === size - 1;

    callback(sample, {
      last,
      index: n,
      size,
      tokens: sample.match(/{[{%][\s\S]*?[%}]}/g)
    });

  }

};

/**
 * For Each Sample (Liquid Parser)
 *
 * Reads a sample file in the provided `dir` and returns the
 * contents in a callback function.
 */
export const forSample = (dir: string) => async (
  files: string[],
  callback: (
    source: string,
    label?: string & { description: string }
  ) => void
) => {

  for (let n = 0; n < files.length; n++) {

    const filename = files[n];
    const path = join(process.cwd(), 'tests', 'samples', dir, filename.endsWith('.txt')
      ? filename
      : filename + '.liquid');

    const read = await readFile(path);

    if (!read) throw new Error('Sample file could not be located in: ' + path);

    const source = read.toString();

    callback(source);

  }
};
