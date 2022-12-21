import Benchmark from 'benchmark';
import Prettify from '@liquify/prettify';
import Prettier from 'prettier';
import JSBeautify from 'js-beautify';
import path from 'path';
import fs from 'fs';

const js = fs.readFileSync(path.join(process.cwd(), 'tools', '/samples/javascript.txt')).toString();

const suite = new Benchmark.Suite();

suite.add('Prettier (JavaScript)', function () {

  return Prettier.format(js, {
    parser: 'babel'

  });

}, {
  async: true
});

suite.add('JSBeautify (JavaScript)', function () {

  JSBeautify.js(js, {
    wrap_line_length: 80
  });

}, {
  async: false
});

suite.add('Prettify (JavaScript)', function () {

  return Prettify.format(js, {
    language: 'javascript',
    lexer: 'script',
    wrap: 80
  }).catch(e => {
    console.log(e);
  });

}, {
  async: true
});

suite.on('cycle', function (event) {
  console.log(String(event.target));
});

suite.on('complete', async function () {

  console.log('\nFastest is ' + this.filter('fastest').map('name'));
  console.log('\nBeautification Times:', '\n');

  console.time('Prettier');

  await Prettier.format(js, {
    parser: 'babel'
  });

  console.timeEnd('Prettier');

  console.time('JSBeautify');

  JSBeautify.js_beautify(js, {
    wrap_line_length: 80
  });
  console.timeEnd('JSBeautify');

  console.time('Prettify');
  await Prettify.format(js, {
    language: 'javascript',
    lexer: 'script',
    wrap: 80
  });
  console.timeEnd('Prettify');
});

suite.run();
