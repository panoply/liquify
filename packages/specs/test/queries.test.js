import test from 'ava';
import * as spec from '../package/index';
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

  const standard = setData(spec.variation);

  t.is(spec.cursor.engine, 'standard');

  t.log(spec.cursor.engine);
  t.log('-', Object.keys(standard.tags).length, 'Tags');
  t.log('-', Object.keys(standard.filters).length, 'Filters');
  t.log('-', Object.keys(standard.objects).length, 'Objects', '\n');

  /* SHOPIFY ENGINE ----------------------------- */

  spec.engine('shopify');

  const shopify = setData(spec.variation);

  t.is(spec.cursor.engine, 'shopify');

  t.log(spec.cursor.engine);
  t.log('-', Object.keys(shopify.tags).length, 'Tags');
  t.log('-', Object.keys(shopify.filters).length, 'Filters');
  t.log('-', Object.keys(shopify.objects).length, 'Objects', '\n');

});

test('Switching Cursor\n', t => {

  const { tags, filters, objects } = setData(spec.variation);

  tags.forEach(([ tag, object ]) => {

    spec.tag(tag);

    t.deepEqual(spec.cursor.tag, object);

  });

  t.log('-', Object.keys(tags).length, 'Tags Walked');

  filters.forEach(([ tag, object ]) => {

    spec.filter(tag);

    t.deepEqual(spec.cursor.filter, object);

  });

  t.log('-', Object.keys(filters).length, 'Filters Walked');

  objects.forEach(([ tag, object ]) => {

    spec.object(tag);

    t.deepEqual(spec.cursor.object, object);
    // t.log(tag);

  });

  t.log('-', Object.keys(objects).length, 'Objects Walked', '\n');

  t.pass();

});

test('Walking Arguments', t => {

  /* ARGUMENTS AS ARRAY ------------------------- */

  spec.filter('link_to');

  // First argument is type string (6 enum is string)
  t.deepEqual(spec.cursor.argument, { required: true, type: 6 });

  // Move to next argument
  spec.argument.next();

  // Second argument is not required on 'link_to'
  t.deepEqual(spec.cursor.argument, { required: false, type: 6 });

  // No more arguments to walk on this filter
  t.is(spec.argument.next(), false);

  /* NEXT FILTER -------------------------------- */

  spec.cursor.reset();

  // Property/Modifier Argument
  spec.filter('font_modify');

  // Select Weight
  t.is(spec.argument.isValue('weight'), true);

  t.log(spec.argument);

  // Move to next argument
  spec.argument.next();

  // Test values provided by font_modify
  t.is(spec.argument.isValue('100'), true);
  t.is(spec.argument.isValue('00'), false);
  t.is(spec.argument.isValue('+100'), true);
  t.is(spec.argument.isValue('bold'), true);
  t.is(spec.argument.isValue('-2'), false);
  t.is(spec.argument.isValue('lighter'), true);

  // Return false as no more arguments exists
  t.is(spec.argument.next(), false);

  /* NEXT FILTER -------------------------------- */

  // Property/Modifier Argument
  spec.filter('asset_img_url');

  // t.log(argument);

  // Default has unknown value, should pass true
  t.is(spec.argument.isValue('200x'), true);

  if (spec.argument.parameter) {

    t.is(spec.argument.paramProp('crop'), true);

    // Valid
    t.is(spec.argument.paramValue('top'), true);

    // no foo value on the crop parameter argument
    t.is(spec.argument.paramValue('foo'), false);

    // parameter are unique and cannot be expressed twice
    t.is(spec.argument.paramProp('crop'), false);

    // Change parameter
    t.is(spec.argument.paramProp('format'), true);

    // these are valid values
    t.is(spec.argument.paramValue('jpg'), true);
    t.is(spec.argument.paramValue('pjpg'), true);

    // this fails
    t.is(spec.argument.paramValue('png'), false);

    // Change parameter
    t.is(spec.argument.paramProp('scale'), true);

    // valid
    t.is(spec.argument.paramValue('2'), true);
    t.is(spec.argument.paramValue('3'), true);

    // this fails
    t.is(spec.argument.paramValue('1'), false);

    // Ensure unique
    t.is(spec.argument.paramProp('crop'), false);
    t.is(spec.argument.paramProp('scale'), false);
    t.is(spec.argument.paramProp('scale'), false);

  }

  spec.filter('font_face');

  if (spec.argument.parameter) {

    t.is(spec.argument.paramProp('font_display'), true);
    t.is(spec.argument.paramValue('auto'), true);

    // prop is unique
    t.is(spec.argument.paramProp('font_display'), false);

    // Fails
    t.is(spec.argument.paramValue('foo'), false);

  }

  // Reset
  spec.cursor.reset();

  t.is(spec.cursor.argument, null);
  t.is(spec.cursor.tag, null);
  t.is(spec.cursor.filter, null);
  t.is(spec.cursor.object, null);

  t.pass();

});
