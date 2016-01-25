/**
  Wrap orb in color, then move to complement with interpolation
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
    var spinmod = (Math.sin(Date.now()/data.period)+1.0)/2.0;
    var c1 = chromath.rgb( {r:data.red,g:data.green,b:data.blue});
    var c2 = chromath.complement(c1);

    client.mapPixels(function(led){
      var x = led.point[0];
      var p = (Math.sin(x+Date.now()/data.period)+1.0)/2.0;
      //var p = Math.sin(x+Date.now()/data.period);
      return chromath.towards(c2, c1, p).toRGBArray();
    }, model);
};
