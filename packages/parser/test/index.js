import test from 'ava';
import { LiquidParser } from '../dist/index';
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
  uri: 'full_parse',
  getText: () => document
};

const { Parser, Spec } = LiquidParser({
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

Spec.engine('shopify');

test('FullDocument Parse', t => {

  const start = process.hrtime();
  const ast = Parser.scan(server);
  const end = process.hrtime(start);

  t.log(
    ast.nodes,
    ast.errors,
    ast.nodes[0].getContext()
  );

  t.log(time(end, { verbose: true }));
  t.pass();

});
