var OPC = require('../opc');
var chromath = require('chromath');
var numParticles = 20;
var particles = [];
// random disorient-y colors for each raindrop
var colors_hue = [ 26, 0, 299, 326 ];

for (var i = 0; i < numParticles; i++){
  // create some particles
  particles.push({
    point: [0,0,0],
    intensity: 0,
    falloff: 30,
    color: [0,0,0],
    delayTimer: Math.random()*400, // initial cycle delay until it begins to bloom
  });
}

function randomPoint(){
  // random points are bounded by the layout
  // x: -1..1
  // y: 0..0
  // z: -.5...5
  return [
    2*(Math.random() - 0.5),
    0, //2*(Math.random() - 0.5),
    1*(Math.random() - 0.5),
  ];
}

function draw(model, client, data) {
    var dp = data.period * 4;
    var hue_progression = (Date.now() % dp)/dp;

    var particleLifetimeCycles = 50+.25*Math.ceil(data.period/150); // 30 = .3 seconds at 10ms cycle
    var initialDelayCycles = 50+.25*Math.ceil(data.period/33); // 300 = 3 seconds at 10ms cycle

    for (var i = 0; i < numParticles; i++){
      var p = particles[i];
      var c = chromath
       .hsv(colors_hue[Math.floor(Math.random()*colors_hue.length)],1,1)
       .darken(1.0-data.intensity)
       .toRGBArray();
     p.color = c;
      if (p.delayTimer) {
        p.delayTimer -= 1;
        if (p.delayTimer <= 0) {
          // delay over, lets start blooming
          // distribute lifetime a bit (25% variance)
          p.lifeTimer = particleLifetimeCycles;// + particleLifetimeCycles*Math.random()*0.25;
          p.point = randomPoint();
          p.delayTimer = null;
        }
      }

      if (p.lifeTimer) {
        // change the intensity over the lifetime of the particle
        p.intensity = -1.2*Math.sin(p.lifeTimer * 2 * Math.PI / particleLifetimeCycles);
        //p.intensity = -0.5*Math.cos(p.lifeTimer * 2 * Math.PI / particleLifetimeCycles) + 0.5;
        //TODO move the point?

        p.lifeTimer -= 1;
        if (p.lifeTimer <= 0) {
          p.delayTimer = initialDelayCycles + initialDelayCycles*Math.random();
          p.lifeTimer = null;
        }
      }

      //console.log(p.point,p.intensity,p.lifeTimer,p.delayTimer);
    }

    client.mapParticles(particles, model);

};

module.exports = {
  features: {color: false},
  draw: draw,
};
