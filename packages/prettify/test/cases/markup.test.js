import test from 'ava';
import * as mocks from '../mocks/markup';
import { Prettify } from '../../package/index';

const prettify = new Prettify({
  markup: {
    forceAttribute: false
  }
});

test('Markup format ', t => {

  const markup = prettify.markup(mocks.markup_unformatted);

  t.log(markup);
  t.pass();

});

test('Markup inline comment ignore', t => {

  const markup = prettify.markup(mocks.markup_ignore_inline);

  t.log(markup);
  t.pass();

});

test('Markup invalid input passed', t => {

  t.throws(() => prettify.markup(mocks.markup_invalid));
  t.pass();

});
