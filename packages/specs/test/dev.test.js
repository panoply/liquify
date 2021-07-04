import test from 'ava';
import { Specs } from '../dist/file';
import { shopify } from '../dist/shopify';

Specs.Engine('shopify');

test('Cursor Execution', t => {

  let index = 1;
  let runs = 0;

  while (runs < 1000) {

    Object.entries(shopify.filters).forEach(([ tag, object ]) => {

      Specs.Cursor(tag, 'filters');
      index++;

      t.deepEqual(Specs.cursor, object);

    });

    Object.entries(shopify.tags).forEach(([ tag, object ]) => {

      Specs.Cursor(tag, 'tags');
      index++;

      t.deepEqual(Specs.cursor, object);

    });

    Object.entries(shopify.objects).forEach(([ tag, object ]) => {

      Specs.Cursor(tag, 'objects');
      index++;

      t.is(Specs.cursor, object);

    });

    runs++;
  }

  t.log('1000 runs');
  t.log(index, 'cursor assignments');

  t.pass();

});

/**
 *   Object.entries(shopify.filters).forEach(([ tag, object ]) => {

    t.log(tag);

    Specs.Cursor(tag);

    t.deepEqual(Specs.cursor, object);

  });

  Object.entries(shopify.tags).forEach(([ tag, object ]) => {

    t.log(tag);

    Specs.Cursor(tag);

    t.deepEqual(Specs.cursor, object);

  });

 */
