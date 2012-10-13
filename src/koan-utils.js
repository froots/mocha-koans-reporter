exports = module.exports = {};

exports.filterTrace = filterTrace;

// Return a filtered array of stack trace lines, removing those coming from mocha or node.js itself
function filterTrace(trace) {
  var lines = trace.split('\n');
  return lines.filter(function(line) {
    return !line.match(/mocha/) && !line.match(/\(node\.js\:\d+\:\d+\)$/);
  }).join('\n');
}