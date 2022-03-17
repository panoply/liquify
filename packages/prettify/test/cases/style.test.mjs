import test from 'ava';
import * as mocks from '../mocks/style.mjs';
import * as prettify from '../../package/index.mjs';

test('Style formatting via language Instance', async t => {

  const style = await prettify.style(mocks.style_unformatted);

  t.log(style);
  t.pass();

});

test('Style formatting with Liquid', async t => {

  const style = await prettify.style(mocks.style_with_liquid);

  t.log(style);
  t.pass();

});

test.skip('Style parse error when formatting', t => {

  t.throwsAsync(() => prettify.style(mocks.style_invalid));
  t.pass();

});
