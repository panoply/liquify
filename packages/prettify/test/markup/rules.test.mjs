import test from 'ava';
import * as prettify from '../../package/index.mjs';
import c from 'chalk';

test('Force Attribute (inner content has surrounding space)', async t => {

  const input = '<div id="foo" class="bar" data-attr-name="baz"> {{ x }} </div>';
  const output = await prettify.markup(input, { forceAttribute: true });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Force Attribute (inner content without surrounding space)', async t => {

  const input = '<div id="foo" class="bar" data-attr-name="baz">{{ x }}</div>';
  const output = await prettify.markup(input, { forceAttribute: true });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Force Attribute when exceeding wrap', async t => {

  const input = '<div id="foo" class="bar" data-attr-name="baz">{{ x }}</div>';
  const output = await prettify.markup(input, { forceAttribute: false, wrap: 80 });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Force Attribute with Liquid attributes', async t => {

  const input = '<div {% if x %}id="baz"{% else %}id="foo" {% endif %}> {{ x }} </div>';
  const output = await prettify.markup(input, { forceAttribute: true });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Force Indent', async t => {

  const input = '<div id="foo"><ul><li></li><li></li></ul></div>';
  const output = await prettify.markup(input, { forceIndent: true, forceAttribute: false });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Quote Convert Double', async t => {

  const input = '<div id=\'foo\'>{{ \'bar\' }}</div>';
  const output = await prettify.markup(input, { quoteConvert: 'double' });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});

test('Quote Convert Single', async t => {

  const input = '<div id="foo">{{ \'bar\' }}</div>';
  const output = await prettify.markup(input, { quoteConvert: 'single' });

  t.log(c.bold.white('Before\n'), input);
  t.log(c.bold.white('After\n'), c.cyanBright(output));
  t.pass();

});
