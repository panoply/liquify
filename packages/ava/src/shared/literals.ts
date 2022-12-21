/**
 * Dedent Literals
 */
function literal (strings: TemplateStringsArray, ...values: Array<string>) {

  const raw = typeof strings === 'string' ? [ strings ] : strings.raw;
  const len = raw.length;

  // first, perform interpolation
  let result = '';
  let mindent: number | null = null;

  for (let i = 0; i < len; i++) {

    result += raw[i]
      .replace(/\\\n[ \t]*/g, '')
      .replace(/\\`/g, '`');

    if (i < values.length) result += values[i];

  }

  // now strip indentation
  const lines = result.split('\n');
  const size = lines.length;

  for (let i = 0; i < size; i++) {

    const m = lines[i].match(/^(\s+)\S+/);

    if (m) {
      const indent = m[1].length;
      mindent = !mindent ? indent : Math.min(mindent, indent);
    }

  }

  if (mindent !== null) {
    const m = mindent;
    result = lines.map(l => l[0] === ' ' ? l.slice(m) : l).join('\n');
  }

  return result.trim().replace(/\\n/g, '\n');

}

/**
 * Liquid Template Literal
 *
 * @example
 *
* liquid`
*
*  <div>
*    Hello World
*  </div>
*
* `
*/
export const liquid = literal;

/**
 * HTML Template Literal
 *
 * @example
 *
 * html`
 *
 *  <div>
 *    Hello World
 *  </div>
 *
 * `
 */
export const html = literal;

/**
 * XHTML Template Literal
 *
 * @example
 *
 * xhtml`
 *
 *  <br />
 *
 * `
 */
export const xhtml = literal;

/**
 * XML Template Literal
 *
 * @example
 *
 * xml`
 *
 *  <?xml version="1.0" encoding="UTF-8" ?>
 *
 * `
 */
export const xml = literal;

/**
 * CSS Template Literal
 *
 * @example
 *
 * css`
 *
 *  .class {
 *    font-color: white;
 *  }
 *
 * `
 */
export const css = literal;

/**
 * SCSS Template Literal
 *
 * @example
 *
 * scss`
 *
 *  .class {
 *    font-color: white;
 *  }
 *
 * `
 */
export const scss = literal;

/**
 * SASS Template Literal
 *
 * @example
 *
 * sass`
 *
 *  .class
 *    font-color: white;
 *
 * `
 */
export const sass = literal;

/**
 * JSON Template Literal
 *
 * @example
 *
 * json`
 *
 *  {
 *    "prop": "value"
 *  }
 *
 * `
 */
export const json = literal;

/**
 * JSON Template Literal
 *
 * @example
 *
 * jsonc`
 *
 *  {
 *    "prop": "value" // some comment
 *  }
 *
 * `
 */
export const jsonc = literal;

/**
 * JavaScript Template Literal
 *
 * @example
 *
 * js`
 *
 *  function foo () { }
 *
 */
export const js = literal;

/**
 * JSX Template Literal
 *
 * @example
 *
 * jsx`
 *
 * function foo (prop) {
 *
 *   return <Component name={prop.name} />;
 *
 * }
 *
 * `
 */
export const jsx = literal;

/**
 * TypeScript Template Literal
 *
 * @example
 *
 * ts`
 *
 *  function foo () { }
 *
 * `
 */
export const ts = literal;

/**
 * TSX Template Literal
 *
 * @example
 *
 * tsx`
 *
 * function foo (prop: { name: string }) {
 *
 *   return <Component name={prop.name} />;
 *
 * }
 *
 * `
 */
export const tsx = literal;

/**
 * YAML Template Literal
 *
 * @example
 *
 * yaml`
 *
 * key: 'value'
 * arr:
 *   - one
 *   - two
 * `
 */
export const yaml = literal;

/**
 * Markdown Template Literal
 *
 * @example
 *
 * md`
 *
 * # Title
 *
 * **bold** _italic_
 *
 * `
 */
export const md = literal;
