var OPC = require('../opc');
var chromath = require('chromath');
var pct_bounds = [.18,.70];

function draw(model, client, data) {
    var dt      = (Date.now() % data.period) / data.period;
    var midgap  = pct_bounds[1] - pct_bounds[0];
    var low_gap = pct_bounds[0] / (pct_bounds[0] + 1 - pct_bounds[1]) * midgap + pct_bounds[0];
    var hi_gap  = pct_bounds[1] / (pct_bounds[0] + 1 - pct_bounds[1]) * midgap + pct_bounds[0];
    client.mapPixels(function(led){
      var x = led.point[0];
      // pct is 0..1
      var pct = ((x+1.0+2*dt)%2.0)/2.0;
      if (pct >= pct_bounds[0] && pct <= low_gap) {
        // reverse percent at boundary to simulate a wrap in HSV space
        // while skipping colors we dont care about
        var l = pct_bounds[0] - (pct-pct_bounds[0])/(low_gap-pct_bounds[0])*(pct_bounds[0]);
        console.log("pct " + pct + " wrapping down to " + l);
        pct = l;
      } else if (pct >= hi_gap && pct <= pct_bounds[1]) {
        var l = pct_bounds[1] + (pct_bounds[1]-pct)/(pct_bounds[1]-hi_gap)*(pct_bounds[1]);
        console.log("pct " + pct + " wrapping up to " + l);
        pct = l;
      }
      var hue = 360*pct;
      var c = chromath.hsv(hue, 1, data.intensity);
      return c.toRGBArray();
    }, model);
};

module.exports = {
  draw: draw,
  features:{color:false},
};
