var OPC = require('../opc');
var chromath = require('chromath');
var numParticles = 40;

function draw(model, client, data) {

    //var dt = (Date.now()%data.period)/data.period;
    var time = Date.now()/data.period*60;
    var particles = [];

    for (var i = 0; i < numParticles; i++) {
        var s = 1; //i / numParticles;
        var theta = (0.001*Date.now()) + 0.06 * i;
        var x = 1.0 - theta%2.0;  // constant speed
        var y = 0.5-i/numParticles;
        var c = chromath.hsv((time)%360,1,data.intensity).toRGBArray();
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
