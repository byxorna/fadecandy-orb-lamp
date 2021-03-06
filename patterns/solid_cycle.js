/**
  Cycles through hues
**/
var OPC = require('../opc');
var chromath = require('chromath');

function draw(model, client, data) {
    var dp = data.period * 4;
    var hue_progression = (Date.now() % dp)/dp;
    var c = chromath
      .hsv(360*hue_progression,1,1)
      .darken(1.0-data.intensity)
      .toRGBArray();
    //console.log("hue progression:",hue_progression, c);
    client.mapPixels(function(_){ return c; }, model);
};

module.exports = {
  features: {color: false},
  draw: draw,
};
