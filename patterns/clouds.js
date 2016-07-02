var OPC = require('../opc');
var chromath = require('chromath');
var dx_color = 0.0, dy_color = 0.0;
var dx_wind = 0.0, dy_wind = 0.0;

var PerlinGenerator = require("proc-noise");
var Perlin = new PerlinGenerator();
Perlin.noiseDetail(2, 0.5);

module.exports = function draw(model, client, data) {
    var now = Date.now()/data.period;

    var angle = Math.sin(now); // angle the wind blows the mist at
    var hue = Date.now() * 0.005;

    dx_color += Math.cos(hue)*.001;// * (40/data.period);
    dy_color += Math.sin(hue)*.001;// * (80/data.period);

    dx_wind += Math.cos(angle) * (40/data.period);
    dy_wind += Math.sin(angle) * (80/data.period);

    client.mapPixels(function(px){
      var x = px.point[0];
      var y = px.point[2];
      var n = Perlin.noise(dx_color + x, dy_color + y*2, now);
      var m = Perlin.noise(dx_wind + x, dy_wind + y);
      var h = (hue + 360.0 * n) % 360.0;
      //var s = .75-m;
      var s = 1.0-0.5*n;
      var v = (.5+m*m)*data.intensity;
      return chromath.hsv(h, s, v).toRGBArray();
    }, model);
};
