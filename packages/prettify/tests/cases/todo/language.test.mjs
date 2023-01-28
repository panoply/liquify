import test from 'ava';
import { getSample } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test.serial('HTML language detection', async t => {

  const source = await getSample('cases/languages/html');

  t.deepEqual(prettify.language(source), {
    language: 'html',
    lexer: 'markup',
    languageName: 'HTML'
  });

});

test.serial('Liquid language detection', async t => {

  const source = await getSample('cases/languages/liquid');

  t.deepEqual(prettify.language(source), {
    language: 'liquid',
    lexer: 'markup',
    languageName: 'Liquid'
  });

});

test.serial('CSS language detection', async t => {

  const source = await getSample('cases/languages/css');

  t.deepEqual(prettify.language(source), {
    language: 'css',
    lexer: 'style',
    languageName: 'CSS'
  });

});

test.serial('SCSS language detection', async t => {

  const source = await getSample('cases/languages/scss');

  t.deepEqual(prettify.language(source), {
    language: 'scss',
    lexer: 'style',
    languageName: 'SCSS'
  });

});

test.serial('JSON language detection', async t => {

  const source = await getSample('cases/languages/json');

  t.deepEqual(prettify.language(source), {
    language: 'json',
    lexer: 'script',
    languageName: 'JSON'
  });

});

test.serial('JavaScript language detection', async t => {

  const source = await getSample('cases/languages/javascript');

  t.deepEqual(prettify.language(source), {
    language: 'javascript',
    lexer: 'script',
    languageName: 'JavaScript'
  });

});

test.serial('TypeScript language detection', async t => {

  const source = await getSample('cases/languages/typescript');

  t.deepEqual(prettify.language(source), {
    language: 'typescript',
    lexer: 'script',
    languageName: 'TypeScript'
  });

});

test.serial('Language Detection hooks', async t => {

  const source = await getSample('cases/languages/liquid');

  prettify.language.listen(({ language, languageName, lexer }) => {

    t.is(language, 'liquid');
    t.is(languageName, 'Liquid');
    t.is(lexer, 'markup');

  });

  prettify.language.listen(() => {

    return {
      language: 'typescript',
      lexer: 'script',
      languageName: 'TypeScript'
    };

  });

  t.deepEqual(prettify.language(source), {
    language: 'typescript',
    lexer: 'script',
    languageName: 'TypeScript'
  });

});
