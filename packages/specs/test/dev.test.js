import test from 'ava';
import { liquid, query as q, state as $, provide } from '../package/index';

test('Get Completions\n', t => {

  q.setEngine('shopify');

  t.truthy(liquid.completions.tags);
  t.truthy(liquid.completions.filters);

  t.log(liquid.completions.objects);

  t.pass();

});
