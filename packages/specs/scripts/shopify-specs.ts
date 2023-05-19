#!/usr/bin/env node

import fs from 'fs';
import { join } from 'path';
import { Type } from 'utils/enums';
import { ThemeDocs, ReturnType } from 'types/internal';
import ansis from 'ansis';
import type { Objects, Filters, Arguments, Argument } from 'liquid';
import { shopify } from 'liquid/data';

/**
 * Reference to Current Working Directory
 */
const cwd = process.cwd();
const PREFIX = `${ansis.gray('[')}SPECS${ansis.gray(']')} ${ansis.magenta('RUN')}`;
const { log } = console;

// log('\x1B[H\x1B[2J');

generate();

/* -------------------------------------------- */
/* FUNCTIONS                                    */
/* -------------------------------------------- */

function generate () {

  log(`${PREFIX} ${ansis.magenta.bold('Building Shopify Specifications')}`);

  objects();
  filters();

  log(`${PREFIX} ${ansis.magenta.bold('Finished Shopify Specifications')}`);

}

function lastUpdate () {

  const date = new Date();

  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDay();

  const month = (i: number): string => ({
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }[i]);

  const day = (i: number): string => {

    const a = i % 10;
    const b = i % 100;

    return i + ((a === 1 && b !== 11)
      ? 'st'
      : (a === 2 && b !== 12) ? 'nd' : (a === 3 && b !== 13) ? 'rd' : 'th'
    );

  };

  return `${day(D)} ${month(M)} ${Y}`;

}

/**
 * Create TS File
 *
 * Generates the file output which will write to
 * the `src/liquid/data/shopify/` directory. ESLint will
 * run on the file that was written in a post process.
 */
function createTSFile (type: string, name: string, src: string) {

  return `import { ${type} } from '../..'\n\nexport const ${name}: ${type} = ${src}`;

}

/**
 * Unescape
 *
 * Unescape occurances from within the Shopify theme docs.
 * This is for the markdown descriptions rendering. The theme-docs
 * expose these characters escaped, we will revert that.
 */
function unescape (string: string) {

  string = string.replace(/&lt;/g, '<');
  string = string.replace(/&gt;/g, '>');
  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&#39;/g, "'");
  string = string.replace(/&amp;/g, '&');

  return string;

}

/**
 * Documentation
 *
 * Generates a markdown description for the object or filter.
 * Extracts the `examples` entries, determines the description
 * based on `summary` or `description` fields and then from here
 * composes the description for the specification.
 *
 * This function will also correct documentional URLs.
 */
