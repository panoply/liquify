import test from 'ava';
import * as mocks from '../mocks/json';
import { Prettify } from '../../package/index';

const prettify = new Prettify();

test('JSON formatting via language Instance', t => {

  prettify.json(mocks.json_unformatted);
  t.pass();

});

test('JSON parse error when formatting', t => {

  t.throws(() => prettify.json(mocks.json_invalid));
  t.pass();

});
