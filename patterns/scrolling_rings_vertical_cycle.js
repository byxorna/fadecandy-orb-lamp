var OPC = require('../opc');
var chromath = require('chromath');
var window_width = 0.55;

function draw(model, client, data) {
    //var dt = (Date.now()%data.period)/data.period;
    var dt = (Math.sin(Date.now()/data.period*8) + 1)/2; //0..2
    var slowdt = (Date.now()%(data.period*4))/(data.period*4);
    client.mapPixels(function(led){
      var y = led.point[2];
      var upperwindow = dt+window_width/2-.5;
      var lowerwindow = dt-window_width/2-.5;
      var intensityu = Math.max(0, Math.min((y-lowerwindow)/window_width*2, 1.0));
      var intensityl = Math.max(0, Math.min((upperwindow-y)/window_width*2, 1.0));
      var c = chromath.hsv(360*slowdt,1,Math.min(intensityu,intensityl)*data.intensity);
      return c.toRGBArray();
    }, model);
};

module.exports = {
  features: {color: false},
  draw: draw,
};
