import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test.before(() => prettify.options({ language: 'javascript', lexer: 'script' }));

test.skip('Preserve Comments', async t => {

  await forRule('cases/javascript')({
    'comment-indent': [
      {
        preserveComment: false,
        script: {
          braceNewline: false
        }
      },
      {
        preserveComment: true,
        script: {
          braceNewline: false
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const output = await prettify.format(source, rule);

    t.snapshot(output, label.description);

  });

});

test.skip('Inline Return', async t => {

  await forRule('cases/javascript')({
    'inline-return': [
      {
        attemptCorrection: false,
        indentSize: 2,
        script: {
          braceNewline: false,
          inlineReturn: true,
          elseNewline: false
        }
      },
      {
        attemptCorrection: true,
        indentSize: 2,
        script: {
          braceNewline: false,
          inlineReturn: true,
          elseNewline: false
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const output = await prettify.format(source, rule);

    t.snapshot(output, label.description);

  });

});

test.skip('Object Sorting', async t => {

  await forRule('cases/javascript')({
    'object-sort': [
      {
        indentSize: 4,
        script: {
          objectSort: true,
          objectIndent: 'indent'
        },
        style: {
          sortProperties: true
        }
      },
      {
        attemptCorrection: false,
        indentSize: 2,
        script: {
          objectSort: false,
          objectIndent: 'indent'
        },
        style: {
          sortProperties: false
        }
      }
    ]
  }
  , async function (source, rule, label) {

    const output = await prettify.format(source, rule);

    t.snapshot(output, label.description);

  });

});
