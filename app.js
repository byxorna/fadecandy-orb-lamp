var argv = require('yargs')
		.usage('Usage: $0 [options]')
    .nargs('layout', 1)
			.describe('layout', 'Layout JSON file describing how LEDs are positioned')
			.default('layout','./layout_16x8z.json')
    .nargs('opc-host', 1)
			.describe('opc-host', 'OPC host to connect to')
			.default('opc-host','localhost')
    .nargs('opc-port', 1)
			.describe('opc-port', 'OPC UDP port')
			.default('opc-port',7890)
    .nargs('port', 1)
			.describe('port', 'HTTP port to serve web UI and API on')
			.default('port',3000)
    .nargs('patterns-directory', 1)
			.describe('patterns-directory', 'Directory to find all the pattern modules')
			.default('patterns-directory','./patterns')
    .nargs('initial-pattern', 1)
			.describe('initial-pattern', 'Start running a given pattern on startup (without .js suffix)')
    .help('h')
    .alias('h', 'help')
    .argv;

var layoutFile  = process.env['LAYOUT'] || argv.layout,
    opcHost     = process.env['OPC_HOST'] || argv['opc-host'],
    opcPort     = process.env['OPC_PORT'] || argv['opc-port'],
    port        = process.env['PORT'] || argv.port,
    patternsDir = process.env['PATTERNS_DIRECTORY'] || argv['patterns-directory'];

// draw functions like {'waves': function(opc,model,client,data)}
var patterns = {};

var OPC = new require('./opc');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var childprocess = require('child_process');

console.log("Loading layout " + layoutFile);
var model = OPC.loadModel(layoutFile);
var client = new OPC(opcHost, opcPort);
var chromath = require('chromath');
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

if (argv['initial-pattern']) {
  console.log("Running initial pattern passed via CLI: " + argv['initial-pattern']);
  orb.run(argv['initial-pattern'], patterns[argv['initial-pattern']] );
}

app.use(require('morgan')('combined'));
app.use(express.static('public'));
app.set('view engine', 'jade');
// to support JSON-encoded bodies
app.use( bodyParser.json() );
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  var d = orb.data();
  // this is useful for the webui but not provided in the orbs internal
  // representation.
  d.color_hex = '#'+chromath.rgb2hex(d.red,d.green,d.blue).join('');
  res.render('index', {
    title: 'Fadecandy Orb',
    patterns: Object.keys(patterns),
    data: d,
  });
});

app.get('/shutdown', function(req, res){
  console.log("Attempting shutdown");
  childprocess.exec('shutdown -h now', function(e, stderr, stdout){
    if (e){
      console.log("Shutdown got error: " + e);
    }
    console.log("Stderr: " + stderr + "Stdout: " + stdout);
  });
  res.redirect('/');
});

app.get('/restart', function(req, res){
  console.log("Attempting restart");
  childprocess.exec('shutdown -r now', function(e, stderr, stdout){
    if (e){
      console.log("Reboot got error: " + e);
    }
    console.log("Stderr: " + stderr + "Stdout: " + stdout);
  });
  res.redirect('/');
});


app.post('/', function(req, res){
  console.log("Got post of ", req.body);
  res.redirect('/');
});

app.get('/start', function (req, res) {
  var pattern = req.query.pattern;
  if (!patterns[pattern]) {
    throw "No pattern found named " + pattern;
  }
  console.log("Running pattern " + pattern);
  orb.run(pattern, patterns[pattern] );
  res.send({message: "Running " + pattern, data: orb.data() });
});

app.get('/pause', function (req, res) {
  console.log("Pausing");
  orb.pause();
  res.send({message:"Paused", data: orb.data() });
});

app.get('/unpause', function (req, res) {
  console.log("Unpausing");
  orb.unpause();
  res.send({message:"Unpaused", data: orb.data() });
});

app.get('/stop', function (req, res) {
  console.log("Stopping lightshow");
  orb.stop();
  res.send({message:"Stopped", data: orb.data() });
});

app.post('/update', function(req, res){
  console.log("Got updated settings: ", req.body);
  var d = req.body;
  // only allow color_hex and period from client
  var c = new chromath(d.color_hex).toRGBArray();
  console.log("got color c ",c);
  var cleandata = {
    red: c[0],
    green: c[1],
    blue: c[2],
    period: d.period|0,
    intensity: d.intensity*1.0,
  };
  orb.update(cleandata);
  res.send({ message:"Settings updated", data: orb.data() });
});

// handle errors last
app.use(function(err, req, res, next) {
  console.error("Error:",err);
  res.status(500);
  var msg = err.message || err;
  res.send({ error: msg });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
