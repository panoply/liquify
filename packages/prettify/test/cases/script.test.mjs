import test from 'ava';
import * as mocks from '../mocks/script';
import { Prettify } from '../../package/index';

const prettify = new Prettify();

test('Script formatting via language Instance', t => {

  const script = prettify.script(mocks.script_unformatted);

  t.log(script);
  t.pass();

});

test('Script formatting with Liquid', t => {

  const script = prettify.script(mocks.script_with_liquid);

  t.log(script);
  t.pass();

});

test('Script formatting invalid', t => {

  t.throws(() => prettify.script(mocks.script_invalid));
  t.pass();

});
