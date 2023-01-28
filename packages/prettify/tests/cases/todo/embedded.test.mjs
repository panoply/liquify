import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('HTML embedded script tag', async t => {

  await forRule('cases/embedded')({
    'html-script-js-1': [
      {
        language: 'html',
        markup: {
          forceIndent: false
        }
      },
      {
        language: 'html',
        markup: {
          forceIndent: true
        }
      }
    ],
    'html-script-js-2': [
      {
        language: 'html',
        markup: {
          forceIndent: false
        }
      },
      {
        language: 'html',
        markup: {
          forceIndent: true
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label.description);

    // t.log(input);

  });

  prettify.options({ markup: { forceIndent: false } });

});

test.serial.skip('HTML embedded application/json+ld script tag', async t => {

  return forRule('cases/embedded', {
    'html-script-json-1': [
      {
        language: 'html'
      },
      {
        language: 'html'
      }
    ],
    'html-script-json-2': [

    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label.description);

    // t.log(input);

  });

});

test.serial.skip('Liquid embedded JavaScript tag', async t => {

  return forRule('cases/embedded', {
    'liquid-javascript': [
      {
        language: 'html'
      }

    ]
  }
  , async function (source, rule, label) {

    const input = await prettify.format(source, rule);

    t.snapshot(input, label.description);

    // t.log(input);

  });

});
