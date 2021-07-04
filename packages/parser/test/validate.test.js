import test from 'ava';
import * as c from './common';

function toToken (input) {

  const document = c.parse(input);

  return document.getText(document.diagnostics[0].range);

}

const doTests = (errors) => fn => {

  errors.forEach((input, index) => {

    const token = toToken(Array.isArray(input) ? input[0] : input);

    return fn({
      title: 'Test Case: ' + index++,
      input: Array.isArray(input) ? input[0] : input,
      token,
      match: Array.isArray(input) ? input[1] : input,
      newline: index === errors.length ? '\n' : ''
    });

  });

};

/* -------------------------------------------- */
/* BRACKET NOTATION                             */
/* -------------------------------------------- */

test.serial('Liquid Missing end tag\n', t => {

  doTests(
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
    t.log(title, c.log(input, match, 'cyan'), newline);
    t.pass();

  });

});

test.serial('HTML Missing end tag\n', t => {

  doTests(
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
    t.log(title, c.log(input, '<div>', 'cyan'), newline);
    t.pass();

  });

});

test.serial('HTML Missing start tag\n', t => {

  doTests(
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
    t.log(title, c.log(input, '{% endif %}', 'cyan'), newline);
    t.pass();

  });

});

test.serial('Missing property in object bracket notation\n', t => {

  doTests(
    [
      '{{ object[] }}',
      '{{ object.prop[inner[]] }}',
      '{{ object["prop"][] }}',
      '{{ object["prop"][inner.prop[deeper[]]] }}',
      '{{ object.prop["foo"].bar[] }}'
    ]
  )((
    {
      token,
      title,
      input,
      newline
    }
  ) => {

    t.is(token, '[]');
    t.log(title, c.log(input, /\[]/, 'cyan'), newline);
    t.pass();

  });

});

test.serial('Missing quotation character\n', t => {

  doTests(
    [
      [ '{{ "foo }}', ' "foo ' ],
      [ '{{ object["] }}', '"] ' ],
      [ '{{ object["prop ] }}', '"prop ] ' ]
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
    t.log(title, c.log(input, /(")(\s*.*?)/, [ 'cyan', 'bgBlackBright' ]), newline);
    t.pass();

  });

});
