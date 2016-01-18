var OPC = require('../opc');
/**
  Draws a solid color, based on the rgb values in data
**/

module.exports = function draw(model, client, data) {
    var r = (data.color.r == null) ? 255 : data.color.r,
        g = (data.color.g == null) ? 255 : data.color.g,
        b = (data.color.b == null) ? 255 : data.color.b;
    var c = [r,g,b];
    client.mapPixels(function(_){ return c; }, model);
};
