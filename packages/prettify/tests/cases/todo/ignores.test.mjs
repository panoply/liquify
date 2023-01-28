import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test.skip('Ignore file using Liquid comment', async t => {

  await forRule('cases/ignores')({
    'liquid-ignore-file': [
      {
        language: 'liquid'
      },
      {
        language: 'html'
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

  });

});

test.skip('Ignore file using HTML comment', async t => {

  await forRule('cases/ignores')({
    'html-ignore-file': [
      {
        language: 'liquid'
      },
      {
        language: 'html'
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});

test.skip('Ignore file using line comment', async t => {

  await forRule('cases/ignores')({
    'javascript-ignore-file-2': [
      {
        lexer: 'script',
        language: 'javascript'
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});

test.skip('Ignore file using line block comment', async t => {

  await forRule('cases/ignores')({
    'javascript-ignore-file-1': [
      {
        lexer: 'script',
        language: 'javascript'
      },
      {
        lexer: 'script',
        language: 'javascript',
        script: {
          arrayFormat: 'inline'
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});

test.skip('Ignore code regions using Liquid comments ', async t => {

  await forRule('cases/ignores')({
    'liquid-ignore-region': [
      {
        language: 'liquid',
        markup: {
          forceIndent: true
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});

test.skip('Ignore code regions using HTML comments', async t => {

  await forRule('cases/ignores')({
    'html-ignore-region': [
      {
        language: 'html',
        markup: {
          forceIndent: true
        }
      },
      {
        language: 'liquid',
        markup: {
          forceIndent: true
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});

test.todo('Ignores: Block and Line inline region ignores are not respected');

test.skip('Ignore code regions using JS/TS/CSS block comments', async t => {

  await forRule('cases/ignores')({
    'javascript-ignore-region-1': [
      {
        language: 'javascript',
        script: {
          arrayFormat: 'inline'
        }
      }

    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    t.log(input);

  });

});

test.skip('Ignore code regions using JS/TS/SCSS line comments', async t => {

  await forRule('cases/ignores')({
    'javascript-ignore-region-2': [
      {
        language: 'javascript',
        script: {
          arrayFormat: 'inline'
        }
      }

    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label(rule));

    // t.log(input);

  });

});
