/**
 * TSUP Plugin: Description
 *
 * Converts all string `type` references to enum values.
 * This ensures the parser can reason with specifications
 * in the most optimal manner.
 *
 * @param {object} value
 */
export function description (value = {}) {

  const names = Object.keys(value).join('|');
  const match = '(?<=description:\\s+)[\\s\\S]+\\](?=,\\n\\s+\\w+:|\\n\\s+(?:\\}))';
  const regexp = new RegExp(match, 'g');

  return {
    name: 'description-join',
    renderChunk: (code, info) => {

      return {
        code: code.replace(regexp, (m, type) => JSON.stringify(JSON.parse(value[type]).join('\n')))
      };
    }
  };
}
