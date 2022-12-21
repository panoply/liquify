const fs = require('fs');
const path = require('path');
const os = require('os');
const { has } = require('lodash');
const data = require('@vscode/web-custom-data/data/browsers.html-data.json');

console.log('Importing from @vscode/web-custom-data\n');

/* -------------------------------------------- */
/* OPTIONS                                      */
/* -------------------------------------------- */

const PATH = 'src/html/data/html5';

const toJavaScript = obj => JSON.stringify(obj, null, 2);

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

const tags = data.tags.reduce((acc, { name, attributes, description: { value }, references: [ ref ] }) => ({
  ...acc,
  [name]: {
    description: value,
    void: VOIDS.includes(name),
    attributes: attributes.length > 0 ? attributes.reduce((
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

const attrs = data.globalAttributes.reduce((acc, {
  name,
  attributes,
  description,
  references,
  valueSet
}) => {

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

  const TagsOutputPath = path.join(process.cwd(), `/${PATH}/${name}.ts`);

  console.log('Writing to: ' + TagsOutputPath);

  fs.writeFileSync(TagsOutputPath, contents);

}

function imports (constant, name) {

  return `import { ${name} } from '../../';\n\nexport const ${constant}: ${name} =`;

}

[
  [ 'tags', `${imports('tags', 'HTMLTags')} ${toJavaScript(tags)}` ],
  [ 'attributes', `${imports('attributes', 'HTMLAttributes')} ${toJavaScript(attrs)}` ],
  [ 'values', `${imports('values', 'HTMLValues')} ${toJavaScript(valueSets)}` ]

].forEach(WriteFiles);

console.log('\n- Generated HTML Language Specifications\n- Passing to ESLint\n');
