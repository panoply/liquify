import test from 'ava';
import * as c from './../shared';

/* -------------------------------------------- */
/* BRACKET NOTATION                             */
/* -------------------------------------------- */

test.serial('Missing property in object bracket notation\n', t => {

  c.doTests(
    [
      [ '{{ object[] }}', 'object[]' ],
      [ '{{ object.prop[inner[]] }}', 'inner[]' ],
      [ '{{ object["prop"][] }}', '"prop"' ],
      [ '{{ object["prop"][inner.prop[deeper[]]] }}', '"prop"' ],
      [ '{{ object.prop["foo"].bar[] }}', '"foo"' ]
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

test.serial('Missing quotation character\n', t => {

  c.doTests(
    [
      [ '{{ "foo }}', 'foo ' ],
      [ '{{ object["] }}', 'object["] ' ],
      [ '{{ object["prop ] }}', 'rop ] ' ]
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
