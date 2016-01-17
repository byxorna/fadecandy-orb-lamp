var layoutFile  = process.env['LAYOUT'] || process.argv[2] || './layout_16x8z.json',
    opcHost     = process.env['OPC_HOST'] || 'localhost',
    opcPort     = process.env['OPC_PORT'] || 7890,
    port        = process.env['PORT'] || 3000,
    patternsDir = process.env['PATTERNS_DIRECTORY'] || './patterns';

// draw functions like {'waves': function(opc,model,client,data)}
var patterns = {};
// global state of the orb.
// any parameters you want passed into draw functions should be in
// here, set by any client.
var data = {
  r: 100,
  g: 75,
  b: 200,
};

var OPC = new require('./opc');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

console.log("Loading layout " + layoutFile);
var model = OPC.loadModel(layoutFile);
var client = new OPC(opcHost, opcPort);
var orb = require('./orb')(model, client);

// load all the patterns available
var patternFiles = fs.readdirSync(patternsDir);
for (var i = 0; i<patternFiles.length; i++){
  var fName = patternsDir + "/" + patternFiles[i];
  if (patternFiles[i].match(/^\w+\.js$/)) {
    var name = patternFiles[i].replace(/\.[^/.]+$/, "");
    console.log("Loading pattern: " + fName + " as " + name);
    patterns[name] = require(fName);
  } else {
    console.log("Ignoring shady file: " + fName);
  }
}

app.use(require('morgan')('combined'));
app.use(express.static('public'));
app.set('view engine', 'jade');
// to support JSON-encoded bodies
app.use( bodyParser.json() );
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.render('index', {
    title: 'Fadecandy Orb',
    patterns: Object.keys(patterns),
    data: data,
  });
});

app.post('/', function(req, res){
  console.log("Got post of ", req.body);
  res.redirect('/');
});

app.post('/start/:pattern', function (req, res) {
  var pattern = req.params.pattern;
  //TODO(gabe): parse any data from request, pass to draw fn
  console.log("Starting show! Have a good trip!", data);
  if (!patterns[pattern]) {
    throw "No pattern found named " + pattern;
  }
  orb.run( patterns[pattern], data);
  res.send({message: "Running " + pattern });
});

app.get('/pause', function (req, res) {
  console.log("Pausing");
  orb.pause();
  res.send({message:"Paused"});
});

app.get('/stop', function (req, res) {
  console.log("Stopping lightshow");
  orb.stop();
  res.send({message:"Stopped"});
});

// handle errors last
app.use(function(err, req, res, next) {
  console.error("Error:",err);
  res.status(500);
  res.send({ error: err });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