function documentation (type: 'filters' | 'objects', ref: ThemeDocs.Objects[0], path?: string) {

  /**
   * The markdown description
   */
  const string: string[] = [];

  /**
   * Destruct the description specific fields
   */
  const { name, summary = null, description = null, examples, deprecated, deprecation_reason } = ref;

  if (deprecated === true) {

    string.push('⚠️ **DEPRECATED** ⚠️');

    if (deprecation_reason !== '') {
      string.push(unescape(deprecation_reason), '---');
    } else {
      string.push('No deprecation reason has been provided by the Shopify team 🤡.', '---');
    }
  }

  if (description !== '' && summary !== null) {

    let text = unescape(description)
      .replace(/>\s(Tip|Note):/g, '\n\n**$1**\n')
      .replace(/\(\/(docs\/api.*(?=\)))/g, '(https://shopify.dev/$1')
      .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');

    let summ = unescape(summary)
      .replace(/\(\/(docs\/api.*(?=\)))/g, '(https://shopify.dev/$1')
      .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');

    // Quoted start, we split onto newlines
    if (text.trimStart()[0] === '>') {
      string.push(unescape(summ), text);
    } else {
      string.push(unescape(summ) + ' ' + text);
    }

  } else {

    let text = '';

    if (description !== '') {
      text = unescape(description)
        .replace(/>\s(Tip|Note):/g, '\n\n**$1**\n')
        .replace(/\(\/(docs\/api.*(?=\)))/g, '(https://shopify.dev/$1')
        .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');
    }

    if (summary.length > 0) {

      let summ = unescape(summary)
        .replace(/\(\/(docs\/api.*(?=\)))/g, '(https://shopify.dev/$1')
        .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');

      // Quoted start, we split onto newlines
      if (text.trimStart()[0] === '>') {
        string.push(unescape(summ), text);
      } else {
        string.push(unescape(summ) + ' ' + text);
      }

    }

    string.push(text);

  }

  if (examples.length > 0) {

    const [ example ] = examples;

    if (example.name === '') {
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
    string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${type}/${path}#${name})\n`);
  } else {
    string.push(`[Shopify Liquid](https://shopify.dev/docs/api/liquid/${type}/${name})\n`);
  }

  string.push(`Last Updated: ${lastUpdate()}`, '\n');

  return string.join('\n\n');

};

/**
 * Shopify Filters
 *
 * This function is responsible for traversing all the filter entries
 * and converting them into a specification. The current specification
 * entries are digested for this process. We will align the current specs
 * and any additional fields or customisations which exists will remain
 * intact. We only care about the descriptions and types provided.
 *
 * There is manual work involved in the filter specifications and this is
 * carried out after generation such value validations.
 */
function filters () {

  log(`${PREFIX} ${ansis.magenta('Shopify Filters')}`);

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

  const path = join(cwd, 'node_modules/.specs/data', 'filters.json');
  const read = fs.readFileSync(path).toString();
  const data: ThemeDocs.Filters = JSON.parse(read);
  const spec: Filters = {};
  const curr = shopify.filters;

  for (const item of data) {

    if ((item.name in curr)) continue;

    spec[item.name] = {};
    spec[item.name].description = documentation('filters', item);

    if (item.return_type[0].type === 'string') {
      spec[item.name].returns = 'string';
    } else if (item.return_type[0].type === 'number') {
      spec[item.name].returns = 'number';
    } else if (item.return_type[0].type === 'boolean') {
      spec[item.name].returns = 'boolean';
    } else if (item.return_type[0].type === 'array') {
      spec[item.name].returns = 'array';
    } else if (item.return_type[0].type === 'boolean') {
      spec[item.name].returns = 'boolean';
    } else if (item.return_type[0].type === 'object') {
      spec[item.name].returns = 'object';
    } else {
      spec[item.name].returns = 'any';
    }

    if (item.deprecated === true) spec[item.name].deprecated = item.deprecated;

    // Arguments construction
    // when no parameters supplied on filter,
    // we can compose basic level args using the syntax value
    if (item.parameters.length === 0) {

      const snippet: string[] = [];
      const args: Arguments = [];
      const syntax = item.syntax.split(' ');

      if (syntax[2][syntax[2].length - 1] === ':') {

        snippet.push(syntax[2]);

        let number = 0;

        for (const entry of syntax.slice(3)) {

          number = number + 1;

          let type: Argument['type'];

          if (entry.slice(0, -1) === 'string') {
            type = 'string';
          } else if (entry.slice(0, -1) === 'number') {
            type = 'number';
          } else if (entry.slice(0, -1) === 'boolean') {
            type = 'boolean';
          } else if (entry.slice(0, -1) === 'array') {
            type = 'array';
          } else if (entry.slice(0, -1) === 'boolean') {
            type = 'boolean';
          } else if (entry.slice(0, -1) === 'object') {
            type = 'object';
          } else {
            type = 'any';
          }

          if (entry[entry.length - 1] === ',') {

            if (type === 'string') {
              snippet.push('\'$' + number + '\',');
            } else {
              snippet.push('$' + number + ',');
            }

            args.push({
              type,
              required: true
            });
          } else {

            if (type === 'string') {
              snippet.push('\'$' + number + '\'');
            } else {
              snippet.push('$' + number + ',');
            }

            args.push({
              type,
              required: true
            });
          }
        }

        spec[item.name].snippet = snippet.join(' ');
        spec[item.name].arguments = args;
      }

    } else {

      const syntax = item.syntax.split(' ');
      const snippet: string[] = [];
      const args: Arguments = [];

      snippet.push(syntax[2]);
      syntax.splice(0, 3);

      for (let i = 0; i < item.parameters.length; i++) {

        const param = item.parameters[i];

        // The argument is not a parameter as per the
        // specification understanding of an parameter.
        //
        // A "parameter" in the specification refers to
        // a property-like expression, for example:
        //
        // | filter: parameter:
        //
        // The above is a parameter according to Liquify specification
        // which if we have reached this point, the provided entry of the
        // theme-docs does not adhere. Instead, we have a basic argument, eg:
        //
        // | filter: 'string'
        //
        // We will apply this in accordance.
        //
        if (syntax.length > 0 && syntax[0][syntax[0].length - 1] === ',') {
          if ('arguments' in spec[item.name] && spec[item.name].arguments.length < 0) {

            for (let number = 0; number < syntax.length; number++) {

              let type: Argument['type'];

              if (param.types[0] === 'string') {
                type = 'string';
              } else if (param.types[0] === 'number') {
                type = 'number';
              } else if (param.types[0] === 'boolean') {
                type = 'boolean';
              } else if (param.types[0] === 'array') {
                type = 'array';
              } else if (param.types[0] === 'boolean') {
                type = 'boolean';
              } else if (param.types[0] === 'object') {
                type = 'object';
              } else {
                type = 'any';
              }

              const arg = syntax[number];
              const entry: Argument = { type };

              if (param.required === true) entry.required = true;

              if (param.description !== '') {
                entry.description = unescape(param.description)
                  .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');
              }

              args.push(entry);

              if (arg[arg.length - 1] === ',') {

                if (type === 'string') {
                  snippet.push('\'$' + (number + 1) + '\',');
                } else {
                  snippet.push('$' + (number + 1) + ',');
                }

              } else {

                if (type === 'string') {
                  snippet.push('\'$' + (number + 1) + '\'');
                } else {
                  snippet.push('$' + (number + 1) + '');
                }

              }

            }
          }

        } else {

          if (Array.isArray(spec[item.name].arguments)) {

            if (args.length === 0) args.push({ type: 'parameter', value: {} });
            if (args[args.length - 1].type !== 'parameter') args.push({ type: 'parameter', value: {} });
            if (param.required) snippet.push(`${param.name}:`, '${' + (i + 1) + '}');

            let type: Argument['type'];

            if (param.types[0] === 'string') {
              type = 'string';
            } else if (param.types[0] === 'number') {
              type = 'number';
            } else if (param.types[0] === 'boolean') {
              type = 'boolean';
            } else if (param.types[0] === 'array') {
              type = 'array';
            } else if (param.types[0] === 'boolean') {
              type = 'boolean';
            } else if (param.types[0] === 'object') {
              type = 'object';
            } else {
              type = 'any';
            }

            args[args.length - 1].value[param.name] = { type, required: param.required };

            if (param.description !== '') {
              args[args.length - 1].value[param.name].description = unescape(param.description)
                .replace(/\]\(\/(.*)(?=\))/g, '](https://shopify.dev/$1');
            }
          }
        }
      }

      if (snippet.length > 0) {
        if (snippet.length === 1 && snippet[0][snippet[0].length - 1] === ':') snippet[0] = snippet[0].slice(0, -1);
        spec[item.name].snippet = snippet.join(' ');
      }

      if (args.length > 0) spec[item.name].arguments = args;

    }
  }

  // const parse = JSON.stringify(spec, function (_, regex) {
  //   return regex && regex.exec === RegExp.prototype.exec
  //     ? new RegExp(regex).source
  //     : regex;
  // }, 2);

  const count = Object.keys(spec);

  if (count.length > 0) {

    log(PREFIX + ansis.bold.redBright('NEW FILTERS AVAILABLE'));

    Object.keys(spec).forEach(name => {
      log(PREFIX + ansis.white(name));
    });
  }
}

