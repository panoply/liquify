import chalk from 'chalk';
import fs, { readdir, writeFile, readFile } from 'fs-extra';
import { resolve, basename } from 'path';
import stripJsonComments from 'strip-json-comments';
import jsonMinify from 'jsonminify';
import crypto from 'crypto';
import chokidar from 'chokidar';
import inquirer from 'inquirer';

/**
 * Created by Fabio on 07/06/2017.
 */

/**
 * Helper class
 */
class Helper {

    /**
     * Normalize string
     * @param str
     * @returns {*}
     */
    static normalizeInput(str) {
        if (str === null || typeof str === 'undefined')
            throw new Error('required origin');

        if (typeof str === 'object')
            str = JSON.stringify(str);

        if (typeof str !== 'string')
            str = str.toString();

        return str;
    }

    /**
     * If is JSON string then parse
     * @param str
     * @returns {*}
     */
    static normalizeOutput(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
}

var helper = Helper;

const _list = [];

/**
 * Simple deprecate
 * @param prop {*}
 * @param msg {string}
 * @returns {boolean}
 */
const deprecate = (prop, msg) => {
    if(typeof prop !== 'undefined') {
        msg = msg || prop;

        if(!_list.includes(msg))
            _list.push(msg);

        console.warn('[' + deprecate.title + ']', msg);
        return true;
    }
    return false;
};

deprecate.title = 'DeprecationWarning';

/**
 * Calls only once same deprecation
 * @param args
 * @returns {boolean}
 */
const once = (...args) => {
    if(_list.includes(args[1] || args[0]))
        return false;
    return deprecate.apply(undefined, args);
};

var depreca = deprecate;
var once_1 = once;
var _list_1 = _list;
depreca.once = once_1;
depreca._list = _list_1;

var constants = {
    ALGORITHM: [
        'aes-256-cbc',
        'aes-256-cbc-hmac-sha1',
        'aes-256-cbc-hmac-sha256',
        'aes-256-cfb',
        'aes-256-cfb1',
        'aes-256-cfb8',
        'aes-256-ctr',
        'aes-256-ofb',
        'aes256',
        'camellia-256-cbc',
        'camellia-256-cfb',
        'camellia-256-cfb1',
        'camellia-256-cfb8',
        'camellia-256-ofb',
        'camellia256'
    ]
};

const {ALGORITHM} = constants;
/**
 * Cryptor class
 */
class Cryptor {

    /**
     * Cryptor constructor
     * @param key
     * @param algorithm
     */
    constructor(key, algorithm = 'aes-256-ctr') {
        if (typeof key !== 'string')
            throw new Error('required an string key');

        if (key === '')
            throw new Error('key cannot be empty');

        if (!ALGORITHM.includes(algorithm))
            throw new Error(`algorithm ${algorithm} not supported, use those available: ${ALGORITHM.join(', ')}`);

        // Transform to 32 chars
        key = this.constructor.hash(key, 'md5');

        Object.defineProperties(this, {
            algorithm: {
                value: algorithm
            },
            key: {
                value: key
            },
            iv: {
                value: key.substr(16)
            },
            options: {
                value: {}
            }
        });
    }

    /**
     * Encode string
     * @param str
     * @return {string}
     */
    encode(str) {
        str = helper.normalizeInput(str);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv, this.options);
        return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
    }

    /**
     * Decode string
     * @param str
     * @return {string}
     */
    decode(str) {
        str = helper.normalizeInput(str);
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv, this.options);
        const decoded = decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
        return helper.normalizeOutput(decoded);
    }

    /**
     * Get available ciphers
     * @return {array}
     */
    static getCiphers() {
        return crypto.getCiphers();
    }

    /**
     * Get available hashes
     * @return {array}
     */
    static getHashes() {
        return crypto.getHashes();
    }

    /**
     * MD5 hash
     * @param str
     * @returns {*}
     * @deprecated
     */
    static md5(str) {
        depreca('md5 is deprecated, use hash method instead. e.g. hash("your string", "md5")');
        return crypto.createHash('md5').update(str).digest('hex');
    }

    /**
     * SHA1 hash
     * @param str
     * @returns {*}
     * @deprecated
     */
    static sha1(str) {
        depreca('sha1 is deprecated, use hash method instead. e.g. hash("your string", "sha1")');
        return crypto.createHash('sha1').update(str).digest('hex');
    }

    /**
     * Creates hash of an string based on available hashes of platform
     * @param str
     * @param hash
     * @returns {*}
     */
    static hash(str, hash) {
        if (Cryptor.hasHash(hash)) {
            return crypto.createHash(hash).update(str).digest('hex');
        } else {
            throw new Error('hash ' + hash + ' not found in your platform')
        }
    }

    /**
     * Check if hash exists
     * @param hash
     * @returns {boolean}
     */
    static hasHash(hash) {
        return Cryptor.getHashes().indexOf(hash) !== -1;
    }
}

