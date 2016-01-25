/**
  Split orb in 50/50, interpolate between complement colors as it rotates
**/
var OPC = require('../opc');
var chromath = require('chromath');

function betweenwin(x,start,stop){
  if (start<stop){
    return x > start && x <= stop;
  } else {
    return x < stop || x >= start;
  }
}

module.exports = function draw(model, client, data) {
    var c1 = chromath.rgb( {r:data.red,g:data.green,b:data.blue});
    var c2 = chromath.complement(c1);

    client.mapPixels(function(led){
      var x = led.point[0];
      var p = (Math.sin(Math.abs(x)+Date.now()/data.period*10.0)+1.0)/2.0;
      return chromath.towards(c1, c2, p).toRGBArray();
    }, model);
};
