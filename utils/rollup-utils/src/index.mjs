import jsonStrip from 'strip-json-comments';
import jsonMinify from 'jsonminify';
import { basename, join, resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import stripIndent from 'strip-indent';
import chalk from 'chalk';
import dotenv from 'dotenv';

/**
 * @type {import('./types/index')['env']}
 */
export const env = {
  get vars () {

    return dotenv.config();

  },
  get dev () {

    if (!this.prod) {
      process.env.dev = 'true';
      return true;
    } else {
      process.env.dev = 'false';
    }

    return false;

  },
  get prod () {

    if (process.env.prod === 'true') {
      process.env.dev = 'false';
      return true;
    };

    return false;

  },
  get watch () {

    return process.env.ROLLUP_WATCH === 'true';

  },
  is (condition, returns) {

    let environment;

    if (typeof condition === 'boolean') {
      environment = condition;
    } else {
      switch (condition) {
        case 'dev': environment = this.dev; break;
        case 'prod': environment = this.prod; break;
        case 'watch': environment = this.watch; break;
        default: environment = process.env[condition] === 'true';
      }
    }
    if (environment) return returns;

    return (
      typeof returns === 'string' ||
      typeof returns === 'number' ||
      typeof returns === 'boolean'
    ) ? false : null;

  },
  if (condition) {

    let environment;

    if (typeof condition === 'boolean') {

      environment = condition;

    } else {
      switch (condition) {
        case 'dev': environment = this.dev; break;
        case 'prod': environment = this.prod; break;
        case 'watch': environment = this.watch; break;
        default: environment = process.env[condition] === 'true';
      }
    }

    return initial => combined => {

      if (environment) return initial;

      const arrInitial = Array.isArray(initial);
      const arrCombined = Array.isArray(combined);

      if (arrInitial && arrCombined) return [ ...initial, ...combined ];

      const strInitial = typeof initial === 'string';
      const strCombined = typeof combined === 'string';

      if (arrInitial && strCombined) return [ ...initial, combined ];
      if (strInitial && arrCombined) return [ initial, ...combined ];
      if (strInitial && strCombined) return [ initial, combined ];

      const fnInitial = typeof initial === 'function';
      const fnCombined = typeof combined === 'function';

      if (arrInitial && fnCombined) return [ ...initial, combined ];
      if (fnInitial && arrCombined) return [ initial, ...combined ];
      if (fnInitial && fnCombined) return [ initial, combined ];

      return combined;

    };
  }
};

/**
 * @type {import('./types/index')['date']}
 */
export const date = (utc) => {

  if (!utc) utc = new Date();

  const time = new Date(utc).toLocaleDateString('en-gb', {
    year: 'numeric'
    , month: 'long'
    , day: 'numeric'
  });

  return time.replace(/([0-9]+)/, (n) => {

    const day = Number(n);

    return n + (
      [
        ''
        , 'st'
        , 'nd'
        , 'rd'
      ][day / 10 % 10 ^ 1 && day % 10] || 'th'
    );

  });

};

/**
 * @type {import('./types/index')['config']}
 */
export const config = (() => {

  const cwd = process.cwd();
  const file = readFileSync(join(cwd, 'package.json')).toString();
  const pkg = JSON.parse(jsonStrip(file));
  const path = join(cwd, 'tsconfig.json');

  return {
    get cwd () {

      return cwd;

    },
    get package () {

      return pkg;

    },
    get external () {

      return Object.keys(pkg.dependencies);

    },
    get tsconfig () {

      if (existsSync(path)) {
        const json = readFileSync(path).toString();
        const tsconfig = JSON.parse(jsonStrip(json));
        return tsconfig;
      }

      return null;

    },
    path: (uri) => {

      return resolve(cwd, uri);

    },
    alias: (ids, src = 'src') => {

      return ids.map(
        find => ({
          find: new RegExp(find),
          replacement: resolve(cwd, `${src}/${find}`)
        })
      );
    },
    tsalias: (paths) => {

      return Object.entries(paths).map(([ find, [ value ] ]) => ({
        find,
        replacement: resolve(cwd, value)
      }));

    },
    output: {
      get cjs () { return pkg.exports.require || null; },
      get esm () { return pkg.exports.import || null; },
      get exports () { return pkg.exports || null; },
      get main () { return pkg.main || null; },
      get module () { return pkg.module || null; }
    }
  };
})();

/**
 * @type {import('./types/index')['path']}
 */
export const path = (url) => resolve(process.cwd(), url);

/**
 * @type {import('./types/index')['jsonmin']}
 */
export const jsonmin = (content) => {

  if (content.length === 0) {
    return console.log(chalk`{italic  JSON file is empty, skipping}`);
  }

  try {
    const parsed = JSON.parse(jsonStrip(content));
    const minified = jsonMinify(JSON.stringify(parsed));

    return minified;
  } catch (e) {
    throw new Error(e);
  }

};

/**
 * License banner applied to javascript files
 *
 * @param {object} package
 * @returns {string}
 */
export const banner = (license = 'PROPRIETARY') => {

  const { name, main, version, author } = config.package;
  const owner = author;
  const date = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .substring(0, 19);

  switch (license) {
    case 'PROPRIETARY': return stripIndent(
      `
      /**
       * !! THIS IS PROPRIETARY SOFTWARE !!
       *
       * @license
       *
       * ${basename(main)}
       *
       * Copyright © of ${owner} - All Rights Reserved.
       *
       * Unauthorized copying or modification of this file, via any medium is strictly
       * prohibited. Please refer to the LICENSE and/or ThirdPartyNotices.txt files
       * included in bundle.
       *
       * License:  ${license}
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       */

      `
    );
    case 'MIT': return stripIndent(
      `
      /**
       * @license
       *
       * MIT License
       *
       * ${basename(main)}
       *
       * Copyright © ${owner}
       *
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in all
       * copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
       * SOFTWARE.
       */

      `
    );
    case 'CC BY-NC-ND 4.0': return stripIndent(
      `
      /**
       * @license
       *
       * ${basename(main)}
       *
       * Copyright © ${owner}
       *
       * License:  ${license}
       * Package:  ${name}
       * Version:  ${version}
       * Updated:  ${date}
       *
       * Please refer to the LICENSE.txt and/or ThirdPartyNotices.txt files included in bundle.
       *
       */

      `
    );
  }
};
