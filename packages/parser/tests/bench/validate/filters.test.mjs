import test from 'ava';
import * as c from '../shared';

/* -------------------------------------------- */
/* BRACKET NOTATION                             */
/* -------------------------------------------- */

test.serial('Filter expression errors\n', t => {

  c.doTests(
    [
      [ '{{ tag |  }}', 'tag |  ' ],
      [ '{{ tag | append "foo"  }}', 'append ' ],
      [ '{{ tag | remove:: "foo"  }}', 'remove:' ],
      [ '{{ tag | plus=10  }}', 'plus' ]
    ]
  )((
    {
      title,
      input,
      message,
      token,
      match,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    // t.log('Diagnostic :', c.chalk.white.italic(message));
    t.pass();

  });

});

test.serial('Unknown Filter name\n', t => {

  c.doTests(
    [
      [ '{{ tag | append "foo"  }}', 'append ' ],
      [ '{{ tag | remove:: "foo"  }}', 'remove:' ],
      [ '{{ tag | plus=10  }}', 'plus' ]

    ]
  )((
    {
      title,
      input,
      token,
      match,
      message,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    t.log('Diagnostic :', c.chalk.white.italic(message));
    t.pass();

  });

});

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
      message,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    t.log('Diagnostic :', c.chalk.white.italic(message));
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
      message,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    t.log('Diagnostic :', c.chalk.white.italic(message));
    t.pass();

  });

});

test.serial('Invalid argument parameter\n', t => {

  c.doTests(
    [
      [ '{{ tag | asset_img_url: "100x",  foo: 20 }}', 'foo' ],
      [ '{{ tag | time_tag: "%a, %b %d, %Y", quux: "%Y-%m-%d" }}', 'quux' ],
      [ '{{ foo | color_modify: "red", 1000  }}', '1000' ],
      [ '{{ tag | asset_img_url: "100x10" }}', '"100x10"' ]
    ]
  )((
    {
      title,
      input,
      token,
      match,
      message,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    t.log('Diagnostic :', c.chalk.white.italic(message));
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
      message,
      newline
    }
  ) => {

    t.is(token, match);
    t.log(c.chalk.magenta(title), c.log(input, match, 'redBright'), newline);
    t.log('Diagnostic :', c.chalk.white.italic(message));
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
    t.log(c.chalk.green(title), c.log(input, /\w:|["\w0-9]+/, 'cyan'), newline);
    t.pass();

  });

});
