import test from 'ava';
import { LiquidParser } from '../package/index';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import time from 'pretty-hrtime';
import { config } from 'dotenv';

config();

const document = readFileSync(resolve('test/fixtures/blank.txt'), 'utf8').toString();

const server = {
  languageId: 'liquid',
  version: 1,
  text: document,
  uri: 'full_parse'
};

const parser = new LiquidParser({
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

parser.engine('shopify');

test('FullDocument Parse', t => {

  const start = process.hrtime();
  const ast = parser.scan(server);
  const end = process.hrtime(start);

  console.log(
    ast.nodes,
    ast
  );

  t.log(time(end, { verbose: true }));
  t.pass();

});
