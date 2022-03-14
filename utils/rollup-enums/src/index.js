
import { createFilter } from '@rollup/pluginutils';

export default function (options) {

  const { enums, include, exclude } = Object.assign({
    sourcemap: true,
    include: [],
    exclude: [],
    enums: {}
  }, options);

  const filter = createFilter(include, exclude);
  const match = `(?<=type:\\s{0,})['"]\\b(${Object.keys(enums).join('|')})\\b['"](?=[\n,]?)`;
  const regexp = new RegExp(match, 'g');

  return {
    name: 'enums',
    transform: (source, id) => {

      if (!filter(id)) return null;

      const code = source.replace(regexp, (m, type) => enums[type]);

      return { code, map: null };
    }
  };

}
