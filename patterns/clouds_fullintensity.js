var OPC = require('../opc');
var chromath = require('chromath');
var windspeed = 0.01;
var dx = 0.0, dy = 0.0;

var PerlinGenerator = require("proc-noise");
var Perlin = new PerlinGenerator();

function draw(model, client, data) {
    var now = Date.now()/data.period;

    var angle = Math.sin(now); // angle the wind blows the mist at
    var hue = Date.now() * 0.005;

    dx += Math.cos(angle) * (40/data.period);
    dy += Math.sin(angle) * (80/data.period);

    client.mapPixels(function(px){
      var x = px.point[0];
      var y = px.point[2];
      var n = Perlin.noise(dx + x, dy + y*2, now);
      //var m = Perlin.noise(dx + x, dy + y*2, now);
      var h = (hue + 360.0 * n) % 360.0;
      var s = 1.0-0.5*n;
      var v = data.intensity;
      return chromath.hsv(h, s, v).toRGBArray();
    }, model);
};

module.exports = {
  draw: draw,
  features:{color:false},
};
