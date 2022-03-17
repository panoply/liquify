import test from 'ava';
import { liquid, query as q, state as $ } from '../../package/index.js';

function setData (variation) {

  const tags = Object.entries(variation.tags);
  const filters = Object.entries(variation.filters);
  const objects = Object.entries(variation.objects || []);

  return {
    tags,
    filters,
    objects
  };
}

test('Switching Engines\n', t => {

  /* STANDARD ENGINE ---------------------------- */

  q.setEngine('standard');

  const standard = setData(liquid.variation);

  t.is(liquid.engine, 'standard');

  t.log(liquid.engine);
  t.log('-', Object.keys(standard.tags).length, 'Tags');
  t.log('-', Object.keys(standard.filters).length, 'Filters');
  t.log('-', Object.keys(standard.objects).length, 'Objects', '\n');

  /* SHOPIFY ENGINE ----------------------------- */

  q.setEngine('shopify');

  const shopify = setData(liquid.variation);

  t.is(liquid.engine, 'shopify');

  t.log(liquid.engine);
  t.log('-', Object.keys(shopify.tags).length, 'Tags');
  t.log('-', Object.keys(shopify.filters).length, 'Filters');
  t.log('-', Object.keys(shopify.objects).length, 'Objects', '\n');

});

test('Switching Cursor\n', t => {

  const { tags, filters, objects } = setData(liquid.variation);

  tags.forEach(([ tag, item ]) => {

    q.setTag(tag);
    t.deepEqual($.liquid.tag, item);

  });

  t.log('-', Object.keys(tags).length, 'Tags Walked');

  filters.forEach(([ tag, item ]) => {

    q.setFilter(tag);
    t.deepEqual($.liquid.filter, item);

  });

  t.log('-', Object.keys(filters).length, 'Filters Walked');

  objects.forEach(([ tag, object ]) => {

    q.setObject(tag);
    t.deepEqual($.liquid.object, object);

  });

  t.log('-', Object.keys(objects).length, 'Objects Walked', '\n');

  t.pass();

});

test('Dev\n', t => {

  // Property/Modifier Argument
  q.setFilter('font_modify');

  // Select Weight
  t.true(q.isValue('weight'));

  // Move to next argument
  q.nextArgument();

  t.true(q.isValue('100'));

  // Move to next argument
  t.false(q.nextArgument());

  // set new tag
  t.true(q.setTag('assign'));

  // set new filter
  t.true(q.setFilter('asset_img_url'));
  t.true(q.isType(6));
  t.false(q.isRequired());

  t.true(q.isParameter('crop'));
  t.false(q.isValue('xxx'));

  t.true(q.isValue('top'));
  t.true(q.nextParameter());
  t.true(q.isParameter('format'));

  t.pass();

});
