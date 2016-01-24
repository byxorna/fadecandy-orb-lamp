/**
  Cycles through hues
**/
var period = 10000;
var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {
    var hue_progression = (Date.now() % period)/period;
    var c = chromath.hsv(255*hue_progression,1,1).toRGBArray();
    //console.log("hue progression:",hue_progression, c);
    client.mapPixels(function(_){ return c; }, model);
};
