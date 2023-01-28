/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */

import type { HighlightOptions } from 'cli-highlight';
import esthetic from 'esthetic';
import test from 'ava';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'path';
import { colors } from '../shared/colors';
import chalk from 'chalk';

interface DevCallback {
  (
    source: string,
    highlight: (source: string, options?: HighlightOptions) => string
  ): void | Promise<{
    /**
     * Repeat the test function to simulate a persisted environment
     * like that found in text-editors when formatting onSave.
     */
    repeat?: number;
    /**
     * Whether or not output should be highlighted
     */
    colors?: boolean;
    /**
     * Provide the output source which was beautified
     */
    source: string;
    /**
     * Whether or not to log output of each repeat
     */
    logger?: boolean;
    /**
     * Whether or not to log the output at the end cycle.
     */
    inspect?: boolean;
    /**
     * A callback function to run after repeats finished
     */
    finish: () => void
  }>
}

/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * Dev Mode (Æsthetic)
 *
 * Development mode for Æsthetic which provides invokes a workable test mode within AVA.
 * Requires sample code be provided in a `dev.txt` file.
 *
 * @example
 *
 * import test from 'ava'
 * import { dev } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * dev(function())
 */
export const dev = (sample: string | DevCallback, callback: DevCallback) => {

  const file = typeof sample === 'string'
    ? join(process.cwd(), 'tests', sample)
    : join(process.cwd(), 'tests', 'dev.txt');

  return test(chalk.hex('#ff75d1')('ÆSTHETIC DEVELOPMENT'), async t => {

    const read = await readFile(file);

    if (!read) throw new Error('Sample file could not be located in: ' + file);

    const filename = relative(process.cwd(), file);
    const source = read.toString();
    const line = chalk.magenta.bold('-'.repeat(50));
    const { language } = esthetic.rules();

    t.log(chalk.blueBright(filename));

    let repeats: number = NaN;

    if (typeof callback === 'function') {

    const returns = await callback(source, colors);

      if (typeof returns === 'object') {

        if (isNaN(repeats)) {

          repeats = returns.repeat || 0;

          while (repeats > 0) {

            Object.assign(returns, await callback.bind(t)(returns.source, colors));

            if (returns.logger) {
              t.log(line);
              t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
              t.log(line);

              if (returns.colors === true) {
                t.log(colors(returns.source, { language }));
              } else {
                t.log(returns.source);
              }

            } else {
              t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
            }

            repeats--;

          }

          if (returns.logger !== true) {
            if (returns.colors === true) {
              t.log(colors(returns.source, { language: esthetic.rules().language }));
            } else {
              t.log(returns.source);
            }
          }

          if (typeof returns.finish === 'function') returns.finish();

        }
      }

      t.pass();

    } else if (typeof sample === 'function') {

      const returns = await sample(source, colors);

      if (typeof returns === 'object') {

        if (isNaN(repeats)) {

          repeats = returns.repeat;

          while (repeats > 0) {
            Object.assign(returns, sample(returns.source, colors));
            if (returns.logger) {
              t.log(line);
              t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
              t.log(line);

              if (returns.colors === true) {
                t.log(colors(returns.source, { language }));
              } else {
                t.log(returns.source);
              }
            } else {
              t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
            }
            repeats--;
          }

          if (returns.logger !== true) {
            if (returns.colors === true) {
              t.log(colors(returns.source, { language }));
            } else {
              t.log(returns.source);
            }
          }

          if (typeof returns.finish === 'function') returns.finish();

        }
      }

      t.pass();

    } else {

      throw TypeError('Missing callback type');
    }

  });

};
