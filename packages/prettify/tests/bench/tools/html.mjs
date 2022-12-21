import Benchmark from 'benchmark';
import Prettify from '@liquify/prettify';
import Prettier from 'prettier';
import JSBeautify from 'js-beautify';
import path from 'path';
import fs from 'fs';

const html = fs.readFileSync(path.join(process.cwd(), 'tools', '/samples/html.txt')).toString();
const suite = new Benchmark.Suite();

suite.add('Prettier', function () {

  return Prettier.format(html, {
    parser: 'html'
  });

}, {
  async: true
});

suite.add('JSBeautify', function () {

  return JSBeautify.html(html, {
    wrap_line_length: 80,
    indent_inner_html: true
  });

}, {
  async: false
});

suite.add('Prettify', function () {

  return Prettify.formatSync(html, {
    language: 'html',
    lexer: 'markup',
    wrap: 80
  });

}, {
  async: false
});

suite.on('cycle', function (event) {
  console.log(String(event.target));
});

suite.on('complete', async function () {

  console.log('\nFastest is ' + this.filter('fastest').map('name'));

  console.log('\nBeautification Times:', '\n');

  console.time('Prettier');
  Prettier.format(html, { parser: 'html' });
  console.timeEnd('Prettier');

  console.time('JSBeautify');
  JSBeautify.html_beautify(html, { wrap_line_length: 80 });
  console.timeEnd('JSBeautify');

  console.time('Prettify');
  Prettify.formatSync(html, { language: 'html', lexer: 'markup', wrap: 80 });
  console.timeEnd('Prettify');

});

suite.run();
