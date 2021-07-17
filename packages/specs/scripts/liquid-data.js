const fs = require('fs');
const path = require('path');
const os = require('os');
const data = require('./../package/@variations/shopify');
const { CompletionItemKind, InsertTextFormat } = require('vscode-languageserver');

const shopifyTags = Object.entries(data.shopify.tags).map((
  [
    label,
    {
      description,
      reference,
      deprecated = false,
      singular = false,
      snippet = null
    }
  ]
) => {

  return {
    label,
    kind: CompletionItemKind.Keyword,
    deprecated,
    in
    documentation: {
      kind: 'markdown',
      value: [
        `${description}\n\n`,
        '---',
        `[${reference.name}](${reference.url})`
      ].join('\n')
    },
    data: {
      snippet,
      singular
    }
  };

});

console.log(shopifyTags);
return;

const unstring = JSON.stringify(regex, null, 2).replace(/["]/g, '');
const template = `export const Patterns = ${unstring};`;

function WriteFile () {

  const TagsOutputPath = path.resolve(__dirname, '../src/liquid/data/patterns.ts');

  console.log('Writing to: ' + TagsOutputPath);

  fs.writeFileSync(TagsOutputPath, template);

}

WriteFile();

console.log(template);
