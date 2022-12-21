
import { readFile } from 'node:fs/promises';
import { join } from 'path';

/**
 * Get Sample
 *
 * Reads the file at the provided `sample` path
 * and returns it as a string.
 */
export const getSample = async (sample: string) => {

  const path = join(process.cwd(), 'tests', 'samples', sample);

  const read = await readFile(path);

  if (!read) throw new Error('Sample file could not be located in: ' + path);

  return read.toString();

};
