/**
  Cycles through hues
**/
var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {
    var hue_progression = (Date.now() % data.period)/data.period;
    var c = chromath.hsv(255*hue_progression,1,1).toRGBArray();
    //console.log("hue progression:",hue_progression, c);
    client.mapPixels(function(_){ return c; }, model);
};
