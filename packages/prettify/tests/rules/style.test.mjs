import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

/* -------------------------------------------- */
/* STYLE RULE TESTS                             */
/* -------------------------------------------- */

// ALL PRETTIFY OPTIONS MUST END WITH THE DEFAULTS
// BECAUSE OPTIONS ARE PERSISTED WHEN CHANGED.

/* -------------------------------------------- */
/* TESTS                                        */
/* -------------------------------------------- */

test.before('Setup Tests', () => {

  prettify.options({
    language: 'css',
    lexer: 'style'
  });

});

test.serial('Class Padding', async t => {

  await forRule('rules/style/class-padding')([
    true,
    false
  ]
  , async function (source, classPadding, label) {

    const output = await prettify.format(source, { style: { classPadding } });

    t.snapshot(output, label({ style: { classPadding } }));

    // t.log(output);

  });

});

test.serial('Correct', async t => {

  await forRule('rules/style/correct')([
    true,
    false
  ]
  , async function (source, correct, label) {

    const output = await prettify.format(source, { style: { correct } });

    t.snapshot(output, label({ style: { correct } }));

    // t.log(output);
  });

});

test.serial('No Leading Zero', async t => {

  await forRule('rules/style/no-lead-zero')([
    true,
    false
  ]
  , async function (source, noLeadZero, label) {

    const output = await prettify.format(source, { style: { noLeadZero } });

    t.snapshot(output, label({ style: { noLeadZero } }));

    // t.log(output);

  });

});

test.serial('Quotation Conversion', async t => {

  await forRule('rules/style/quote-convert')([
    'single',
    'double',
    'none'
  ]
  , async function (source, quoteConvert, label) {

    const output = await prettify.format(source, { style: { quoteConvert } });

    t.snapshot(output, label({ style: { quoteConvert } }));

    // t.log(output);
  });

  prettify.options({ language: 'css', style: { correct: false } });
});

test.serial('Sort Selectors (Alphabetical)', async t => {

  await forRule('rules/style/sort-selectors')([
    true,
    false
  ]
  , async function (source, sortSelectors, label) {

    const output = await prettify.format(source, { style: { sortSelectors } });

    t.snapshot(output, label({ style: { sortSelectors } }));

    // t.log(output);

  });

});

test.serial('Sort Properties (Alphabetical)', async t => {

  await forRule('rules/style/sort-properties')([
    true,
    false
  ]
  , async function (source, sortProperties, label) {

    const output = await prettify.format(source, { style: { sortProperties } });

    t.snapshot(output, label({ style: { sortProperties } }));

    // t.log(output);
  });

});