var cryptor = Cryptor;

/**
 * Created by Fabio on 21/05/2017.
 */
var cryptorjs = cryptor;

/**
 * CONSTANTS
 */
const SECRET = 'sissel siv';

/**
 * GLOBALS
 */
const { log } = console;

/**
 * Error handler which helps keeps error logging clean and
 * easy to understand
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {string} output the export output
 * @param {object} json the JSON string to be encrypted
 */
const errorHandler = file => error => {

  const printError = chalk`{red ${file}}\n${error}\n`;
  return log(chalk`{redBright Error} in ${printError}`)

};

/**
 * Write module JSON export as an AES string encryption and
 * use an MD5 hash for module name
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {string} output the export output
 * @param {object} json the JSON string to be encrypted
 */
const encryptFile = async (name, output, state, json) => {

  const crypto = new cryptorjs(SECRET);
  const encryptJSON = crypto.encode(json);
  const encryptID = crypto.encode(name);

  await writeFile(`${output}/${encryptID}.js`, `module.exports="${encryptJSON}";`);
  if (!global.watch) log(chalk`encrypted {magenta ${name}} to {green ${encryptID}}`);

  state.encrypt[encryptID] = `${encryptID}=require("./${encryptID}")`;

  return state

};

/**
 * Records specification modifications on a per bundle basis
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setCache = (name, state, json) => {

  state.cache[name] = { deprecated: [] };

  for (const [ id, { type, deprecated } ] of Object.entries(json)) {
    if (!state.cache[name][type]) state.cache[name][type] = [];
    if (deprecated) state.cache[name].deprecated.push(id);
    else state.cache[name][type].push(id);
  }

  return state

};

/**
 * Set the grammar lexicals which are used when generating textmate
 * grammars liquid variations
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setGrammar = (cache, regex = {}) => {

  for (const prop in cache) {
    if (!cache[prop].length) continue
    regex[prop] = `(${cache[prop].join('|')})`;
  }

  return regex

};

/**
 * Set the parsing lexicals that are used by the liquid
 * language server parser
 *
 * @param {string} name the file name
 * @param {object} state state state
 * @param {array} json the object entries of json
 */
const setParsing = (state) => {

  const { parsing, cache, cache: { standard } } = state;

  for (const variant in cache) {

    if (typeof parsing[variant] !== 'object') parsing[variant] = {};

    const { filter = [], object = [] } = cache[variant];

    state.parsing[variant].objects = [ ...object ].sort();
    state.parsing[variant].filters = variant !== 'standard' ? [
      ...filter,
      ...standard.filter
    ].sort() : standard.filter.sort();
  }

  return state

};

/**
 * Create module export files with the generated
 * state cofiguration
 *
 * @param {string} output
 * @param {object} state
 */
const createFiles = async (output, state) => {

  // Write encryptions
  await encryptFile('specs', output, state, state.specs);
  await encryptFile('grammar', output, state, state.grammar);

  const { parsing } = setParsing(state);
  const { encrypt } = await encryptFile('parsing', output, state, parsing);

  // Generate exports in file
  const modules = `const ${Object.values(encrypt).join(',')}`;
  const specs = Object.keys(encrypt).join(',');
  const exported = `${modules};module.exports={${specs}};`;

  // Write main entry
  await writeFile(`${output}/index.js`, exported);

};

/**
 * Write the specification export file and set grammars
 *
 * @param {string} input the input location
 * @param {object} state the state object
 */
const writeFiles = (input, state) => async filename => {

  const file = filename ? `${input}/${filename}` : input;
  const name = basename(file).replace(/\.[^/.]+$/, '');
  const read = await readFile(file);
  const strip = stripJsonComments(read.toString());
  const json = JSON.parse(jsonMinify(strip));
  const { cache } = setCache(name, state, json);

  state.specs[name] = json;
  state.grammar[name] = setGrammar(cache[name]);

};

/**
 * Executes a build of specifications
 *
 * @param {string} input
 * @param {string} output
 * @param {object} state
 */
const build = async (input, output, state) => {

  const specs = await readdir(input);
  const write = writeFiles(input, state);
  const error = errorHandler(input);

  for (const id of specs) await write(id).catch(error);

  // Create export
  await createFiles(output, state).catch(error);

  return state

};

/**
 * Launches chokidor watcher (for devleopment)
 *
 * @param {string} output
 * @param {object} state
 */
const watch = (output, state) => async input => {

  const filename = basename(input);
  const error = errorHandler(filename);

  log(chalk`{cyan changed} '{yellow ${filename}}'`);

  const write = writeFiles(input, state);

  await write().catch(error);
  await createFiles(output, state).catch(error);

};

/**
 * Default exports - Digested by the CLI
 *
 * @param {object} config
 * @param {object} state prop values are the encoded names
 */
