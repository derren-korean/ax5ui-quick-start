exports.render = function(input, out) {
  var fs = require('fs');
  out.write(
    fs.readFileSync('assets/include/ax5ui-plugins.inc', 'utf8')
  );
};