/**
  Pulses a solid color
**/
var period = 8000; //ms
var peak = 0.6; //60% of period is when peak happens
var minIllumination = 0.4;
var OPC = require('../opc');
var chromath = require('chromath');
var baseColor = null;

module.exports = function draw(model, client, data) {
    var tperiod = (Date.now() % period)/period;
    var c = null;
    if (tperiod <= peak){
      // breath full, release
      var pct = tperiod/peak;
      var cappedIntensity = (1.0-minIllumination)-pct*(1.0-minIllumination);
      c = chromath.shade(data.color,cappedIntensity).toRGBArray();
    } else {
      var pct = (tperiod-peak)/(1.0-peak);
      var cappedIntensity = pct*(1.0-minIllumination);
      c = chromath.shade(data.color,cappedIntensity).toRGBArray();
    }
    client.mapPixels(function(_){ return c; }, model);
};
