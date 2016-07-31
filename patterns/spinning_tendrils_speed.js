var OPC = require('../opc');
var chromath = require('chromath');
var numParticles = 40;

function draw(model, client, data) {

    var time = 0.001 * new Date().getTime();
    var particles = [];
    var theta = Date.now()/data.period*6;

    for (var i = 0; i < numParticles; i++) {
        var s = 1;
        var x = 1.0 - (theta+0.06*i)%2.0;
        var y = 0.5-i/numParticles;
        var c = chromath
          .hsv((theta*0.01*360)%360,1,data.intensity)
          .toRGBArray();
        particles[i] = {
            point: [x, 0, y],
            intensity: 0.2 * s,
            falloff: 180,
            color: c,
        };
    }

    client.mapParticles(particles, model);
};

module.exports = {
  features: {color: false},
  draw: draw,
};
