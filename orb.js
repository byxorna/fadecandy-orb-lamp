var interval = null;
module.exports = function(model,client){
  return {
    run: function(fn){
      return run(fn,model,client);
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

function run(fn, model, client){
  clearInterval(interval);
  //console.log("Running",model,client);
  interval = setInterval(fn, 10, model, client);
}
