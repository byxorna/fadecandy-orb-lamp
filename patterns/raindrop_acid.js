var OPC = require('../opc');
var chromath = require('chromath');
var numDrops = 50;
var falloff = 100; // idk what this does
var particles = [];

function draw(model, client, data) {
    var p = data.period/8;
    var dt = (Date.now()%p)/p;
    var c = chromath.hsv(360*dt,1,data.intensity).toRGBArray();
    for (var i = 0; i < numDrops; i++){
      if (particles[i] == null || particles[i].intensity < 0.1 || particles[i].falloff < 1){
        // generate a new particle
        var x = Math.random()*2.0-1.0,
            y = Math.random()*2.0-1.0;
        particles[i] = {
          point: [x,0,y],
          intensity: Math.max(Math.random()*2,0.75),
          falloff: falloff,
          color: c
        };
      } else {
        particles[i].intensity -= (20/data.period);
      }
    }
    client.mapParticles(particles, model);
};

module.exports = {
  features: {color: false},
  draw: draw,
};
