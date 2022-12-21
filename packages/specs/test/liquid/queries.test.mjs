import test from 'ava';
import { q, $ } from '@liquify/liquid-language-specs';

test('Switching Engines\n', t => {

  /* STANDARD ENGINE ---------------------------- */

  q.setEngine('standard');

  t.is($.liquid.engine, 'standard');

  t.log($.liquid.engine.toUpperCase());
  t.log('-', Object.keys($.liquid.data.variation.tags).length, 'Tags');
  t.log('-', Object.keys($.liquid.data.variation.filters).length, 'Filters', '\n');

  /* SHOPIFY ENGINE ----------------------------- */

  q.setEngine('jekyll');

  t.is($.liquid.engine, 'jekyll');

  t.log($.liquid.engine.toUpperCase());
  t.log('-', Object.keys($.liquid.data.variation.tags).length, 'Tags');
  t.log('-', Object.keys($.liquid.data.variation.filters).length, 'Filters');
  t.log('-', Object.keys($.liquid.data.variation.objects).length, 'Objects', '\n');

  /* SHOPIFY ENGINE ----------------------------- */

  q.setEngine('shopify');

  t.is($.liquid.engine, 'shopify');

  t.log($.liquid.engine.toUpperCase());
  t.log('-', Object.keys($.liquid.data.variation.tags).length, 'Tags');
  t.log('-', Object.keys($.liquid.data.variation.filters).length, 'Filters');
  t.log('-', Object.keys($.liquid.data.variation.objects).length, 'Objects', '\n');

});

test('Switching Cursor\n', t => {

  const { tags, filters, objects } = $.liquid.data.variation;

  Object.entries(tags).forEach(([ tag, item ]) => {

    q.setTag(tag);
    t.deepEqual($.liquid.tag, item);

  });

  t.log('-', Object.keys(tags).length, 'Tags Walked');

  Object.entries(filters).forEach(([ tag, item ]) => {

    q.setFilter(tag);
    t.deepEqual($.liquid.filter, item);

  });

  t.log('-', Object.keys(filters).length, 'Filters Walked');

  Object.entries(objects).forEach(([ tag, object ]) => {

    q.setObject(tag);
    t.deepEqual($.liquid.object, object);

  });

  t.log('-', Object.keys(objects).length, 'Objects Walked', '\n');

  t.pass();

});

test('Query Engine\n', t => {

  // Property/Modifier Argument
  q.setFilter('font_modify');

  t.log('Set Filter:', 'font_modify');

  // Select Weight
  t.true(q.isValue('weight'));

  t.log('Filter Value:', 'weight');

  // Move to next argument
  q.nextArgument();

  t.log('Filter Moved to next argument');

  t.true(q.isValue('100'));

  // Move to next argument
  t.false(q.nextArgument());

  // set new tag
  t.true(q.setTag('assign'));

  t.log('Set Tag', 'assign');

  // set new filter
  t.true(q.setFilter('asset_img_url'));

  t.log('Set Filter', 'asset_img_url');

  t.true(q.isType(6));
  t.false(q.isRequired());

  t.true(q.isParameter('crop'));
  t.false(q.isValue('xxx'));

  t.true(q.isValue('top'));
  t.true(q.nextParameter());
  t.true(q.isParameter('format'));

  t.pass();

});
