#!/usr/bin/env node

import fs from 'fs';
import { join } from 'path';
import { Type } from 'utils/enums';
import { ThemeDocs, ReturnType } from 'types/internal';
import ansis from 'ansis';
import type { Objects } from 'liquid';

/**
 * Reference to Current Working Directory
 */
const cwd = process.cwd();

const { log } = console;

log('\x1B[H\x1B[2J');

generate();

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

function output (type: string, name: string, src: string) {

  return `import { ${type} } from '../..'\n\nexport const ${name}: ${type} = ${src}`;
}

function unescape (string: string) {
  string = string.replace(/&lt;/g, '<');
  string = string.replace(/&gt;/g, '>');
  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&#39;/g, "'");
  string = string.replace(/&amp;/g, '&');
  return string;
}

function generate () {

  log(ansis.greenBright('Shopify Specifications'));

  objects();

}

/**
 * Shopify
 *
 * Generates Shopify specifications from remove data reference
 */
function objects () {

  log(ansis.cyanBright('Shopify Objects'));

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  /**
   * Extracts examples and composes a description to
   * be written to the specification.
   */
  const docs = (
    {
      name,
      summary = null,
      description = null,
      examples,
      deprecated,
      deprecation_reason
    }: ThemeDocs.Objects[0],
    path?: string
  ) => {

    const string: string[] = [];

    if (deprecated === true) {

      string.push('⚠️ **DEPRECATED** ⚠️');

      if (deprecation_reason !== '') {
        string.push(
          unescape(deprecation_reason),
          '---'
        );

      } else {

        string.push(
          'No deprecation reason has been provided by the Shopify team 🤡.',
          '---'
        );

      }
    }

    if (description !== '' && summary !== null) {

      let text = unescape(description)
        .replace(/>\s(Tip|Note):/g, '\n\n**$1**\n')
        .replace(/\(\/(docs\/api.*(?=\)))/g, '(https://shopify.dev/$1');

      // Quoted start, we split onto newlines
      if (text.trimStart()[0] === '>') {
        string.push(summary, text);
      } else {
        string.push(summary + ' ' + text);
      }
    } else {
      string.push(summary);
    }

    if (examples.length > 0) {

      const [ example ] = examples;

      if (example.name !== '') {
        string.push('#### Example');
      } else {
        string.push(`#### ${example.name}`);
      }

      if (example.description !== '') {

        string.push(unescape(example.description));

      }

      if (example.raw_liquid !== '') {

        string.push(
          '```liquid',
          unescape(example.raw_liquid),
          '```'
        );

      }
    }

    string.push('---');

    if (path) {
      string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/${path}#${name})\n\n`);
    } else {
      string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/objects/${name})\n\n`);
    }

    return string.join('\n\n');

  };

  const types = (returns: ReturnType, data: ThemeDocs.Objects) => {

    const refs: {
      scope: string,
      items: string,
      type: any,
      literal: string[]
    } = {
      scope: null,
      items: null,
      type: 'any',
      literal: null
    };

    const type = returns[0].type as any;
    const value = returns[0].array_value;

    if (type === 'string' || type === 'boolean' || type === 'number') {

      refs.type = type;

    } else if (type === 'array') {

      refs.type = type;

      if (value === 'string' || value === 'boolean' || value === 'number') {
        refs.items = value;
      } else {
        refs.scope = value;
      }
    } else if (type !== '' && data.some(v => v.name === type)) {

      refs.type = 'object';
      refs.scope = type;

    }

    for (const { name } of returns) {
      if (name !== '') {
        if (refs.literal === null) refs.literal = [];
        refs.literal.push(name);
      }
    }

    return refs;

  };
  /* -------------------------------------------- */
  /* BEGIN                                        */
  /* -------------------------------------------- */

  const path = join(cwd, 'node_modules/.specs/data', 'objects.json');
  const read = fs.readFileSync(path).toString();
  const data: ThemeDocs.Objects = JSON.parse(read);
  const spec: Objects = {};

  /* -------------------------------------------- */
  /* HELPERS                                      */
  /* -------------------------------------------- */

  for (const item of data) {

    log(ansis.blue(`- ${item.name}`));

    spec[item.name] = { summary: item.summary };

    if (item.access.global === true) spec[item.name].global = item.access.global;
    if (item.deprecated === true) spec[item.name].deprecated = item.deprecated;
    if (item.access.template.length > 0) spec[item.name].template = item.access.template;

    spec[item.name].description = docs(item);

    if (item.return_type.length > 0) {

      const { type, scope, literal } = types(item.return_type, data);

      if (literal !== null) spec[item.name].literal = literal;

      if (scope !== null) {
        spec[item.name].type = type;
        spec[item.name].scope = scope;
      } else {
        spec[item.name].type = type;
      }
    }

    if (item.properties.length > 0) {

      spec[item.name].type = 'object';

      if (!(typeof spec[item.name].properties === 'object')) spec[item.name].properties = {};

      for (const prop of item.properties) {

        log(ansis.gray(`  - ${prop.name}`));

        spec[item.name].properties[prop.name] = { type: Type.unknown };
        spec[item.name].properties[prop.name].description = docs(prop, item.name);

        if (item.deprecated === true) spec[item.name].properties[prop.name].deprecated = item.deprecated;

        if (prop.return_type.length > 0) {

          const { type, scope, literal } = types(prop.return_type, data);

          if (literal !== null) spec[item.name].properties[prop.name].literal = literal;

          if (scope !== null) {
            spec[item.name].properties[prop.name].type = type;
            spec[item.name].properties[prop.name].scope = scope;
          } else {
            spec[item.name].properties[prop.name].type = type;
          }
        }

      }
    } else {

      if (spec[item.name].type !== 'array') spec[item.name].const = true;

    }

  }

  const parse = JSON.stringify(spec, null, 2);

  log(ansis.greenBright(`Writing objects JSON: ${ansis.whiteBright('data/liquid/shopify/objects.json')} `));

  fs.writeFileSync(join(cwd, 'data/liquid/shopify/objects.json'), parse);

  log(ansis.greenBright(`Writing objects DATA: ${ansis.whiteBright('src/liquid/data/shopify/objects.ts')} `));

  fs.writeFileSync(join(cwd, 'src/liquid/data/shopify/objects.ts'), output('Objects', 'objects', parse));
}
