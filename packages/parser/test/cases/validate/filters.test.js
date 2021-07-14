import test from 'ava';
import * as c from './../shared';

const filters = `
{{ sort | sort }}
{{ append | append: 'foo' }}
{{ replace | replace: 'bar', 'baz' }}
{{ plus | plus: 10 }}
{{ truncate | truncate: 220, 'xxx' }}
{{ font_modify | font_modify: 'style', 'normal' }}
{{ time_tag | time_tag: '%a, %b %d, %Y', datetime: '%Y-%m-%d', format: 'date' }}
`;

/* -------------------------------------------- */
/* BRACKET NOTATION                             */
/* -------------------------------------------- */

test.serial('Missing Argument\n', t => {

  c.doTests(
    [
      [ '{{ tag | append:  }}', 'append:  ' ],
      [ '{{ tag | replace: "bar", }}', 'bar", ' ],
      [ '{{ tag | font_face: font_display:  }}', ':  ' ],
      [ '{{ tag | font_modify: "style", }}', 'style", ' ],
      [ '{{ tag | truncate:  }}', 'truncate:  ' ]
    ]
  )((
    {
      title,
      input,
      token,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, match, 'redBright'), newline);
    t.pass();

  });

});

test.serial('Invalid argument types\n', t => {

  c.doTests(
    [
      [ '{{ tag | append: 10  }}', '10' ],
      [ '{{ tag | plus: "100"  }}', '"100"' ],
      [ '{{ tag | asset_img_url: "100x",  scale: "2" }}', '"2"' ],
      [ '{{ tag | slice: true  }}', 'true' ],
      [ '{{ tag | time_tag: 100 }}', '100' ]
    ]
  )((
    {
      title,
      input,
      token,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, match, 'redBright'), newline);
    t.pass();

  });

});

test.serial('Invalid argument parameter\n', t => {

  c.doTests(
    [
      [ '{{ tag | asset_img_url: "100x",  foo: 20 }}', 'foo' ],
      [ '{{ tag | time_tag: "%a, %b %d, %Y", quux: "%Y-%m-%d" }}', 'quux' ]
    ]
  )((
    {
      title,
      input,
      token,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, match, 'redBright'), newline);
    t.pass();

  });

});

test.serial('Duplicate argument parameters\n', t => {

  c.doTests(
    [
      [ '{{ tag | asset_img_url: "100x", scale: 2, scale: 2 }}', 'scale' ]
    ]
  )((
    {
      title,
      input,
      token,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, match, 'redBright'), newline);
    t.pass();

  });

});
test.skip('Filter parameters\n', t => {

  c.doTests(
    [

      '{{ tag | asset_img_url: "100x100",  scale: 2, format: "loose"  }}',
      '{{ tag | font_face: font_display: "auto" }}'
    ]
  )((
    {
      token,
      title,
      match,
      input,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(title, c.log(input, /\w:|["\w0-9]+/, 'cyan'), newline);
    t.pass();

  });

});
