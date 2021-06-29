import { LiquidParser } from '../package/parser';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import { Instance as Chalk } from 'chalk';

config();

const chalk = new Chalk({
  level: 2
});

/**
 * @param {string} input
 * @param {RegExp} match
 * @param {'magenta'|'cyan'|'yellow'} [colour]
 * @returns {string}
 */
export function log (input, match, colour = 'yellow') {

  const regex = new RegExp(match, 'g');
  return input.replace(regex, string => chalk[colour](string));

};

export const document = readFileSync(resolve('test/fixtures/blank.txt'), 'utf8').toString();

export const server = {
  languageId: 'liquid',
  version: 1,
  text: document,
  uri: 'test.liquid'
};

export const { parse, ast, scan, update } = new LiquidParser({
  engine: 'shopify',
  license: process.env.MASTER_KEY,
  context: true,
  frontmatter: false,
  whitespace: false,
  newlines: true,
  range: true,
  offsets: true,
  process_unknown: true,
  parse_html: false,
  skip_strings: false,
  html_comments: false,
  multiline_comments: true,
  inline_comments: true,
  track_variables: true,
  error_tolerance: 1,
  exclude: [],
  associate_tags: []
});
