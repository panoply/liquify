import test from 'ava';
import { liquid, q, $ } from '@liquify/liquid-language-specs';

test('Get Completions\n', t => {

  q.setEngine('shopify');

  t.truthy($.liquid.data.completions);
  t.truthy($.liquid.data.variation.filters);

  t.truthy($.liquid.data.variation.objects);

  t.pass();

});
