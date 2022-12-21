import Benchmark from 'benchmark';

const arr = Array.of(1e5);
const len = arr.length;

const suite = new Benchmark.Suite();

suite.add('Object.create(null)', function () {

  let a = 0;
  const x = Object.create(null);

  do {
    x.foo = 100;
    a = a + 1;
  } while (a < len);

  return x;
});

suite.add('{}', function () {

  let a = 0;
  const x = {};

  do {
    x.foo = 100;
    a = a + 1;
  } while (a < len);

  return x;
});

suite.on('cycle', function (evt) {
  console.log(' - ' + evt.target);
});

suite.on('complete', function () {

  console.log('\nFastest is ' + this.filter('fastest').map('name'));
});

console.log('Object Creations');
console.log(new Array(30).join('-'));

suite.run();
