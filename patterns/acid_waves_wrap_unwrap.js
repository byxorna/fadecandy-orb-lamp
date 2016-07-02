var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {
    var dt = Math.sin(Date.now()/data.period);
    client.mapPixels(function(led){
      var x = led.point[0];
      var v = Math.sin((x+1+dt*2*Math.PI)*Math.PI/4);
      var c = chromath.hsv(360*v,1,data.intensity);
      return c.toRGBArray();
    }, model);
};
