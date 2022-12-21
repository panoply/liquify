import test from 'ava';
import * as c from '../shared';

/* -------------------------------------------- */
/* BRACKET NOTATION                             */
/* -------------------------------------------- */

test.serial('Liquid Missing end tag\n', t => {

  c.doTests(
    [
      [ '{% if x %}', '{% if x %}' ],
      [ '{% unless x %}{% if x %}{% endunless %}', '{% if x %}' ],
      [ '<html><body>{% if x %}</body></html>', '{% if x %}' ],
      [ '<html>{% if x %}{% unless x %}{% endif %}</html>', '{% unless x %}' ]
    ]
  )((
    {
      token,
      title,
      input,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, match, 'redBright'), newline);
    t.pass();

  });

});

test.serial('HTML Missing end tag\n', t => {

  c.doTests(
    [
      '<div>',
      '<html><body><div></body></html>'
    ]
  )((
    {
      token,
      title,
      input,
      newline
    }
  ) => {

    t.is(token, '<div>');
    t.log(title, c.log(input, '<div>', 'redBright'), newline);
    t.pass();

  });

});

test.serial('Liquid Missing start tag\n', t => {

  c.doTests(
    [
      '{% endif %}'
    ]
  )((
    {
      token,
      title,
      input,
      newline
    }
  ) => {

    t.is(token, '{% endif %}');
    t.log(title, c.log(input, '{% endif %}', 'redBright'), newline);
    t.pass();

  });

});
