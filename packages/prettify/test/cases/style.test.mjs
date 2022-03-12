import test from 'ava';
import * as mocks from '../mocks/style';
import { Prettify } from '../../package/index';

const prettify = new Prettify({

});

test('Style formatting via language Instance', t => {

  const style = prettify.style(mocks.style_unformatted);

  t.log(style);
  t.pass();

});

test('Style formatting with Liquid', t => {

  const style = prettify.style(mocks.style_with_liquid);

  t.log(style);
  t.pass();

});

test('Style parse error when formatting', t => {

  t.throws(() => prettify.style(mocks.style_invalid));
  t.pass();

});
