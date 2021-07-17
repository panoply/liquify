const fs = require('fs');
const path = require('path');
const os = require('os');
const { has } = require('lodash');
const data = require('vscode-web-custom-data/data/browsers.html-data.json');

const toJavaScript = obj => JSON.stringify(obj, null, 2);

const DATA_TYPE = 'IHTMLSpecs';

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
    attributes,
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
  if (valueSet) acc[name].valueSet = valueSet;
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
) => ({
  ...acc,
  [name]: values
}), {});

function WriteFiles ([ name, contents ]) {

  const TagsOutputPath = path.resolve(__dirname, `../src/html/data/${name}.ts`);

  console.log('Writing to: ' + TagsOutputPath);

  fs.writeFileSync(TagsOutputPath, contents);

}

[
  [ 'tags', `export default ${toJavaScript(tags)}` ],
  [ 'attributes', `export default ${toJavaScript(attrs)}` ],
  [ 'values', `export default ${toJavaScript(valueSets)}` ]

].forEach(WriteFiles);

console.log('Done');
