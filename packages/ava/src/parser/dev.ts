/* eslint-disable no-unused-vars */

import type { ExecutionContext } from 'ava';
import type { IAST } from '@liquify/liquid-parser';
import { readFile } from 'node:fs/promises';
import { join, relative } from 'path';
import chalk from 'chalk';

/* -------------------------------------------- */
/* TYPES                                        */
/* -------------------------------------------- */

type TestContext = ExecutionContext<unknown>

interface DevCallback {
  (source: string): void | Promise<{
    /**
     * Repeat the test function to simulate a persisted environment
     * like that found in text-editors when formatting onSave.
     */
    repeat: number;
    /**
     * Provide the AST
     */
    ast: IAST;
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

/**
 * Dev Mode (Liquid Parser)
 *
 * Development utility which read a sample file or string input and
 * provides operations to run in the test instance.
 */
export const dev = (t: TestContext) => async (sample: string | DevCallback, callback: DevCallback) => {

  const file = typeof sample === 'string'
    ? join(process.cwd(), 'tests', sample)
    : join(process.cwd(), 'tests', 'dev.liquid');

  const read = await readFile(file);

  if (!read) throw new Error('Developer sample file could not be located in: ' + file);

  const filename = relative(process.cwd(), file);
  const source = read.toString();
  const line = chalk.magenta.bold('-'.repeat(50));

  t.log(chalk.blueBright(filename));

  let repeats: number = NaN;

  if (typeof callback === 'function') {

    const returns = await callback(source);

    if (typeof returns === 'object' && isNaN(repeats)) {

      repeats = returns.repeat;

      while (repeats > 0) {

        Object.assign(returns, await callback(source));

        const repeated = returns.repeat - repeats + 1;

        if (returns.logger) {
          t.log(line);
          t.log(chalk.magenta(`Repeat ${repeated} ${chalk.gray('of')} ${returns.repeat}`));
          t.log(line);
        } else {
          t.log(chalk.magenta(`Repeat ${repeated} ${chalk.gray('of')} ${returns.repeat}`));
        }

        repeats--;
      }

      if (typeof returns.finish === 'function') returns.finish();

    }

    t.pass();

  } else if (typeof sample === 'function') {

    const returns = await sample(source);

    if (typeof returns === 'object' && isNaN(repeats)) {

      repeats = returns.repeat;

      while (repeats > 0) {

        Object.assign(returns, sample(source));

        const repeated = returns.repeat - repeats + 1;

        if (returns.logger) {
          t.log(line);
          t.log(chalk.magenta(`Repeat ${repeated} ${chalk.gray('of')} ${returns.repeat}`));
          t.log(line);
        } else {
          t.log(chalk.magenta(`Repeat ${repeated} ${chalk.gray('of')} ${returns.repeat}`));
        }
        repeats--;
      }

      if (typeof returns.finish === 'function') returns.finish();

    }

    t.pass();

  } else {

    throw TypeError('Missing callback type');
  }

};
