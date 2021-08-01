import test from 'ava';
import { Prettify } from '../package/index';
import * as mocks from './mocks/export';

const prettify = new Prettify();

test('test', t => {

  prettify.rules({
    markup: {
      forceAttribute: false
    }
  });

  const formatted = prettify.script(mocks.script.script_with_liquid);

  t.log(prettify.error);
  t.log(formatted);

  t.pass();
});
