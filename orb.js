var interval = null;
module.exports = function(model,client){
  return {
    run: function(fn){
      return run(fn,model,client);
    },
    stop: function(){
      return clearInterval(interval);
    },
  };
}

function run(fn, model, client){
  clearInterval(interval);
  //console.log("Running",model,client);
  interval = setInterval(fn, 10, model, client);
}
