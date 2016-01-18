var interval = null;
var data = {
  color: {
    r: 255,
    g: 255,
    b: 255,
  },
  pattern: null,
};

module.exports = function(model,client){
  return {
    update: function(d){
      // only allow updating the color field for now
      data.color = d.color;
      //data = d;
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
    stop: function(){
      return run(null, function(m,c){
        c.mapParticles([],m);
      }, model, client);
    },
  };
}

function run(name, fn, model, client){
  data.pattern = name;
  clearInterval(interval);
  interval = setInterval(fn, 10, model, client, data);
}
