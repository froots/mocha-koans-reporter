var util = require('util'),
    CR = '\n';

exports = module.exports = {};

// Return a filtered array of stack trace lines, removing those coming from mocha or node.js itself
exports.filterTrace = function(trace) {
  var lines = trace.split('\n');
  return lines.filter(function(line) {
    return !line.match(/mocha/) && !line.match(/\(node\.js\:\d+\:\d+\)$/);
  }).join('\n');
};

var write = exports.write = function() {
  process.stdout.write(util.format.apply(null, arguments));
};

var writeln = exports.writeln = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.push(CR);
  write.apply(null, args);
};