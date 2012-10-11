exports = module.exports = Koans;

var color = require('mocha').reporters.Base.color,
    util = require('util');

function Koans(runner) {

  function write() {
    process.stdout.write(util.format.apply(null, arguments));
  }

  runner.on('start', function() {
    write('I started');
  });

  runner.on('pass', function(test) {
    write('Test passed');
    console.log(test);
  });

  runner.on('fail', function(test, err) {
    write('Test failed');
    console.log(test, err);
  });

  runner.on('end', function() {
    write('\n\n');
    write('Finished');
  });
}