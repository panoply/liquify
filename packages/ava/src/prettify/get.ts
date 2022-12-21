/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */

import type { Files } from './for';
import { readFile } from 'node:fs/promises';
import { join } from 'path';

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

export const getSample = async (sample: Files) => {

  const [ base, dir, filename ] = sample.split('/');
  const path = join(process.cwd(), 'tests', base, 'samples', dir, filename.endsWith('.txt')
    ? filename
    : filename + '.txt');

  const read = await readFile(path);

  if (!read) throw new Error('Sample file could not be located in: ' + path);

  return read.toString();

};
