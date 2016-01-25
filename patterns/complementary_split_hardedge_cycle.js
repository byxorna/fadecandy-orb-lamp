/**
  Split orb in half with color and complement
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
    var colormod = (Date.now() % (data.period*7))/(data.period*7);
    var spinmod = (Date.now() % data.period)/(data.period);
    var c1 = chromath.hsv(360*colormod,1,1);
    var c2 = chromath.complement(c1);
    var c1a = c1.toRGBArray(),
        c2a = c2.toRGBArray();
    // the X bounds of our model
    var xmin = -1.0;
    var xmax = 1.0;
    var xwin_start = (xmax-xmin)*spinmod,
        xwin_stop = (((xmax-xmin)*spinmod+1.0) % (xmax-xmin));

    client.mapPixels(function(led){
      var adjx = led.point[0]+1.0;
      if (betweenwin(adjx, xwin_start, xwin_stop)){
        return c1a;
      } else {
        return c2a;
      }
    }, model);
};