/**
 * Shopify
 *
 * Generates Shopify specifications from remove data reference
 */
function objects () {

  log(`${PREFIX} ${ansis.magenta('Shopify Objects')}`);

  /* -------------------------------------------- */
  /* FUNCTIONS                                    */
  /* -------------------------------------------- */

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

    // log(ansis.blue(`- ${item.name}`));

    spec[item.name] = { summary: item.summary };

    if (item.access.global === true) spec[item.name].global = item.access.global;
    if (item.deprecated === true) spec[item.name].deprecated = item.deprecated;
    if (item.access.template.length > 0) spec[item.name].template = item.access.template;

    spec[item.name].description = documentation('objects', item);

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

        // log(ansis.gray(`  - ${prop.name}`));

        spec[item.name].properties[prop.name] = { type: Type.unknown };
        spec[item.name].properties[prop.name].description = documentation('objects', prop, item.name);

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

  log(PREFIX + ansis.cyan(` Writing objects JSON: ${ansis.whiteBright('data/liquid/shopify/objects.json')} `));

  fs.writeFileSync(join(cwd, 'data/liquid/shopify/objects.json'), parse);

  log(PREFIX + ansis.cyan(` Writing objects DATA: ${ansis.whiteBright('src/liquid/data/shopify/objects.ts')} `));

  fs.writeFileSync(join(cwd, 'src/liquid/data/shopify/objects.ts'), createTSFile('Objects', 'objects', parse));

}
