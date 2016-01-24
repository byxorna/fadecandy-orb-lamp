var OPC = require('../opc');
/**
  Draws a solid color, based on the rgb values in data
**/

module.exports = function draw(model, client, data) {
    var c = [data.red,data.green,data.blue];
    client.mapPixels(function(_){ return c; }, model);
};
