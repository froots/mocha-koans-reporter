describe('koanUtils', function() {
  var koanUtils = require('../../src/koan-utils.js');

  describe('filterTrace()', function() {
    var trace = [ '   ReferenceError: myunknownvar is not defined'
      , '    at Context.<anonymous> (/some/project/folder.js:24:12)'
      , '    at Test.Runnable.run (/usr/local/lib/node_modules/mocha/lib/runnable.js:200:32)'
      , '    at Runner.runTest (/usr/local/lib/node_modules/mocha/lib/runner.js:307:10)'
      , '    at process.startup.processNextTick.process._tickCallback (node.js:244:9)'
    ].join('\n');

    beforeEach(function() {
      this.filteredTrace = koanUtils.filterTrace(trace).split('\n');
    });

    it('returns the correct number of lines', function() {
      expect(this.filteredTrace.length).to.equal(2);
    });

    it('keeps the expected lines', function() {
      expect(this.filteredTrace[0]).to.equal('   ReferenceError: myunknownvar is not defined');
      expect(this.filteredTrace[1]).to.equal('    at Context.<anonymous> (/some/project/folder.js:24:12)');
    });
  });
})