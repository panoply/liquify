import test from 'ava';
import { forAssert, liquid } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('Liquid delimiter trims strip', t => {

  forAssert(
    [
      [
        liquid`{{- output -}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{-output-}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{-output}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{- output}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{-output }}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{- output }}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{output-}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{{ output-}}`,
        liquid`{{ output }}`
      ],
      [
        liquid`{%- singleton -%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%-singleton-%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%-singleton%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%-singleton %}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%- singleton%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%-singleton%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%singleton-%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{%singleton -%}`,
        liquid`{% singleton %}`
      ],
      [
        liquid`{% singleton-%}`,
        liquid`{% singleton %}`
      ]
    ]
  )(function (source, expect) {

    const actual = prettify.formatSync(source, { language: 'liquid' });

    t.is(actual, expect);

  });
});
