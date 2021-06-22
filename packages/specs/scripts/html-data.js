const fs = require('fs');
const path = require('path');
const os = require('os');

const data = require('vscode-web-custom-data/data/browsers.html-data.json');

const toJavaScript = obj => JSON.stringify(obj, null, 2);
const DATA_TYPE = 'IHTMLSpecs';

const tags = data.tags.reduce((
  acc,
  {
    name,
    attributes,
    description,
    references
  }
) => ({
  ...acc,
  [name]: {
    description,
    attributes,
    references
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
) => ({
  ...acc,
  [name]: {
    description,
    attributes,
    references,
    valueSet
  }
}), {});

const valuesets = data.valueSets.reduce((
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
  [ 'values', `export default ${toJavaScript(valuesets)}` ]

].forEach(WriteFiles);

console.log('Done');
