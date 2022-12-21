/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */

import type { HighlightOptions } from 'cli-highlight';
import type { ExecutionContext } from 'ava';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'path';
import { colors } from '../shared/colors';
import chalk from 'chalk';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type TestContext = ExecutionContext<unknown>

interface DevCallback {
  (
    source: string,
    highlight: (source: string, options?: HighlightOptions) => string
  ): void | Promise<{
    /**
     * Repeat the test function to simulate a persisted environment
     * like that found in text-editors when formatting onSave.
     */
    repeat: number;
    /**
     * Provide the output source which was beautified
     */
    source: string;
    /**
     * Whether or not to log output of each repeat
     */
    logger?: boolean;
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
 * Dev Mode
 */
export const dev = (t: TestContext) => async (sample: string | DevCallback, callback: DevCallback) => {

  const file = typeof sample === 'string'
    ? join(process.cwd(), 'tests', sample)
    : join(process.cwd(), 'tests', 'dev.txt');

  const read = await readFile(file);

  if (!read) throw new Error('Sample file could not be located in: ' + file);

  const filename = relative(process.cwd(), file);
  const source = read.toString();
  const line = chalk.magenta.bold('-'.repeat(50));

  t.log(chalk.blueBright(filename));

  let repeats: number = NaN;

  if (typeof callback === 'function') {

   const returns = await callback(source, colors);

    if (typeof returns === 'object') {

      if (isNaN(repeats)) {

        repeats = returns.repeat;

        while (repeats > 0) {

          Object.assign(returns, await callback(returns.source, colors));

          if (returns.logger) {
            t.log(line);
            t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
            t.log(line);
            t.log(returns.source);
          } else {
            t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
          }

          repeats--;
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
            t.log(returns.source);
          } else {
            t.log(chalk.magenta(`Repeat ${returns.repeat - repeats + 1} ${chalk.gray('of')} ${returns.repeat}`));
          }
          repeats--;
        }

        if (typeof returns.finish === 'function') returns.finish();

      }
    }

    t.pass();

  } else {

    throw TypeError('Missing callback type');
  }

};
