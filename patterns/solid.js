var OPC = require('../opc');
/**
  Draws a solid color, based on the rgb values in data
**/

module.exports = function draw(model, client, data) {
    var r = (data.r == null) ? 255 : data.r,
        g = (data.g == null) ? 255 : data.g,
        b = (data.b == null) ? 255 : data.b;
    var c = [r,g,b];
    client.mapPixels(function(_){ return c; }, model);
};
