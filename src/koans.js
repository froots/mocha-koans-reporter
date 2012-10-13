exports = module.exports = Koans;

var color = require('mocha').reporters.Base.color,
    util = require('util'),
    koanUtils = require('./koan-utils');

/**
 *   - `start`  execution started
 *   - `end`  execution complete
 *   - `suite`  (suite) test suite execution started
 *   - `suite end`  (suite) all tests (and sub-suites) have finished
 *   - `test`  (test) test execution started
 *   - `test end`  (test) test completed
 *   - `hook`  (hook) hook execution started
 *   - `hook end`  (hook) hook complete
 *   - `pass`  (test) test passed
 *   - `fail`  (test, err) test failed
 */

 /* 
  colours
  'pass': 90
  , 'fail': 31
  , 'bright pass': 92
  , 'bright fail': 91
  , 'bright yellow': 93
  , 'pending': 36
  , 'suite': 0
  , 'error title': 0
  , 'error message': 31
  , 'error stack': 90
  , 'checkmark': 32
  , 'fast': 90
  , 'medium': 33
  , 'slow': 31
  , 'green': 32
  , 'light': 90
  , 'diff gutter': 90
  , 'diff added': 42
  , 'diff removed': 41
*/

/* Messages:
 if ((recents = progress.last(5)) && recents.size == 5 && recents.uniq.size == 1)
        puts Color.cyan("  I sense frustration. Do not be afraid to ask for help.")
      elsif progress.last(2).size == 2 && progress.last(2).uniq.size == 1
        puts Color.cyan("  Do not lose hope.")
      elsif progress.last.to_i > 0
        puts Color.cyan("  You are progressing. Excellent. #{progress.last} completed.")
      end
*/


function Koans(runner) {

  var failedKoan, CR = '\n', INDENT = '  ';

  function write() {
    process.stdout.write(util.format.apply(null, arguments));
  }

  function writeln() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(CR);
    write.apply(null, args);
  }

  function showSummary(failedKoan) {
    writeln();
    writeln('The Master says:');
    writeln(INDENT, color('medium', 'You have not yet reached enlightenment.'));
    writeln(INDENT, color('medium', 'Do not lose hope.'));
    writeln();
    writeln('The answers you seek...');
    writeln(INDENT, color('error message', failedKoan.err.message));
    writeln();
    writeln('Please meditate on the following code');
    writeln(INDENT, color('error message', koanUtils.filterTrace(failedKoan.err.stack)));
  }

  function showCompletion() {
    writeln(color('bright pass', 'Mountains are merely mountains again.'));
    writeln();
    writeln(color('bright pass', '                                                                                '));
    writeln(color('bright pass', '                                     ++                                         '));
    writeln(color('bright pass', '                                   ++++++          +++                          '));
    writeln(color('bright pass', '                       ++++++     ++++++++++      ++++++                        '));
    writeln(color('bright pass', '                       ++++++    ++++++++++++     ++++++                        '));
    writeln(color('bright pass', '                       ++++++   +++++++++++++++   ++++++                        '));
    writeln(color('bright pass', '                               +++++++++++++++++          ++++++                '));
    writeln(color('bright pass', '                              +++++++++++++++++++    ++++++++++++               '));
    writeln(color('bright pass', '            +++++++++++++++++++++++       ++++++++++++++++++++++++              '));
    writeln(color('bright pass', '            ++++++++++++++++++++++         +++++++++++++++++++++++              '));
    writeln(color('bright pass', '            +++++++++++++++++++++           ++++++++++++++++++++++              '));
    writeln(color('bright pass', '            ++++++++++++++++++++++           ++++++       ++++++++              '));
    writeln(color('bright pass', '            +++++++++    +++++++++++         ++++++        ++++++++             '));
    writeln(color('bright pass', '    +++++   +++++++          ++++++++        ++++++         +++++++  ++++++     '));
    writeln(color('bright pass', '   +++++++   +++++             +++++++        +++++         +++++++  ++++++     '));
    writeln(color('bright pass', '    +++++    +++++               ++++++       +++++         ++++++   +++++      '));
    writeln(color('bright pass', '     +++     +++++                +++++       +++++        +++++++              '));
    writeln(color('bright pass', '              +++++++               ++++      ++++         ++++++++++++         '));
    writeln(color('bright pass', '          ++++++++++++++++           +++      ++++        +++++++++++++++++     '));
    writeln(color('bright pass', '       +++++++++++++++++++++++        +++     +++        +++++++ +++++++++++++  '));
    writeln(color('bright pass', '     +++++++++++++++++++++++++++      +++    ++++       +++++++    +++++++++++++'));
    writeln(color('bright pass', '   +++++++++++++           +++++++     ++    +++       ++++++        ++++++++++ '));
    writeln(color('bright pass', '  ++++++++++                    ++++    +    ++      +++++++         ++++++++++ '));
    writeln(color('bright pass', ' ++++++++++                        ++   +   ++      ++++++           +++++++++  '));
    writeln(color('bright pass', '+++++++++++                          +     ++     ++++++             ++++++++   '));
    writeln(color('bright pass', '  +++++++++              ++++++++++            +++++               +++++++++    '));
    writeln(color('bright pass', '   ++++++++        ++++++++++++++           ++                   ++++++++++     '));
    writeln(color('bright pass', '     +++++++    +++++++++++++                                  +++++++++++      '));
    writeln(color('bright pass', '      ++++++++++++++++++++                  ++           +++++++++++++++        '));
    writeln(color('bright pass', '         +++++++++++++++                       +++++++++++++++++++++++          '));
    writeln(color('bright pass', '           +++++++++                              +++++++++++++++++             '));
    writeln(color('bright pass', '                                                                                '));
  }

  runner.on('start', function() {
    
  });

  runner.on('pass', function(test) {
  /* "title": "iterates over an object",
  "async": 0,
  "sync": true,
  "timedOut": false,
  "pending": false,
  "type": "test",
  "parent": "#<Suite>",
  "ctx": "#<Context>",
  "duration": 0,
  "state": "passed" */
  });

  runner.on('fail', function(test, err) {
    var out = color('bright fail', '✘ ' + test.fullTitle());
    out += color('fail', ' has damaged your karma.\n');
    test.err = err;
    failedKoan = test;
    write(out);
  });

  runner.on('end', function() {
    if (failedKoan) {
      showSummary(failedKoan);
    } else {
      showCompletion();
    }
  });
}