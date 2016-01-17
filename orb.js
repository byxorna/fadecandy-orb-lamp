var interval = null;
module.exports = function(model,client){
  return {
    run: function(fn, data){
      return run(fn,model,client,data);
    },
    pause: function(){
      return clearInterval(interval);
    },
    stop: function(){
      return run(function(m,c){
        c.mapParticles([],m);
      }, model, client);
    },
  };
}

function run(fn, model, client, data){
  clearInterval(interval);
  interval = setInterval(fn, 10, model, client, data);
}
