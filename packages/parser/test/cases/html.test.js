import test from 'ava';
import * as c from './__utils__';

let document;

function toJSON (
  {
    tag,
    offsets,
    closed,
    children,
    singular,
    attributes,
    errors,
    index,
    kind,
    root,
    type,
    diagnostics
  }
) {

  const object = {
    tag,
    offsets,
    singular,
    attributes,
    index,
    kind,
    root,
    type,
    children: children.map(toJSON)
  };

  if (errors.length > 0) {
    object.errors = errors;
    object.diagnostics = diagnostics;
  }

  return object;
}

function toNode (input) {

  document = c.parse(input);
  return document.nodes.map(toJSON);

}

/* -------------------------------------------- */
/* PARENT NODE                                  */
/* -------------------------------------------- */

test.serial('Parent\n', t => {

  const input = '<html></html>';

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      children: [],
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 6, 13 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1
    }
  ]);

  t.log('Input Document:', c.log(input, '</?html>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* CHILD NODES                                  */
/* -------------------------------------------- */

test.serial('First child\n', t => {

  const input = '<html><body></body></html>';

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 19, 26 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 12, 12, 19 ],
          attributes: {},
          children: [],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '</?body>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* CHILDREN                                     */
/* -------------------------------------------- */

test.serial('Second child\n', t => {

  const input = '<html><body><div></div></body></html>';

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 30, 37 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 12, 23, 30 ],
          attributes: {},
          children: [
            {
              tag: 'div',
              attributes: {},
              children: [],
              index: 0,
              kind: 2,
              offsets: [ 12, 17, 17, 23 ],
              root: 1,
              singular: false,
              type: 1
            }
          ],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '</?div>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* VOID TAG                                     */
/* -------------------------------------------- */

test.serial('Void\n', t => {

  const input = '<hr>';

  t.deepEqual(toNode(input), [
    {
      tag: 'hr',
      attributes: {},
      children: [],
      index: 0,
      kind: 2,
      offsets: [ 0, 3, 4 ],
      root: 0,
      singular: true,
      type: 2
    }
  ]);

  t.log('Input Document:', c.log(input, '<hr>'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* NESTED VOID                                  */
/* -------------------------------------------- */

test.serial('Second child with void\n', t => {

  const input = '<html><body><div><hr></div></body></html>';

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 34, 41 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 12, 27, 34 ],
          attributes: {},
          children: [
            {
              tag: 'div',
              attributes: {},
              children: [
                {
                  attributes: {},
                  children: [],
                  index: 0,
                  kind: 2,
                  offsets: [
                    17,
                    20,
                    21
                  ],
                  root: 1,
                  singular: true,
                  tag: 'hr',
                  type: 2
                }
              ],
              index: 0,
              kind: 2,
              offsets: [ 12, 17, 21, 27 ],
              root: 1,
              singular: false,
              type: 1
            }
          ],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '<hr>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* MISSING CLOSE DELIMITER AND END TAG          */
/* -------------------------------------------- */

test.serial('Missing close delimiter and end tag\n', t => {

  const input = '<html><body <div></body></html>';

  /* TEST AST NODE ------------------------------ */

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 24, 31 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 11, 17, 24 ],
          attributes: {},
          diagnostics: [
            {
              data: { offset: 6 },
              severity: 1,
              message: 'Missing closing tag delimiter',
              range: {
                end: {
                  character: 11,
                  line: 0
                },
                start: {
                  character: 6,
                  line: 0
                }
              }
            }
          ],
          errors: [
            0
          ],
          children: [
            {
              tag: 'div',
              errors: [ 1 ],
              attributes: {},
              children: [],
              diagnostics: [
                {
                  data: { offset: 12 },
                  message: 'Missing end tag',
                  range: {
                    end: {
                      character: 17,
                      line: 0
                    },
                    start: {
                      character: 12,
                      line: 0
                    }
                  },
                  severity: 1
                }
              ],
              index: 0,
              kind: 2,
              offsets: [ 12, 17 ],
              root: 1,
              singular: false,
              type: 1
            }
          ],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '<div>'));

  /* -------------------------------------------- */
  /* TEST MISSING DELIMITER DIAGNOSTIC            */
  /* -------------------------------------------- */

  const delimiter = document.getText({
    end: {
      character: 11,
      line: 0
    },
    start: {
      character: 6,
      line: 0
    }
  });

  t.is(delimiter, '<body');

  t.log('Tag Delimiter:', c.log(delimiter, '<body', 'magentaBright'));

  /* TEST DIAGNOSTIC CAPTURE -------------------- */

  const string = document.getText({
    end: {
      character: 17,
      line: 0
    },
    start: {
      character: 12,
      line: 0
    }
  });

  t.is(string, '<div>');

  t.log('Missing Closer:', c.log(string, '<div>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* MISSING TAGS                                 */
/* -------------------------------------------- */

test.serial('Missing end tag\n', t => {

  const input = '<div>';

  /* TEST AST NODE ------------------------------ */

  t.deepEqual(toNode(input), [
    {
      tag: 'div',
      errors: [ 0 ],
      diagnostics: [
        {
          data: { offset: 0 },
          severity: 1,
          message: 'Missing end tag',
          range: {
            end: {
              character: 5,
              line: 0
            },
            start: {
              character: 0,
              line: 0
            }
          }
        }
      ],
      attributes: {},
      children: [],
      index: 0,
      kind: 2,
      offsets: [ 0, 5 ],
      root: 0,
      singular: false,
      type: 1
    }
  ]);

  t.log('Input Document:', c.log(input, '<div>'));

  /* TEST DIAGNOSTIC CAPTURE -------------------- */

  const string = document.getText({
    end: {
      character: 5,
      line: 0
    },
    start: {
      character: 0,
      line: 0
    }
  });

  t.is(string, '<div>');
  t.log('Diagnostic Tag:', c.log(string, '<div>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* MISSING TAG DEEP                             */
/* -------------------------------------------- */

test.serial('Nested missing end tag\n', t => {

  const input = '<html><body><div></body></html>';

  /* TEST AST NODE ------------------------------ */

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 24, 31 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 12, 17, 24 ],
          attributes: {},
          children: [
            {
              tag: 'div',
              errors: [ 0 ],
              attributes: {},
              children: [],
              diagnostics: [
                {
                  data: { offset: 12 },
                  message: 'Missing end tag',
                  range: {
                    end: {
                      character: 17,
                      line: 0
                    },
                    start: {
                      character: 12,
                      line: 0
                    }
                  },
                  severity: 1
                }
              ],
              index: 0,
              kind: 2,
              offsets: [ 12, 17 ],
              root: 1,
              singular: false,
              type: 1
            }
          ],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '<div>'));

  /* TEST DIAGNOSTIC CAPTURE -------------------- */

  const string = document.getText({
    end: {
      character: 17,
      line: 0
    },
    start: {
      character: 12,
      line: 0
    }
  });

  t.is(string, '<div>');

  t.log('Diagnostic Tag:', c.log(string, '<div>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* MISSING START TAG                            */
/* -------------------------------------------- */

test.serial('Nested missing start tag\n', t => {

  const input = '<html><body></div></body></html>';

  /* TEST AST NODE ------------------------------ */

  t.deepEqual(toNode(input), [
    {
      attributes: {},
      index: 0,
      kind: 2,
      offsets: [ 0, 6, 25, 32 ],
      root: 0,
      singular: false,
      tag: 'html',
      type: 1,
      children: [
        {
          tag: 'body',
          root: 1,
          singular: false,
          offsets: [ 6, 12, 18, 25 ],
          attributes: {},
          children: [
            {
              tag: 'div',
              errors: [ 0 ],
              attributes: {},
              children: [],
              diagnostics: [
                {
                  data: { offset: 12 },
                  message: 'Missing start tag',
                  range: {
                    end: {
                      character: 18,
                      line: 0
                    },
                    start: {
                      character: 12,
                      line: 0
                    }
                  },
                  severity: 1
                }
              ],
              index: 0,
              kind: 2,
              offsets: [ 12, 18 ],
              root: 1,
              singular: false,
              type: 1
            }
          ],
          index: 0,
          kind: 2,
          type: 1
        }
      ]
    }
  ]);

  t.log('Input Document:', c.log(input, '</div>'));

  /* TEST DIAGNOSTIC CAPTURE -------------------- */

  const string = document.getText({
    end: {
      character: 18,
      line: 0
    },
    start: {
      character: 12,
      line: 0
    }
  });

  t.is(string, '</div>');

  t.log('Diagnostic Tag:', c.log(string, '</div>', 'cyan'), '\n');

  t.pass();

});

/* -------------------------------------------- */
/* VOID WITH ATTRIBUTES                         */
/* -------------------------------------------- */

test.serial('Void with attributes\n', t => {

  const input = '<img id="foo" src="some/url">';

  t.deepEqual(toNode(input), [
    {
      tag: 'img',
      attributes: {
        id: 'foo',
        src: 'some/url'
      },
      children: [],
      index: 0,
      kind: 2,
      offsets: [ 0, 28, 29 ],
      root: 0,
      singular: true,
      type: 4
    }
  ]);

  t.log('Input Document:', c.log(input, 'src|id|["=]'));
  t.log('Tag Attributes:', { id: 'foo', src: 'some/url' }, '\n');

  t.pass();

});
