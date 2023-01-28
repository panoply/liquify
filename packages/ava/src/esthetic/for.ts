/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/indent */

import ava from 'ava';
import type { Rules } from 'esthetic';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';

/* -------------------------------------------- */
/* PRIVATES                                     */
/* -------------------------------------------- */

const description = (content: string, options: any) => {

    return [
      content,
      '```js',
      JSON.stringify(options, null, 2),
      '```'
    ].join('\n');

};

const label = (rules: any) => {

  return [
      '<h3>Rules</h3>\n',
      '```js',
      JSON.stringify(rules, null, 2),
      '```'
   ].join('\n');

};

/**
 * For Sample (Æsthetic)
 *
 * Accepts an array string list of code samples. This test runner is typically applying
 * snapshot assertion and used to ensure correct structures are generated.
 *
 * @example
 *
 * import test from 'ava'
 * import { forSample, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *   forSample([
 *      html`
 *
 *        <div id="xxx"></div>
 *
 *      `,
 *      html`
 *
 *        <ul><li>Another Sample</li></ul>
 *
 *      `
 *   ])({
 *    language: 'html',
 *    markup: {
 *      forceAttribute: true
 *    }
 *   })(async function(source, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // index reference of sample running
 *     t.log(this.last) // whether or not this is the last sample
 *
 *     const output = await esthetic.format(source, rules)
 *
 *     if (this.last) t.log('last sample') // example of using the last value
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
const forSample = (samples: string[]) => (rules: Rules) => async (
  callback: (
    this: {
      /**
       * The number of samples provided
       */
      size: number;
      /**
        * The current index
        */
      index: number;
       /**
        * Whether or not we are iterating a ruleset
        */
      last: boolean;
    },
    source: string,
    rules: Rules,
    label: string
  ) => void
) => {

  const size = samples.length;

  for (let index = 0; index < size; index++) {

    const sample = samples[index];
    const last = index === size - 1;

    callback.bind({ index, size, last })(sample, rules, label(rules));

  }
};

/**
 * For Sample Files (Æsthetic)
 *
 * Indentical to `forSample` but can be used to resolve sample files located in a
 * sub-directory named `samples` relative to the test file in execution. This test
 * runner is typically applying snapshot assertion and used to ensure correct structures
 * are generated.
 *
 * @example
 * import test from 'ava'
 * import { forSample, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *   forSample.files([
 *     'example-sample.txt' // resolving to ./samples/*
 *     'another-sample.txt' // resolving to ./samples/*
 *   ])({
 *    language: 'html',
 *    markup: {
 *      forceAttribute: true
 *    }
 *   })(async function(source, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // index reference of sample running
 *     t.log(this.last) // whether or not this is the last sample
 *
 *     const output = await esthetic.format(source, rules)
 *
 *     if (this.last) t.log('last sample') // example of using the last value
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
forSample.files = (samples: string[]) => (rules: Rules) => async (
  callback: (
    this: {
      /**
       * The number of samples provided
       */
      size: number;
      /**
        * The current index
        */
      index: number;
       /**
        * Whether or not we are iterating a ruleset
        */
      last: boolean;
    },
    source: string,
    rules: Rules,
    label: string
  ) => void
) => {

  const size = samples.length;

  for (let index = 0; index < size; index++) {

    const file = samples[index];
    const last = index === size - 1;
    const path = join(dirname(ava.meta.file), 'samples', file);
    const uri = path.slice(path.indexOf('/'));

    const read = await readFile(uri);

    if (!read) throw new Error('Sample file could not be located in: ' + uri);

    const source = read.toString();
    const begin = source.trimStart();

    if (!begin.startsWith('~~~')) {
      throw new Error(
        [
          '\n\nMissing description in sample file - Descriptions are required for file samples',
          'and must be present and contained between tripple tildes, eg:\n\n~~~\nSome Description\n~~~'
        ].join('\n')
      );
    }

    const separate = source.indexOf('~~~', 3);

    if (separate < 0) throw new Error('Missing closing description dashes, eg: ~~~');

    const describe = `### Snapshot ${index + 1}\n` + source.slice(3, separate).trim();
    const sample = source.slice(separate + 3).trimStart();

    callback.bind({ index, size, last })(sample, rules, description(describe, rules));

  }
};

export { forSample };

/**
 * For Assert (Æsthetic)
 *
 * Accepts an array string list of actual/expected assertions,
 * Where index[0] equates to `actual` and index[1] equates to `expected`.
 *
 * @example
 *
 * import test from 'ava'
 * import { forAssert, liquid } from '@liquify/ava/esthetic'
 *
 * test('Example Test', async t => {
 *
 *   forSample(
 *    [
 *      [
 *        liquid`{{actual}}`,
 *        liquid`{{ actual }}`
 *      ],
 *      [
 *        liquid`
 *          {% if x %} Hello World {% endif %}
 *        `,
 *        liquid`
 *         {% if x %}
 *           Hello World
 *         {% endif %}
 *        `
 *      ]
 *    ]
 *   )(async function(input, expect) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // index reference of sample running
 *     t.log(this.last) // whether or not this is the last sample
 *
 *     const actual = esthetic.format.sync(input, {
 *       language: 'liquid',
 *       liquid: {
 *         normalizeSpacing: true
 *       }
 *     });
 *
 *     // The beautified result must match index[1] in the
 *     // samples array list.
 *     t.deepEqual(actual, expect);
 *
 *   })
 *
 * })
 */
 export const forAssert = (samples: string[][]) => (
  callback: (
    this: {
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
    },
    actual: string,
    expect: string
  ) => void
) => {

  const size = samples.length;

  for (let index = 0; index < size; index++) {

    const sample = samples[index];
    const last = index === size - 1;

    callback.bind({ last, index, size })(sample[0], sample[1]);

  }

};

