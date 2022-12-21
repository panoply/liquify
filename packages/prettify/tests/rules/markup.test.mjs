import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

/* -------------------------------------------- */
/* MARKUP RULE TESTS                            */
/* -------------------------------------------- */

// ALL PRETTIFY OPTIONS MUST END WITH THE DEFAULTS
// BECAUSE OPTIONS ARE PERSISTED WHEN CHANGED.

/* -------------------------------------------- */
/* TESTS                                        */
/* -------------------------------------------- */

test.serial('Attribute Sorting (Alphanumeric)', async t => {

  prettify.options({
    language: 'liquid',
    markup: {
      forceAttribute: true,
      forceIndent: true
    }
  });

  await forRule('rules/markup/attribute-sort')([
    true,
    false
  ]
  , async function (source, attributeSort, label) {

    const output = await prettify.format(source, { markup: { attributeSort } });

    t.snapshot(output, label({ markup: { attributeSort } }));

    // t.log(output);
  });

  prettify.options({ markup: { attributeSort: false } });

});

test.serial('Attribute Sort List', async t => {

  prettify.options({
    language: 'liquid',
    markup: {
      forceAttribute: true,
      forceIndent: true
    }
  });

  await forRule('rules/markup/attribute-sort-list')([
    [ 'class', 'data-b', 'data-a', 'data-c', 'data-e' ],
    [ 'first', 'second', 'third', 'fourth' ],
    [ 'data-a', 'data-b', 'data-c', 'data-e', 'data-f' ]
  ]
  , async function (source, attributeSortList, label) {

    const output = await prettify.format(source, {
      markup: {
        attributeSort: true,
        attributeSortList
      }
    });

    t.snapshot(output, label({ markup: { attributeSort: true, attributeSortList } }));

    // t.log(output);

  });

  prettify.options({ markup: { attributeSort: false, attributeSortList: [] } });

});

test.serial('Attribute Casing', async t => {

  await forRule('rules/markup/attribute-casing')([
    'preserve',
    'lowercase',
    'lowercase-name',
    'lowercase-value'
  ]
  , async function (source, attributeCasing, label) {

    const output = await prettify.format(source, { markup: { attributeCasing } });

    t.snapshot(output, label({ markup: { attributeCasing } }));

    // t.log(output);

  });

  prettify.options({ markup: { attributeCasing: 'preserve' } });

});

test.serial('Force Attribute', async t => {

  prettify.options({
    language: 'liquid',
    preserveLine: 0,
    markup: {
      forceAttribute: false,
      forceIndent: false
    }
  });

  await forRule('rules/markup/force-attribute')([
    true,
    false
  ]
  , async function (source, forceAttribute, label) {

    const output = await prettify.format(source, { markup: { forceAttribute } });

    t.snapshot(output, label({ markup: { forceAttribute } }));

    // t.log(output);
  });

  prettify.options({ preserveLine: 2 });

});

test.serial('Force Attribute (Limit)', async t => {

  prettify.options({
    language: 'liquid',
    preserveLine: 0,
    markup: {
      forceAttribute: false,
      forceIndent: false
    }
  });

  await forRule('rules/markup/force-attribute')([
    1,
    2,
    3,
    4,
    false
  ]
  , async function (source, forceAttribute, label) {

    const output = await prettify.format(source, { markup: { forceAttribute } });

    t.snapshot(output, label({ markup: { forceAttribute } }));

    // t.log(output);
  });

  prettify.options({ preserveLine: 2 });

});

test.serial('Force Attribute (Wrap)', async t => {

  prettify.options({
    language: 'liquid',
    preserveLine: 0,
    markup: {
      forceAttribute: false,
      forceIndent: false
    }
  });

  await forRule('rules/markup/force-attribute-wrap')([
    30,
    50,
    80,
    100,
    0
  ]
  , async function (source, wrap, label) {

    const output = await prettify.format(source, { wrap });

    t.snapshot(output, label({ wrap, markup: { forceAttribute: false } }));

    // t.log(output);
  });

  prettify.options({ preserveLine: 2 });

});

test.serial('Force Lead Attribute (Wrap)', async t => {

  prettify.options({
    language: 'liquid',
    preserveLine: 0,
    markup: {
      forceAttribute: false,
      forceIndent: false
    }
  });

  await forRule('rules/markup/force-lead-attribute')([
    30,
    50,
    80,
    100,
    0
  ]
  , async function (source, wrap, label) {

    const output = await prettify.format(source, { wrap, markup: { forceLeadAttribute: true } });

    t.snapshot(output, label({
      wrap,
      markup: {
        forceLeadAttribute: true,
        forceAttribute: false
      }
    }));

    // t.log(output);

  });

  prettify.options({ preserveLine: 2, markup: { forceLeadAttribute: false } });

});

test.serial('Force Content Indentation', async t => {

  await forRule('rules/markup/force-indent')([
    true,
    false
  ]
  , async function (source, forceIndent, label) {

    const output = await prettify.format(source, { markup: { forceIndent } });

    t.snapshot(output, label({ markup: { forceIndent } }));

    // t.log(output);

  });

});

test.serial('Delimiter Trims', async t => {

  await forRule('rules/markup/delimiter-trims')([
    'strip',
    'force',
    'tags',
    'outputs',
    'preserve'
  ]
  , async function (source, delimiterTrims, label) {

    const output = await prettify.format(source, {
      liquid: {
        delimiterTrims
      },
      markup: {
        forceAttribute: false
      }
    });

    t.snapshot(output, label({ liquid: { delimiterTrims } }));

  });

});

test.serial('Quote Convert', async t => {

  await forRule('rules/markup/quote-convert')([
    'single',
    'double',
    'none'
  ]
  , async function (source, quoteConvert, label) {

    const output = await prettify.format(source, {
      markup: {
        quoteConvert,
        forceAttribute: false
      }
    });

    t.snapshot(output, label({ markup: { quoteConvert } }));

    // t.log(output);

  });

});

test.serial('Self Close Space', async t => {

  await forRule('rules/markup/self-close-space')([
    true,
    false
  ]
  , async function (source, selfCloseSpace, label) {

    const output = await prettify.format(source, {
      wrap: 0,
      markup: {
        selfCloseSpace,
        forceAttribute: false,
        forceLeadAttribute: false
      }
    });

    t.snapshot(output, label({ markup: { selfCloseSpace } }));

    // t.log(output);

  });

});
