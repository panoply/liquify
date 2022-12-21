import test from 'ava';
import { forRule } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

/* -------------------------------------------- */
/* GLOBAL RULE TESTS                            */
/* -------------------------------------------- */

// ALL PRETTIFY OPTIONS MUST END WITH THE DEFAULTS
// BECAUSE OPTIONS ARE PERSISTED WHEN CHANGED.

/* -------------------------------------------- */
/* TESTS                                        */
/* -------------------------------------------- */

test.serial('Word Wrap limit', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({
    language: 'xml',
    markup: {
      forceIndent: true
    }
  });

  await forRule('rules/global/wrap')([
    80,
    100,
    120,
    30,
    0
  ]
  , async function (source, wrap, label) {

    const output = await prettify.format(source, { wrap });

    t.snapshot(output, label({ wrap }));

    // t.log(output);

  });

});

test.serial('CRLF Line Terminations', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({ language: 'html' });

  await forRule('rules/global/crlf')([
    true,
    false
  ]
  , async function (source, crlf, label) {

    const output = await prettify.format(source, { crlf });

    t.snapshot(output, label({ crlf }));

    // t.log(output);
  });

});

test.serial('Indent Characters', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({ language: 'javascript' });

  await forRule('rules/global/indent-char')([
    {
      indentSize: 1,
      indentChar: '\t'
    },
    {
      indentSize: 2,
      indentChar: 'x'
    },
    {
      indentSize: 2,
      indentChar: ' '
    }
  ]
  , async function (source, { indentChar, indentSize }, label) {

    const output = await prettify.format(source, { indentChar, indentSize });

    t.snapshot(output, label({ indentChar }));

    // t.log(output);

  });

});

test.serial('Identation Size', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({ language: 'liquid' });

  await forRule('rules/global/indent-size')([
    6,
    4,
    5,
    3,
    1,
    2
  ]
  , async function (source, indentSize, label) {

    const output = await prettify.format(source, { indentSize });

    t.snapshot(output, label({ indentSize }));

    // t.log(output);
  });

});

test.serial('Preserve Newlines', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({ language: 'css' });

  /* SAMPLE ------------------------------------- */

  await forRule('rules/global/preserve-line')([
    5,
    4,
    1,
    3,
    0,
    2
  ]
  , async function (source, preserveLine, label) {

    const output = await prettify.format(source, { preserveLine });

    t.snapshot(output, label({ preserveLine }));

    // t.log(output);
  });

});

test.serial('End with Newline', async t => {

  /* OPTIONS ------------------------------------ */

  prettify.options({ language: 'text' });

  await forRule('rules/global/end-newline')([
    true,
    false
  ]
  , async function (source, endNewline, label) {

    const output = await prettify.format(source, { endNewline });

    t.snapshot(output, label({ endNewline }));

    // t.log(output);
  });
});

test.todo('Comment Indentation: Rule is not being respected in Liquid');
test.todo('Comment Indentation: HTML multiline comments fail');
test.todo('Comment Preservation: Liquid and HTML comments do not respect preservation');

test.serial.skip('Preserve Comments', async t => {

  prettify.options({ language: 'liquid' });

  /* SAMPLE ------------------------------------- */

  const source = await samples.rules('global/comment-indent');

  /* RULES -------------------------------------- */

  for (const preserveComment of [ true, false ]) {

    const output = await prettify.format(source, { preserveComment });

    t.log(`{ preserveComment: ${preserveComment} }`, output);
    /* t.snapshot(
      output,
      `{ commentIndent: ${commentIndent} } ${commentIndent === false ? '(default)' : ''}`
    ); */

  };
});

test.serial.skip('Comment Indentation', async t => {

  prettify.options({ language: 'liquid' });

  /* SAMPLE ------------------------------------- */

  const source = await samples.rules('global/comment-indent');

  /* RULES -------------------------------------- */

  for (const commentIndent of [ true, false ]) {

    const output = await prettify.format(source, { commentIndent });

    t.log(`{ commentIndent: ${commentIndent} }`, output);
    /* t.snapshot(
      output,
      `{ commentIndent: ${commentIndent} } ${commentIndent === false ? '(default)' : ''}`
    ); */

  };
});
