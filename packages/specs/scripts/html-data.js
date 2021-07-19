const fs = require('fs');
const path = require('path');
const os = require('os');
const { has } = require('lodash');
const data = require('vscode-web-custom-data/data/browsers.html-data.json');

const toJavaScript = obj => JSON.stringify(obj, null, 2);

const DATA_TYPE = 'IHTMLSpecs';

const VOIDS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
];

const tags = data.tags.reduce((
  acc,
  {
    name,
    attributes,
    description: { value },
    references: [ ref ]
  }
) => ({
  ...acc,
  [name]: {
    description: value,
    void: VOIDS.includes(name),
    attributes: attributes.length > 0
      ? attributes.reduce((
        attr,
        {
          name,
          description,
          valueSet
        }
      ) => {

        const prop = { name };

        if (typeof description === 'object') {
          prop.description = description.value;
        } else if (typeof description === 'string') {
          prop.description = description;
        }

        if (valueSet) prop.value = valueSet;

        attr.push(prop);

        return attr;

      }, []) : [],

    reference: ref
  }
}), {});

const attrs = data.globalAttributes.reduce((
  acc,
  {
    name,
    attributes,
    description,
    references,
    valueSet
  }
) => {

  acc[name] = {};

  if (attributes) acc[name].attributes = attributes;
  if (valueSet) acc[name].value = valueSet;
  if (description) acc[name].description = description.value;
  if (references) acc[name].reference = { name: references[0].name, url: references[0].url };

  return acc;

}, {});

const valueSets = data.valueSets.reduce((
  acc,
  {
    name,
    values
  }
) => {

  return {
    ...acc,
    [name]: values.map((value) => {
      if (value.description) {
        return {
          label: value.name,
          documentation: value.description
        };
      } else {
        return { label: value.name };
      }
    })
  };

}, {});

function WriteFiles ([ name, contents ]) {

  const TagsOutputPath = path.resolve(__dirname, `../src/html/data/${name}.ts`);

  console.log('Writing to: ' + TagsOutputPath);

  fs.writeFileSync(TagsOutputPath, contents);

}

function imports (name) {

  return `import { ${name} as I${name} } from '../types/markup';\n\nexport let ${name}: I${name};`;

}

[
  [ 'tags', `${imports('Tags')}\n\nTags = ${toJavaScript(tags)}` ]
  // [ 'attributes', `${imports('Attributes')}\n\nAttributes = ${toJavaScript(attrs)}` ],
  // [ 'values', `${imports('Values')}\n\nValues = ${toJavaScript(valueSets)}` ]

].forEach(WriteFiles);

console.log('Done');
