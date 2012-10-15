var fs = require('fs'),
    color = require('mocha').reporters.Base.color,
    koanUtils = require('./koan-utils'),
    write = koanUtils.write,
    writeln = koanUtils.writeln;

exports = module.exports = Koans;

function Koans(runner) {

  var failedKoan,
      INDENT = '  ',
      passed = 0,
      previousPassCount = 0,
      progress,
      canRecordProgress = true,
      PROGRESS_FILE = '.path-progress',
      PROGRESS_DIRECTORY = './';

  var zenStatements = [
    'Mountains are merely mountains.',
    'Learn the rules so you know how to break them properly.',
    'Remember that silence is sometimes the best answer.',
    'Sleep is the best meditation.',
    'When you lose, don\'t lose the lesson.',
    'Things are not what they appear to be: nor are they otherwise.'
  ];

  function encourage() {
    var len = progress.length,
        lastFive = progress.slice(-5).sort(),
        lastTwo = progress.slice(-2);
    if (len >= 5 && (lastFive[0] == lastFive[lastFive.length - 1])) {
      return 'I sense frustration. Do not be afraid to ask for help.';
    } else if (len >= 2 && lastTwo[0] == lastTwo[1]) {
      return 'Do not lose hope.';
    } else if (passed > 0) {
      return 'You are progressing. Excellent. ' + passed + ' completed.';
    } else {
      return '';
    }
  }

  function showSummary(failedKoan) {
    var encourageMessage = encourage();
    writeln('The Master says:');
    writeln(INDENT, color('medium', 'You have not yet reached enlightenment.'));
    if (encourageMessage) writeln(INDENT, color('medium', encourage()));
    writeln();
    writeln('The answers you seek...');
    writeln(INDENT, color('error message', failedKoan.err.message));
    writeln();
    writeln('Please meditate on the following code');
    writeln(INDENT, color('error message', koanUtils.filterTrace(failedKoan.err.stack)));
    writeln();
    writeln(color('medium', zenLikeStatement(passed)));
  }

  function showProgress(passed, total) {
    if (!total) return false;
    var width = 50,
        passedChars = Math.floor(width * passed / total),
        failedChars = width - passedChars;
        message = 'your path thus far ',
        summary = passed + '/' + total,
        out = color('medium', message) +
          color('medium', '[') +
          color('bright pass', Array(passedChars + 1).join('.')) +
          color('fail', 'X') +
          color('medium', Array(failedChars).join('_')) +
          color('medium', '] ') +
          summary;
    writeln(out);
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

  function zenLikeStatement(i) {
    return zenStatements[i % zenStatements.length];
  }

  function initProgress() {
    progress = readProgress();
    previousPassCount = (progress.length) ? parseInt(progress[progress.length - 1], 10) : 0;
  }

  function readProgress() {
    var contents;
    try {
      contents = fs.readFileSync(PROGRESS_FILE);
    } catch(e) {}
    return (contents) ? ('' + contents).split(',') : [];
  }

  function writeProgress(progress) {
    try {
      fs.writeFileSync(PROGRESS_DIRECTORY + PROGRESS_FILE, progress.join(','));
    } catch(e) {
      // Can't keep track of progress
      canRecordProgress = false;
    }
  }

  function recordProgress(passed) {
    progress.push(passed);
    writeProgress(progress);
  }

  runner.on('start', function() {
    passed = 0;
    // clear screen
    process.stdout.write('\u001b[2J');
    // set cursor position
    process.stdout.write('\u001b[1;3H');
    writeln();
    initProgress();
  });

  runner.on('pass', function(test) {
    passed += 1;
    if (passed > previousPassCount) {
      var out = color('bright pass', '✔ ' + test.fullTitle());
      out += color('pass', ' has expanded your awareness.');
      writeln(out);
    }
  });

  runner.on('fail', function(test, err) {
    var out = color('bright fail', '✘ ' + test.fullTitle());
    out += color('fail', ' has damaged your karma.');
    writeln(out);
    test.err = err;
    failedKoan = test;
  });

  runner.on('end', function() {
    if (failedKoan) {
      writeln();
      recordProgress(passed);
      showSummary(failedKoan);
      showProgress(passed, this.total);
    } else {
      showCompletion();
    }
  });
}