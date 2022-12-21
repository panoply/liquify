/**
 * TSUP Plugin
 *
 * Converts all string `type` references to enum values.
 * This ensures the parser can reason with specifications
 * in the most optimal manner.
 *
 * @param {object} value
 */
export function enums (value = {}) {

  const names = Object.keys(value).join('|');
  const match = `(?<=(?:separator|type):\\s{0,})['"]\\b(${names})\\b['"](?=[\n,]?)`;
  const regexp = new RegExp(match, 'g');

  return {
    name: 'string-to-enum',
    renderChunk: (code, info) => {

      return {
        code: code.replace(regexp, (m, type) => value[type])
      };
    }
  };
}
