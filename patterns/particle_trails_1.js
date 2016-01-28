// this is aped from particle_trail.js: https://github.com/scanlime/fadecandy/blob/master/examples/node/particle_trail.js

var OPC = require('../opc');
var chromath = require('chromath');

module.exports = function draw(model, client, data) {

    var dt = (Date.now()%data.period)/data.period;
    var time = 0.001 * new Date().getTime();
    var numParticles = 100;
    var particles = [];

    for (var i = 0; i < numParticles; i++) {
        var s = i / numParticles;
        //var radius = 0.2 + 1.5 * s;
        var theta = time + 0.04 * i;
        //var x = radius * Math.cos(theta);
        //var y = radius * Math.sin(theta + 10.0 * Math.sin(theta * 0.15));
        var x = Math.cos(theta);
        var y = 0.5* Math.sin(theta + 10.0 * Math.sin(theta * 0.15));
        //var hue = time * 0.01 + s * 0.2;
        var c = chromath.hsv(dt*360,1,1).toRGBArray();
        particles[i] = {
            point: [x, 0, y],
            intensity: 0.2 * s,
            falloff: 60,
            //color: OPC.hsv(hue, 0.5, 0.8)
            color: c,
        };
    }

    client.mapParticles(particles, model);
};

