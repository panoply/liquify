import test from 'ava';
import pkg from '../package.json';

const { p } = require('../index')(pkg);

test('p`` function template literal', t => {

  t.is(p`index.js`, 'index.js');
  t.log('Argument successfully converted to string');

});

test('p(\'\') function string', t => {

  t.is(p('index.js'), 'index.js');
  t.log('Argument successfully converted to string');

});

test('p([]) function array', t => {

  t.is(p([ 'index.js' ]), 'index.js');
  t.log('Argument successfully converted to string');

});

test('p({}) function object', t => {

  t.log('object property is file');
  t.deepEqual(p({ 'index.js': 'foo/bar.js' }), {
    'index.js': 'foo/bar.js'
  });

  t.log('object property is a string');
  t.deepEqual(p({ foo: 'foo/bar.js' }), {
    foo: 'foo/bar.js'
  });

});
