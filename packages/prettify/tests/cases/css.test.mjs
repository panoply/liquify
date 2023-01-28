import test from 'ava';
import { forAssert, forRules, css, liquid } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('Structure Test:  Liquid infused selectors', t => {

  forRules([
    css`

      /* Space should be respected at grid */

      .image-grid-{{ respect.spacing }} .grid {
        color: #111;
      }

    `,
    css`

      /* Template infused class should be preserved */

      .image-grid-{{ respect.spacing }}-class {
        color: #111;
      }

    `
  ])(
    {
      language: 'css'
    }
  )(function (source, rules) {

    const output = prettify.format.sync(source, rules);

    t.deepEqual(output, source);

  });

});

test('Structure Test: Attribute selectors expressions', t => {

  forAssert([
    [
      css`

        /* Attributes as selectors with quotations */

        [type="tel"], [type="url"],
        [type="email"],
        [type="number"] { direction: ltr; }

      `,
      css`

        /* Attributes as selectors with quotations */

        [type="tel"],
        [type="url"],
        [type="email"],
        [type="number"] {
          direction: ltr;
        }

      `
    ],
    [
      css`

        /* Attributes as selectors without quotations and Liquid */

        [type=tel], [type={{ attribute.token }}],
        [data-attribute],
        [{{ attribute }}] { direction: ltr; }

      `,
      css`

        /* Attributes as selectors without quotations and Liquid */

        [type=tel],
        [type={{ attribute.token }}],
        [data-attribute],
        [{{ attribute }}] {
          direction: ltr;
        }

      `
    ]
  ])(function (source, expect) {

    const output = prettify.format.sync(source, {
      language: 'css'

    });

    t.deepEqual(output, expect);

    // t.log(output);

  });

});

test('Structure Test: Complex pseudo selectors', t => {

  forRules([

    css`

      /* Isolated pseudo selector with webkit property */

      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }

    `
    ,

    css`

      /* multiple pseudo selector stacking */

      ::-webkit-datetime-edit-fields-wrapper,
      ::-webkit-datetime-edit-text,
      ::-webkit-datetime-edit-minute,
      ::-webkit-datetime-edit-hour-field,
      ::-webkit-datetime-edit-day-field,
      ::-webkit-datetime-edit-month-field,
      ::-webkit-datetime-edit-year-field {
        padding: 0;
      }

    `
    ,
    css`

      /* multiple "not" selector chaining */

      [list]:not([type=datetime-local]):not([type=month])::-webkit-calendar-picker-indicator {
        display: none !important;
      }

    `
    ,
    css`

      /* media query pseudo selector nesting */

      @media (prefers-reduced-motion: no-preference) {

        :root {
          scroll-behavior: smooth;
        }

        ::-webkit-search-decoration {
          -webkit-appearance: none;
        }

      }

    `

  ])(
    {
      language: 'css',
      style: {
        atRuleSpace: true
      }
    }
  )(function (source, rules) {

    const output = prettify.format.sync(source, rules);

    t.deepEqual(output, source);

  });

});

test('Structure Test: CSS variable expressions with Liquid infusion', async t => {

  forRules([

    css`

      :root {
        --main-bg-color: brown;
        --my-background: #fff;
        --my-var: 0.985rem;
      }

    `
    ,
    css`

      :root {
        --font-body-family: {{ settings.type_body_font.family }};
      }

    `
    ,

    liquid`

      :root {
        --{{ settings.type_body_font.family }}-main: brown;
        --my-background: #fff;
        --my-var-{{ settings.type_body_font.family }}: 0.985rem;
      }

    `

  ])(
    {
      language: 'css'
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });

});

test('Sorting selector names', t => {

  forRules(
    [
      css`

        .v,
        .z,
        .y,
        .a,
        .g,
        .u,
        .x > .a > .b,
        .x > .c > .d,
        .c > .d > .x,
        .f,
        .e,
        .n,
        .r,
        .t > .v > .x,
        .w,
        .b,
        .h,
        .j,
        .m,
        .k,
        .o,
        .ö,
        .ä {

          background-image: url("barn.jpg");
          z-index: 999;
          color: #fff;
          width: 200px;
          background-repeat: no-repeat;
          background-position: right top;
          background-attachment: fixed;
          font-weight: 100;
          font-style: bold;
          margin-top: 100px;
          display: flex;
          position: absolute;
          float: right;
          margin-left: 100px;
          padding-right: 25px;
          transition: ease-in;
          visibility: visible;
          padding-bottom: 40px;
          font-weight: 100;
          font-style: bold;
          padding-left: 25px;
          visibility: collapse;
          min-inline-size: inherit;

        }

      `
    ]
  )(
    [
      {
        language: 'css',
        style: { sortSelectors: false }
      },
      {
        language: 'css',
        style: { sortSelectors: true }
      },
      {
        language: 'css',
        style: { sortSelectors: false }
      }
    ]
  )(function (source, rules, label) {

    const snapshot = prettify.format.sync(source, rules);

    t.snapshot(snapshot, label);

  });

});

test('Sorting class properties', t => {

  forRules(
    [
      css`

        body {
          background-image: url("barn.jpg");
          z-index: 999;
          color: #fff;
          width: 200px;
          background-repeat: no-repeat;
          background-position: right top;
          background-attachment: fixed;
          font-weight: 100;
          font-style: bold;
          margin-top: 100px;
          display: flex;
          position: absolute;
          float: right;
          margin-left: 100px;
          padding-right: 25px;
          transition: ease-in;
          visibility: visible;
          padding-bottom: 40px;
          font-weight: 100;
          font-style: bold;
          padding-left: 25px;
          visibility: collapse;
          min-inline-size: inherit;
        }

      `
    ]
  )(
    [
      {
        language: 'css',
        style: { sortProperties: false }
      },
      {
        language: 'css',
        style: { sortProperties: true }
      },
      {
        language: 'css',
        style: { sortProperties: false }
      }
    ]
  )(function (source, rules, label) {

    const snapshot = prettify.format.sync(source, rules);

    t.snapshot(snapshot, label);

  });

});
