/**
  Cycles through hues
**/
var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {
    var dp = data.period * 4;
    var hue_progression = (Date.now() % dp)/dp;
    var c = chromath.hsv(360*hue_progression,1,1).toRGBArray();
    //console.log("hue progression:",hue_progression, c);
    client.mapPixels(function(_){ return c; }, model);
};