var specs = async (config, state = {
  specs: {},
  cache: {},
  grammar: {},
  parsing: {},
  encrypt: {}
}) => {

  const cwd = process.cwd();
  const input = resolve(cwd, config.input);
  const output = resolve(cwd, config.output);
  const errors = errorHandler(input);

  if (config.build) {
    log(chalk`{bold.cyan Liquid Specifications}\n`);
    await build(input, output, state).catch(errors);
  } else if (config.watch) {
    log(chalk`{bold.cyan Liquid Specifications}\n`);
    await build(input, output, state).catch(errors);
    const watcher = chokidar.watch(`${input}/**`, { persistent: true });
    const change = watch(output, state);
    global.watch = true;
    watcher.on('change', change).on('error', errors);
  }

};

var prompt = () => inquirer.prompt([
  {
    type: 'list',
    name: 'bundle',
    message: 'Choose Bundle',
    choices: [
      'Clients',
      'Server',
      'Grammar',
      'Specs',
      'Website'
    ]
  },
  {
    type: 'list',
    name: 'client',
    message: 'Choose Client Bundle',
    choices: [
      'VSCode',
      'Atom',
      'Sublime'
    ]
  },
  {
    type: 'list',
    name: 'publish',
    message: 'Publish',
    choices: [
      'VSCode Marketplace',
      'Atom Packages',
      'Sublime Package Control',
      'Website via Netlify'
    ]
  },
  {
    type: 'list',
    name: 'publish',
    message: 'Configure',
    choices: [
      'Relink Files',
      'Atom Packages',
      'Sublime Package Control',
      'Website via Netlify'
    ]
  },
  {
    type: 'list',
    name: 'git',
    message: 'Choose Git Operation',
    choices: [
      'Add',
      'Commit',
      'Checkout',
      'Merge',
      'Rebase',
      'Pull',
      'Push',
      'Ammend'
    ]
  }
]);

const config = {
  grammar: './packages/grammar/liquid.jsonc',
  specs: './packages/specs/variations'
};

const writeSyntax = async pattern => {

  const jsonc = await fs.readFile(config.grammar);
  const strip = JSON.parse(stripJsonComments(jsonc.toString()));

  console.log(strip);

  return pattern

};

const generateParse = pattern => {

  const { grammar, parser } = pattern;
  const { standard } = grammar;

  for (const variant in grammar) {

    if (typeof parser[variant] !== 'object') parser[variant] = {};

    const { filter = [], object = [] } = grammar[variant];

    pattern.parser[variant].objects = [ ...object ].sort();
    pattern.parser[variant].filters = variant !== 'standard' ? [
      ...filter,
      ...standard.filter
    ].sort() : standard.filter.sort();

  }

  return writeSyntax(pattern)

};

const generateSpecs = async pattern => {

  const { grammar } = pattern;
  const specs = await fs.readdir(config.specs);

  for (const variation of specs) {

    const content = await fs.readFile(`${config.specs}/${variation}`);
    const parsed = JSON.parse(stripJsonComments(content.toString()));
    const variant = variation.replace(/\.[^/.]+$/, '');

    grammar[variant] = { deprecated: [] };

    for (const [ name, { type, deprecated } ] of Object.entries(parsed)) {
      if (!grammar[variant][type]) grammar[variant][type] = [];
      if (deprecated) grammar[variant].deprecated.push(name);
      else grammar[variant][type].push(name);
    }

  }

  return generateParse(pattern)

};

const rollup = async (pattern = { grammar: {}, parser: {}, syntax: {} }) => {

  const specs = await generateSpecs(pattern);

  // const parsed = JSON.parse(stripJsonComments(jsonc.toString()))
  // const string = JSON.stringify(parsed, null, 2)
  console.log(specs);

};

const generate = async type => {

  const prompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'bundle',
      message: 'Select the type of Grammar',
      choices: [
        'include',
        'injection'
      ]
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter the filename'
    }
  ]);

  const dir = prompt.bundle === 'include' ? prompt.bundle : 'injects';
  const path = `./packages/grammar/${dir}/${prompt.filename}.json`;

  await fs.writeFile(path, JSON.stringify(dir === 'include' ? {
    $schema: 'https://cdn.liquify.dev/schema/include-tmlanguage.json',
    patterns: []
  } : {
    $schema: 'https://cdn.liquify.dev/schema/tmlanguage.json',
    injectionSelector: '',
    scopeName: '',
    patterns: []
  }, null, 2));

  return prompt

};

var grammar$1 = { generate, rollup };

module.exports = async (run, config) => {

  switch (run) {
    case 'specs':
      await specs(config); break
    // case 'schema':
      // await schema(config); break
    // case 'server':
      //  await server(config); break
    // case 'client':
      // await client(config); break
    case 'grammar':
      await grammar(config); break
    default:
      await prompt();
      // log(chalk`{red Command does not exist}`)
  }

};

export { grammar$1 as grammar };
