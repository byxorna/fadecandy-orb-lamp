var OPC = require('../opc');
var chromath = require('chromath');
/**
  Draws a solid color, based on the rgb values in data
**/

module.exports = function draw(model, client, data) {
    var c = chromath
      .rgb(data.red,data.green,data.blue)
      .darken(1.0-data.intensity)
      .toRGBArray();
    client.mapPixels(function(_){ return c; }, model);
};
