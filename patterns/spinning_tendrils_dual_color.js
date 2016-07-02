var OPC = require('../opc');
var chromath = require('chromath');
var numParticles = 40;

module.exports = function draw(model, client, data) {

    var time = Date.now()/data.period*60;
    var particles = [];

    for (var d = 0; d < 2 ; d++){
      for (var i = 0; i < numParticles; i++) {
          var s = 1;
          var theta = (0.001*Date.now()) + 0.02 * i;
          if  (d%2 == 0) {
            // one moves a bit slower
            var x = 1.0 - (theta*0.8)%2.0;
          } else {
            var x = -1.0 + theta%2.0;
          }
          var y = 0.5-i/numParticles;
          var c = chromath
            .hsv((time+180*d)%360,1,data.intensity)
            .toRGBArray();
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

