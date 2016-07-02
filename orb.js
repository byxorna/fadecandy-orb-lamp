var interval = null;
var activeFunction = null;
var activeFunctionName = null;
// user controllable data
var data = {
  red: 255,
  blue: 255,
  green: 0,
  period: 10000,
  intensity: 1.0,
  pattern: null,
};

module.exports = function(model,client){
  return {
    update: function(d){
      // only allow updating the color field for now
      data.red = Math.min(Math.max(d.red,0),255);
      data.blue = Math.min(Math.max(d.blue,0),255);
      data.green = Math.min(Math.max(d.green,0),255);
      data.period = d.period;
      data.intensity = Math.min(Math.max(d.intensity,0.0),1.0);
    },
    data: function(){
      return data;
    },
    isRunning: function(){ return interval != null; },
    run: function(name, fn){
      return run(name,fn,model,client,data);
    },
    pause: function(){
      return clearInterval(interval);
    },
    unpause: function(){
      if (activeFunction) {
        return run(activeFunctionName, activeFunction, model, client, data);
      }
    },
    stop: function(){
      return run(null, function(m,c){
        c.mapParticles([],m);
      }, model, client);
    },
  };
}

function run(name, fn, model, client){
  data.pattern = name;
  activeFunctionName = name;
  activeFunction = fn;
  clearInterval(interval);
  interval = setInterval(fn, 10, model, client, data);
}
