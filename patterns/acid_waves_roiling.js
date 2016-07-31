var OPC = require('../opc');
var chromath = require('chromath');

function draw(model, client, data) {
    var dt = (Date.now()%data.period)/data.period;
    client.mapPixels(function(led){
      var y = led.point[2]; // 0.5 to -0.5
      var v = ((y+0.5+dt)%1.0)/1.0;
      var c = chromath.hsv(360*v,1,data.intensity);
      return c.toRGBArray();
    }, model);
};

module.exports = {
  draw: draw,
  features: {color:false},
};
