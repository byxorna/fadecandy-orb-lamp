/**
  Split orb in half with color and complement
**/
var OPC = require('../opc');
var underscore = require('underscore');
var chromath = require('chromath');

function betweenwin(x,start,stop){
  if (start<stop){
    return x > start && x <= stop;
  } else {
    return x < stop || x >= start;
  }
}

module.exports = function draw(model, client, data) {
    var c = {r:data.red,g:data.green,b:data.blue};
    var c1 = chromath.rgb(c);
    var c2 = chromath.complement(c);
    var c1a = c1.toRGBArray(),
        c2a = c2.toRGBArray();
    // the X bounds of our model
    var xmin = -1.0;
    var xmax = 1.0;
    var spinpct = (Date.now() % data.period)/data.period,
        xwin_start = (xmax-xmin)*spinpct,
        xwin_stop = (((xmax-xmin)*spinpct+1.0) % (xmax-xmin));

    client.mapPixels(function(led){
      var adjx = led.point[0]+1.0;
      if (betweenwin(adjx, xwin_start, xwin_stop)){
        return c1a;
      } else {
        return c2a;
      }
    }, model);
};
