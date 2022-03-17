import test from 'ava';
import * as mocks from '../mocks/json.mjs';
import * as prettify from '../../package/index.mjs';

test('JSON formatting via language Instance', async t => {

  await prettify.json(mocks.json_unformatted);

  t.pass();

});

test.skip('JSON parse error when formatting', t => {

  t.throwsAsync(() => prettify.json(mocks.json_invalid));

  t.pass();

});
