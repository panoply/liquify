const fs = require('fs');
const path = require('path');
const os = require('os');
const { has } = require('lodash');
const objects = require('../node_modules/.specs/data/objects.json');

/** @type {import('../src/types/objects').Objects} */
const object = {};

for (const data of objects) {

  object[data.name] = {
    summary: data.summary
  };

  if (data.access.global === false) {
    object[data.name].global = data.access.global;
  }

  if (data.deprecated === true) {
    object[data.name].deprecated = data.deprecated;
  }

  if (data.examples.length > 0) {

    const example = data.examples[0];
    const markdown = [
      example.description
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
    ];

    if (example.raw_liquid !== '') {

      markdown.push(
        '---',
        '**Example**',
        '```liquid',
        ...example.raw_liquid.split('\n'),
        '```',
        '\n'
      );
    }

    object[data.name].description = markdown.join('\n');

  }

  if (data.properties.length === 0 && data.return_type.length === 0) {
    object[data.name].const = true;
  } else {
    // object[data.name].const = false;
  }

  if (data.return_type.length > 0) {

    if (data.return_type.length === 1) {
      object[data.name].type = data.return_type[0].type;

      if (data.return_type[0].array_value !== '') {
        object[data.name].scope = data.return_type[0].array_value;
      }
    }

  }

  if (data.access.parents.length > 0) {
    object[data.name].parent = data.access.parents.reduce((acc, value) => {
      if (!acc.includes(value.object)) acc.push(value.object);
      return acc;
    }, []);

  }

  if (data.access.template.length > 0) {
    object[data.name].template = data.access.template;
  }

  if (data.properties.length > 0) {

    object[data.name].type = 'object';
    object[data.name].properties = {};

    for (const prop of data.properties) {

      object[data.name].properties[prop.name] = {
        summary: prop.summary
      };

      if (prop.deprecated) {
        object[data.name].properties[prop.name].deprecated = prop.deprecated;
      }

      if (prop.return_type.length > 1) {

        let type;

        for (const entry of prop.return_type) {

          if (type === undefined) type = entry.type;

          if (!('literal' in object[data.name].properties[prop.name])) {
            object[data.name].properties[prop.name].literal = [];
          }

          if (type === entry.type) {
            object[data.name].properties[prop.name].literal.push(entry.name);
          } else {
            console.log('MORE THAN 1 RETURN TYPE WHICH IS DIFFERENT', prop);
          }

        }

        object[data.name].properties[prop.name].type = type;

      } else if (prop.return_type.length > 0) {

        object[data.name].properties[prop.name].type = prop.return_type[0].type;

        if (prop.return_type[0].type === 'array' && prop.return_type[0].array_value !== '') {
          object[data.name].properties[prop.name].scope = prop.return_type[0].array_value;
        }

      } else {

        object[data.name].properties[prop.name].type = 'any';

      }

      if (prop.examples.length > 0) {

        const example = prop.examples[0];
        const markdown = [
          example.description
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
        ];

        if (example.raw_liquid !== '') {

          markdown.push(
            '---',
            '**Example**',
            '```liquid',
            ...example.raw_liquid.split('\n'),
            '```',
            '\n'
          );
        }

        object[data.name].properties[prop.name].description = markdown.join('\n');

      }

    }
  }
}

const TagsOutputPath = path.join(process.cwd(), 'src', 'liquid', 'data', 'shopify', 'objects.ts');

console.log('Writing to: ' + TagsOutputPath);

fs.writeFileSync(TagsOutputPath, `import { Objects } from '../..'\nexport const objects: Objects = ${JSON.stringify(object, null, 2)}`);
