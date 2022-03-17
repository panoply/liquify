import test from 'ava';
import * as mocks from '../mocks/markup.mjs';
import * as prettify from '../../package/index.mjs';

test('Markup format ', async t => {

  const markup = await prettify.markup(mocks.markup_unformatted, {
    forceAttribute: false
  });

  t.log(markup);
  t.pass();

});

test('Markup inline comment ignore', async t => {

  const markup = await prettify.markup(mocks.markup_ignore_inline, {
    forceAttribute: false
  });

  t.log(markup);
  t.pass();

});

test.skip('Markup invalid input passed', async t => {

  await t.throwsAsync(() => prettify.markup(mocks.markup_invalid));

  t.pass();

});
