const fs = require('fs');
const path = require('path');
const os = require('os');
const has = require('lodash.has');

const data = require('../dist/export').shopify;

const regex = {
  filters: {},
  tags: {}
};

const FilterArguments = (name, args) => {

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.value) {

      if (Array.isArray(arg.value)) {

        const map = arg.value.map(item => {
          if (typeof item === 'string') return item;
          if (typeof item === 'object') return item.value;
          return false;
        }).filter(Boolean).join('|');

        regex.filters[name] = { [i]: `${new RegExp(map)}` };
        arg.pattern = regex[name];

      } else if (typeof arg.value === 'object') {

        for (const [ prop, val ] of Object.entries(arg.value)) {

          if (Array.isArray(val)) {

            const map = [];

            for (const item of val) {
              if (item.pattern) {
                map.push(item.pattern);
              } else if (Array.isArray(item.value)) {
                map.push(...item.value);
              } else if (typeof item.value === 'string') {
                map.push(item.value);
              }
            }

            if (map.length > 0) {

              if (typeof regex.filters[name] === 'object') {

                if (typeof regex.filters[name][i] === 'object') {
                  regex.filters[name][i][prop] = `${new RegExp(map.join('|'))}`;
                } else {
                  Object.assign(regex.filters[name], {
                    [i]: {
                      [prop]: `${new RegExp(map.join('|'))}`
                    }
                  });
                }
              }
            }

          }

        }

      }

    }

    if (arg.type === 'parameter') {

      // Converts string regex to regex
      if (typeof arg.accepts === 'string') {
        if (/\|/.test(arg.accepts)) {
          regex.filters[arg.value] = `${new RegExp(arg.accepts)}`;
          arg.pattern = regex[arg.value];
        }
      }

      if (Array.isArray(arg.accepts)) {

        const map = arg.accepts.map(item => {
          if (typeof item === 'string') return item;
          if (typeof item === 'object') return item.value;
          return false;
        }).filter(Boolean).join('|');

        regex.filters[arg.value] = `${new RegExp(map)}`;
        arg.pattern = regex[arg.value];
      }

    }

  }

};

for (const key of Object.keys(data)) {

  if (data[key]) {

    for (const prop of Object.keys(data[key])) {
      if (has(data[key][prop], 'arguments')) {

        if (key === 'filters') {
          FilterArguments(prop, data[key][prop].arguments);
        }

        if (key === 'tags') {
          const join = data[key][prop].arguments.map(({ value }) => value).join('|');
          regex.tags[prop] = `${new RegExp(join)}`;
        }
      }
    }
  }
}

const unstring = JSON.stringify(regex, null, 2).replace(/["]/g, '');
const template = `export const Patterns = ${unstring};`;

function WriteFile () {

  const TagsOutputPath = path.resolve(__dirname, '../src/liquid/data/patterns.ts');

  console.log('Writing to: ' + TagsOutputPath);

  fs.writeFileSync(TagsOutputPath, template);

}

WriteFile();

console.log(template);
