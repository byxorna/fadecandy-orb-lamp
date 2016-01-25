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

    var dt = Date.now()/data.period*10.0;
    client.mapPixels(function(led){
      var x = led.point[0];
      var p = (Math.sin(dt)+1.0)%2.0,
          q = (Math.sin(dt-Math.PI)+1.0)%2.0;
      if(betweenwin(x,p,q)){
      return chromath.towards(c1, c2, Math.abs(x/(q-p))%1.0).toRGBArray();
      }else{
      return chromath.towards(c1, c2, Math.abs(x/(p-q))%1.0).toRGBArray();
      }
    }, model);
};
