var OPC = require('../opc');
var chromath = require('chromath');
var numDrops = 10;
var intensityDecay = 0.02;
var falloff = 100; // idk what this does
var particles = [];

module.exports = function draw(model, client, data) {
    var c = chromath.rgb({r:data.red,g:data.green,b:data.blue}).toRGBArray();
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
        particles[i].intensity -= intensityDecay*(data.period/20000);
      }
    }
    client.mapParticles(particles, model);
};
