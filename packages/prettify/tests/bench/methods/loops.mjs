import Benchmark from 'benchmark';

const arr = Array.of(1e5);
const len = arr.length;
const suite = new Benchmark.Suite();

suite.add('do {} while ()', function () {
  let a = 0;
  do { a = a + 1; } while (a < len);
  return a;
});

suite.add('for () {}', function () {
  let a = 0;
  let x = '';
  for (a; a < len; a = a + 1) { x = `${a}`; }
  return x;
});

suite.add('while () {}', function () {
  let a = 0;
  while (a < len) { a = a + 1; }
  return a;
});

suite.add('[].forEach()', function () {

  arr.forEach(x => {
    return x;
  });

});

suite.on('cycle', function (evt) {
  console.log(' - ' + evt.target);
});

suite.on('complete', function () {

  console.log('\nFastest is ' + this.filter('fastest').map('name'));
});

console.log(1e5 + ' Loops');
console.log(new Array(30).join('-'));

suite.run();
