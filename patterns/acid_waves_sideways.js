var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {
    var dt = (Date.now()%data.period)/data.period;
    client.mapPixels(function(led){
      var x = led.point[0];
      var v = ((x+1.0+2*dt)%2.0)/2.0;
      var c = chromath.hsv(360*v,1,data.intensity);
      return c.toRGBArray();
    }, model);
};
