#!/usr/bin/env node
// this is aped from particle_trail.js: https://github.com/scanlime/fadecandy/blob/master/examples/node/particle_trail.js

var OPC = new require('./opc');
var model = OPC.loadModel(process.argv[2] || './layout_16x8z.json');
var client = new OPC('localhost', 7890);

function draw() {

    //var time = 0.009 * new Date().getTime();
    var time = 0.001 * new Date().getTime();
    var numParticles = 100;
    //var numParticles = 200;
    var particles = [];

    for (var i = 0; i < numParticles; i++) {
        var s = i / numParticles;

        var radius = 0.2 + 1.5 * s;
        var theta = time + 0.04 * i;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta + 10.0 * Math.sin(theta * 0.15));
        var hue = time * 0.01 + s * 0.2;

        particles[i] = {
            point: [x, 0, y],
            intensity: 0.2 * s,
            falloff: 60,
            //color: OPC.hsv(hue, 0.5, 0.8)
            color: OPC.hsv(hue, 1.0,1.0)
        };
    }

    client.mapParticles(particles, model);
}

setInterval(draw, 10);