/**
 * For Rule (Æsthetic)
 *
 * Accepts a string sample value and an various rules to apply on each provided
 * sample. The execution order is **sample** > **rule** so for each sample all
 * rules provided will be return in the callback cycle.
 *
 * @example
 *
 * import test from 'ava'
 * import { forRules, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *  forRules([
 *      html`
 *
 *        <div id="xxx"></div>
 *
 *      `,
 *      html`
 *
 *        <div id="xxx" class="test" data-attr="foo"></div>
 *
 *      `
 *   ])([
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: true
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: 2
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: false
 *       }
 *     },
 *  ])(async function(sample, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.indexSample) // the index reference of sample running
 *     t.log(this.indexRule) // the index reference of ruleset
 *
 *     const output = await esthetic.format(sample, rules)
 *
 *     if (this.isRule) t.log('running a rule') // prints when executing a rule
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
const forRule = (samples: string[]) => (rules: Rules[]) => (
  callback: (
    this: {
      /**
       * The number of samples and rules
       */
      size: {
        /**
         * The amount of samples provided
         */
        samples: number;
        /**
         * The amount of rules provided
         */
        rules: number;
      }
      /**
        * The index references in iteration
        */
      index: {
        /**
         * The current sample index
         */
        sample: number;
        /**
         * The current rule index
         */
        rule: number;
      }
    },
    sample: string,
    rule?: Rules | string,
    label?: string
  ) => void
) => {

  if (!Array.isArray(rules)) {

    throw new Error(
      [
        'When using the "forRule" runner, you must provide an array list of rules.',
        'Otherwise use the "forSample" or "forAssert" runners.'
      ].join('\n')
    );

  }

  const size = {
    samples: samples.length,
    rules: rules.length
  };

  for (let index = 0; index < size.samples; index++) {

    const sample = samples[index];

      for (let rule = 0; rule < size.rules; rule++) {

        callback.bind({
          size,
          index: {
            sample: index,
            rule
          }
        })(sample, rules[rule], label(rules[rule]));

      }

  }
};

/**
 * For Rule Files (Æsthetic)
 *
 * Indentical to `forRule` but can be used to resolve sample files located in a
 * sub-directory named `samples` relative to the test file in execution. Accepts a
 * string sample value and an various rules to apply on each provided
 * sample. The execution order is **sample** > **rule** so for each sample all
 * rules provided will be return in the callback cycle.
 *
 * @example
 *
 * import test from 'ava'
 * import { forRule, html } from '@liquify/ava/esthetic'
 * import esthetic from 'esthetic'
 *
 * test('Example Test', async t => {
 *
 *  forRule.files([
 *    'example-sample.txt' // resolving to ./samples/*
 *    'another-sample.txt' // resolving to ./samples/*
 *  ])([
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: true
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: 2
 *       }
 *     },
 *     {
 *       language: 'html',
 *       markup: {
 *        forceAttribute: false
 *       }
 *     },
 *  ])(async function(sample, rules, label) {
 *
 *     t.log(this.size) // number of samples
 *     t.log(this.index) // the index reference of sample running
 *     t.log(this.isRule) // whether or not we are iterating a ruleset
 *     t.log(this.indexRule) // the index reference of ruleset
 *
 *     const output = await esthetic.format(sample, rules)
 *
 *     if (this.isRule) t.log('running a rule') // prints when executing a rule
 *
 *     t.snapshot(output, label)
 *
 *   })
 *
 * })
 *
 */
forRule.files = (samples: string[]) => (rules: Rules[]) => async (
  callback: (
    this: {
      /**
       * The number of samples and rules
       */
      size: {
        /**
         * The amount of samples provided
         */
        samples: number;
        /**
         * The amount of rules provided
         */
        rules: number;
      }
      /**
        * The index references in iteration
        */
      index: {
        /**
         * The current sample index
         */
        sample: number;
        /**
         * The current rule index
         */
        rule: number;
      }
    },
    sample: string,
    rule?: Rules | string,
    label?: string
  ) => void
) => {

  if (!Array.isArray(rules)) {

    throw new Error(
      [
        'When using the "forRule" runner, you must provide an array list of rules.',
        'Otherwise use the "forSample" or "forAssert" runners.'
      ].join('\n')
    );

  }

  const size = {
    samples: samples.length,
    rules: rules.length
  };

  for (let index = 0; index < size.samples; index++) {

    const file = samples[index];
    const path = join(dirname(ava.meta.file), 'samples', file);
    const uri = path.slice(path.indexOf('/'));

    const read = await readFile(uri);

    if (!read) throw new Error('Sample file could not be located in: ' + uri);

    const source = read.toString();
    const begin = source.trimStart();

    if (!begin.startsWith('~~~')) {
      throw new Error(
        [
          '\n\nMissing description in sample file - Descriptions are required for file samples',
          'and must be present and contained between tripple tildes, eg:\n\n~~~\nSome Description\n~~~'
        ].join('\n')
      );
    }

    const separate = source.indexOf('~~~', 3);

    if (separate < 0) throw new Error('Missing closing description dashes, eg: ~~~');

    const describe = `### Snapshot ${index + 1}\n` + source.slice(3, separate).trim();
    const sample = source.slice(separate + 3).trimStart();

      for (let rule = 0; rule < size.rules; rule++) {

        callback.bind({
          size,
          index: {
            sample: index,
            rule
          }
        })(sample, rules[rule], description(describe, rules[rule]));

      }

  }
};

export { forRule };
