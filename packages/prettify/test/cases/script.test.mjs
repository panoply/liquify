import test from 'ava';
import * as mocks from '../mocks/script.mjs';
import * as prettify from '../../package/index.mjs';

test('Script formatting via language Instance', async t => {

  const script = await prettify.script(mocks.script_unformatted);

  t.log(script);
  t.pass();

});

test('Script formatting with Liquid', async t => {

  const script = await prettify.script(mocks.script_with_liquid);

  t.log(script);
  t.pass();

});

test.skip('Script formatting invalid', t => {

  t.throws(async () => await prettify.script(mocks.script_invalid));
  t.pass();

});
