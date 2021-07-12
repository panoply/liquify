import test from 'ava';
import { spec } from '../package/index';
import { shopify as ShopifySpecs } from '../package/@variations/shopify';

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

  const standard = setData(spec.GetVariation());

  t.is(spec.engine, 'standard');

  t.log(spec.engine);
  t.log('-', Object.keys(standard.tags).length, 'Tags');
  t.log('-', Object.keys(standard.filters).length, 'Filters');
  t.log('-', Object.keys(standard.objects).length, 'Objects', '\n');

  /* SHOPIFY ENGINE ----------------------------- */

  spec.SetEngine('shopify');

  const shopify = setData(spec.GetVariation());

  t.is(spec.engine, 'shopify');

  t.log(spec.engine);
  t.log('-', Object.keys(shopify.tags).length, 'Tags');
  t.log('-', Object.keys(shopify.filters).length, 'Filters');
  t.log('-', Object.keys(shopify.objects).length, 'Objects', '\n');

});

test('Switching Cursor\n', t => {

  const { tags, filters, objects } = setData(spec.GetVariation());

  tags.forEach(([ tag, item ]) => {

    spec.SetTag(tag);

    t.deepEqual(spec.tag, item);

  });

  t.log('-', Object.keys(tags).length, 'Tags Walked');

  filters.forEach(([ tag, item ]) => {

    spec.SetFilter(tag);

    t.deepEqual(spec.filter, item);

  });

  t.log('-', Object.keys(filters).length, 'Filters Walked');

  objects.forEach(([ tag, object ]) => {

    spec.SetObject(tag);

    t.deepEqual(spec.object, object);
    // t.log(tag);

  });

  t.log('-', Object.keys(objects).length, 'Objects Walked', '\n');

  t.pass();

});

test('Dev\n', t => {

  // Property/Modifier Argument
  spec.SetFilter('font_modify');

  // Select Weight
  t.true(spec.isValue('weight'));

  // Move to next argument
  spec.NextArgument();

  t.log(spec.argument);

  // Test values provided by font_modify
  t.true(spec.isValue('100'));
  // t.false(spec.isValue('00'));
  // t.true(spec.isValue('+100'));
  // t.true(spec.isValue('bold'));
  // t.false(spec.isValue('-2'));
  // t.true(spec.isValue('lighter'));

  // Return false as no more arguments exists
  t.false(spec.NextArgument());

  t.true(spec.SetTag('assign'));

  t.true(spec.SetFilter('asset_img_url'));
  t.true(spec.isType(6));
  t.false(spec.isRequired());

  t.true(spec.isParameter('crop'));
  t.false(spec.isUnique('crop'));

  t.false(spec.isValue('xxx'));
  t.true(spec.isValue('top'));

  t.false(spec.NextArgument());

  t.true(spec.isParameter('format'));
  t.false(spec.isParameter('crop'));

  // t.false(spec.isUnique('crop'));

  // spec.nextArgument();

  // t.true(spec.isParameter('datetime'));
  // t.false(spec.isUnique('datetime'));

  // t.log(spec.state);

  t.pass();

});
