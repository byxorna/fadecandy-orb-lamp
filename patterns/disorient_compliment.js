var OPC = require('../opc');
var chromath = require('chromath');

function draw(model, client, data) {
    var c1 = chromath.hsv(296,1,1);
    var c2 = chromath.hsv(34,1,1);

    var dp = (Date.now()%(data.period/2.0))/(data.period/2.0);
    client.mapPixels(function(led){
      var x = led.point[0];
      var wrapx = (x+1.0+dp*2.0)%2.0 - 1.0;
      return chromath
        .towards(c1, c2, Math.abs(wrapx))
        .darken(1.0-data.intensity)
        .toRGBArray();
    }, model);
};

module.exports = {
  draw: draw,
  features: {color: false},
};

