module.exports = function (){
  var fs = require('fs');
  var _ = require('underscore');
  var files = fs.readdirSync(__dirname);
  var PERIOD = 10000;
  var patterns = {};

  for (var i = 0; i<files.length; i++){
    var fName = __dirname + "/" + files[i];
    var default_features = {
      color: true,
      intensity: true,
      period: true
    };
    if (fName == __filename) {
      // dont load ourselves!
      continue;
    }
    if (files[i].match(/^\w+\.js$/)) {
      var name = files[i].replace(/\.[^/.]+$/, "");
      patterns[name] = require(fName);
      if (typeof(patterns[name]) == 'function') {
        // use default features
        patterns[name] = {
          features: default_features,
          draw: patterns[name]
        };
      } else {
        // merge in default features
        patterns[name]['features'] = _.extend(default_features, patterns[name]['features']);
      }
    }
  }

  function pickRandomPattern(){
    var patternsKeys = Object.keys(patterns);
    Math.round(Math.random()*patternsKeys.length);
    var patternName = patternsKeys[Math.floor(Math.random()*patternsKeys.length)];
    var p = patterns[patternName];
    console.log("random: setting pattern to " + patternName);
    activePattern = patterns[patternName]['draw'];
  };

  var activePattern = null;
  pickRandomPattern();
  setInterval(pickRandomPattern, PERIOD);

  return function(model, client, data) { return activePattern(model,client,data); };
}();
