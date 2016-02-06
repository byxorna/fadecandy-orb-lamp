var OPC = require('../opc');
var chromath = require('chromath');
var windspeed = 0.01;
var dx = 0.0, dy = 0.0;

var PerlinGenerator = require("proc-noise");
var Perlin = new PerlinGenerator();

module.exports = function draw(model, client, data) {
    var now = Date.now()/(data.period*4);

    var angle = Math.sin(now); // angle the wind blows the mist at
    var z = now;
    var hue = Date.now() * 0.005;

    dx += Math.cos(angle) * windspeed;
    dy += Math.sin(angle) * windspeed;

    client.mapPixels(function(px){
			var x = px.point[0];
      var y = px.point[2];
      var n = Perlin.noise(dx + x, dy + y, z);
			var m = Perlin.noise(dx + x, dy + y, z+10);
			var h = (hue + 360.0 * m) % 360.0;
      var s = 1.0-0.5*n;
			var v = 1.0;
      return chromath.hsv(h, s, v).toRGBArray();
    }, model);
};
