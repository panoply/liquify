const { join } = require('node:path');
const { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } = require('node:fs');

const cwd = process.cwd();

/**
 * The working directory
 */
const stores = join(cwd, 'stores');

/**
 * Obtains Markdown Descriptions
 */
const markdown = /(?<="(markdownDescription|deprecationMessage)":\s")\.\/.*(?=")/g;

/**
 * Capture Object Injection
 */
const captureInjectObjects = /(?<=:\s)\{\s*"injectObject":\s"\.\/.*"\s*}/g;

/**
 * Obtains JSON Objects from another file
 */
const injectObjects = /(?<="injectObject":\s)"\.\/.*"/;

/**
 * Obtains JSON from another file
 */
const injectProperties = /(?<="injectProperties":\s)"\.\/.*"/g;

/**
 * Replaces the `injectProperties` with `properties`
 */
const replace = /(?<=")injectProperties(?=")/g;

/**
 * Read and stringify the markdown file contents.
 *
 * @param {string} file The file name
 */
function readMarkdownFile (file) {

  const read = readFileSync(join(stores, file), { encoding: 'utf8' });
  const stringify = JSON.stringify(read, 0).trim();

  return stringify;

}

function importMarkdown (json) {

  /**
   * Find all `markdownDescription` properties
   */
  const find = json.match(markdown);

  if (find !== null) {

    /**
     * Loop over each occurance of the property
     * and inject the relative markdown file contents.
     */
    for (const filePath of find) {

      /**
       * Read Markdown file
       */
      const stringifyMarkdown = readMarkdownFile(filePath);

      /**
       * Execute markdown injection
       */
      json = json.replace('"' + filePath + '"', stringifyMarkdown);

    }
  }

  return json;
}

/**
 * Traverse each JSON store file and apply injections
 */
function mapContent () {

  try {

    /**
     * Reads all files contained in the `/stores` directory
     */
    const files = readdirSync(stores);

    /**
     * Ensure we are only traversing JSON files.
     */
    const items = files.filter(file => file.endsWith('.json'));

    /* -------------------------------------------- */
    /* LOOP THROUGH FILES                           */
    /* -------------------------------------------- */

    for (const file of items) {

      /**
       * The full URI file path location of this file.
       */
      const uri = join(stores, file);

      /**
       * The contents of the JSON file
       */
      let json = readFileSync(uri, { encoding: 'utf8' });

      /**
       * Lets test for the existence of object injections.
       * This will obtain an external file and inject it where specified.
       */
      if (captureInjectObjects.test(json)) {

        const from = json.match(captureInjectObjects);

        if (from !== null) {

          for (const content of from) {

            /**
             * Get the `injectObject` property value
             */
            const getProp = content.match(injectObjects);

            /**
             * Extract the injection file name path, slice out quotations
             */
            let fileName = getProp[0].slice(1, -1);

            /**
             * Check for a hash # value for injections which point to a
             * specific reference within an external file.
             */
            const hashidx = fileName.indexOf('#');

            /**
             * The property to inject from the referenced file name
             */
            let name;

            if (hashidx > -1) {
              name = fileName.slice(hashidx + 1);
              fileName = fileName.slice(0, hashidx);
            }

            const readFile = readFileSync(join(stores, fileName), { encoding: 'utf8' });

            let parseJson = JSON.parse(importMarkdown(readFile));

            if (typeof name === 'string') {
              parseJson = parseJson.properties[name];
            }

            const imported = JSON.parse(importMarkdown(JSON.stringify(parseJson)));
            const stringify = JSON.stringify(imported);

            json = json.replace(content, stringify);

          }
        }
      }

      /**
       * Lets test for the existence of property injections.
       * This will obtain an external file and inject it where specified.
       */
      if (injectProperties.test(json)) {

        const from = json.match(injectProperties);

        if (from !== null) {

          for (const content of from) {

            /**
             * Extract the injection file name path, slice out quotations
             */
            let fileName = content.slice(1, -1);

            /**
             * Check for a hash # value for injections which point to a
             * specific reference within an external file.
             */
            const hashidx = fileName.indexOf('#');

            /**
             * The property to inject from the referenced file name
             */
            let name;

            if (hashidx > -1) {
              name = fileName.slice(hashidx);
              fileName = fileName.slice(0, hashidx);
            }

            const readFile = readFileSync(join(stores, fileName), { encoding: 'utf8' });

            let parseJson = JSON.parse(readFile);

            if (typeof name === 'string') {
              parseJson = parseJson[name];
            }

            const stringify = JSON.stringify(parseJson);
            json = json
              .replace(content, stringify)
              .replace(replace, 'properties');

          }
        }
      }

      json = importMarkdown(json);

      /**
       * Minification of JSON
       */
      const minify = JSON.stringify(JSON.parse(json), 0);

      /**
       * Obtain snake cased JSON file names
       */
      const snakes = file.match(/^\w+-/);

      /**
       * Rename and Re-path files using snake-case format.
       * These files will be output into their own directory
       */
      if (snakes !== null) {

        const dirName = join(cwd, 'package', snakes[0].slice(0, snakes[0].indexOf('-')));
        const name = file.replace(snakes[0], snakes[0].replace('-', '/'));

        if (!existsSync(dirName)) mkdirSync(dirName);

        writeFileSync(join(cwd, 'package', name), minify);

      } else {
        writeFileSync(join(cwd, 'package', file), minify);
      }

    }

  } catch (e) {

    console.error(e);

  }

}

mapContent();
