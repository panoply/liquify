import { LiquidParser } from '../../package/parser';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import { Instance as Chalk } from 'chalk';

config();

export function toToken (input) {

  const document = parser.parse(input);

  return document.getText(document.diagnostics[0].range);

}

export const doTests = (errors) => fn => {

  errors.forEach((input, index) => {

    const token = toToken(Array.isArray(input) ? input[0] : input);

    return fn({
      title: 'Test Case: ' + index++,
      input: Array.isArray(input) ? input[0] : input,
      token,
      match: Array.isArray(input) ? input[1] : input,
      newline: index === errors.length ? '\n' : ''
    });

  });

};

export const chalk = new Chalk({ level: 2 });

export function log (input, match, colour = 'yellow') {

  const regex = new RegExp(match, 'g');

  if (typeof colour === 'string') {
    return input.replace(regex, string => chalk[colour](string));
  }

  return input.replace(regex, (
    string,
    match1,
    match2
  ) => chalk[colour[0]](match1) + chalk[colour[1]](match2));

};

export const document = readFileSync(resolve('test/fixtures/blank.txt'), 'utf8').toString();

export const server = {
  languageId: 'liquid',
  version: 1,
  text: document,
  uri: 'test.liquid'
};

export const parser = new LiquidParser({
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
