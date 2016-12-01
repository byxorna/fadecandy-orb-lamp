var OPC = require('../opc');
var chromath = require('chromath');
var numParticles = 40;

function draw(model, client, data) {
    var c1 = chromath.hsv(293, .6, data.intensity).toRGBArray(); //pink
    var c2 = chromath.hsv(30, 1, data.intensity).toRGBArray(); //orange

    var time = Date.now()/data.period*60;
    var particles = [];

    for (var d = 0; d < 2 ; d++){
      for (var i = 0; i < numParticles; i++) {
          var s = 1;
          var theta = 10*Date.now()/(data.period) + 0.02 * i;
          if  (d%2 == 0) {
            // one moves a bit slower
            var x = 1.0 - (theta*0.8)%2.0;
            var c = c1;
          } else {
            var x = -1.0 + theta%2.0;
            var c = c2;
          }
          var y = 0.5-i/numParticles;
          particles[i+d*numParticles] = {
              point: [x, 0, y],
              intensity: 0.2 * s,
              falloff: 300,
              color: c,
          };
      }
    }

    client.mapParticles(particles, model);
};

module.exports = {
  features: {color: false},
  draw: draw,
};
