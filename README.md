# fadecandy-orb-lamp
Stuff for a fadecandy+neopixel hack project

# Config

The following env vars override any provided CLI flags

* LAYOUT - layout file (./layout_16x8z.json)
* OPC_HOST - OPC server host (localhost)
* OPC_PORT - OPC server UDP port (7890)
* PORT - http listen port
* PATTERNS_DIRECTORY - directory to pull in pattern functions (./patterns)

# Run

```
$ npm install
...
$ npm start -- -h

> fadecandy-orb-lamp@ start /home/gabe/code/fadecandy-orb-lamp
> node app.js "-h"

Usage: app.js [options]

Options:
  --layout              Layout JSON file describing how LEDs are positioned
                                                [default: "./layout_16x8z.json"]
  --opc-host            OPC host to connect to            [default: "localhost"]
  --opc-port            OPC UDP port                             [default: 7890]
  --port                HTTP port to serve web UI and API on     [default: 3000]
  --patterns-directory  Directory to find all the pattern modules
                                                         [default: "./patterns"]
  --initial-pattern     Start running a given pattern on startup (without .js
                        suffix)
  -h, --help            Show help                                      [boolean]


```

# Deets!

The orb is made of a few parts
* Fadecandy
* Raspberry Pi 2
* USB Wifi Dongle
* Massive 10A power supply
* Clear plastic hamster ball
* Lots of WS2811 LED strips
* Lots of solder and electrical tape

The RPi runs the fadecandy server, as well as the nodejs web UI and control component. Patterns are implemented as a simple node module that exports a `draw(model,client,data)` function. User supplied data can be passed into each draw function via `data`, client is the OCP client for drawing on the orb, and `model` is the layout model for how the pixels exist in space.

# Demo Time!

## GIFs and pics

For images of assembly, check out [all these binary blobs in git!](https://github.com/byxorna/fadecandy-orb-lamp/tree/master/images)

The central orb with LEDs:

![Orb being assembled](https://67.media.tumblr.com/41319c58181af70b657ea51ce22f9b04/tumblr_o1jj0wGjIN1suda6jo1_1280.gif)

Quick gif of one of the patterns:

![Orb Gif](https://67.media.tumblr.com/bad5ecad38fd4f0ad5e198a64c960325/tumblr_o3cfvjADXQ1suda6jo1_r1_400.gif)

Example of the web UI included. It provides control over what pattern is running, and can provide some user control over base colors used, animation period, intensity, and can shutdown or restart the lamp.

![Web UI](https://raw.githubusercontent.com/byxorna/fadecandy-orb-lamp/master/images/Screenshot_20160703-102027.png)


## Videos

Click each thumbnail to see the video!

[![Orb Lamp Video](http://img.youtube.com/vi/iKaMXoh2JyU/0.jpg)](http://www.youtube.com/watch?v=iKaMXoh2JyU)

[![Orb Lamp Video](http://img.youtube.com/vi/lEtLCduEgj4/0.jpg)](http://www.youtube.com/watch?v=lEtLCduEgj4)

[![Orb Lamp Video](http://img.youtube.com/vi/9Epn-c5ENxA/0.jpg)](http://www.youtube.com/watch?v=9Epn-c5ENxA)

[![Orb Lamp Video](http://img.youtube.com/vi/KWW0QkA8xVI/0.jpg)](http://www.youtube.com/watch?v=KWW0QkA8xVI)

[![Orb Lamp Video](http://img.youtube.com/vi/ZDA5kHAtc8I/0.jpg)](http://www.youtube.com/watch?v=ZDA5kHAtc8I)

[![Orb Lamp Video](http://img.youtube.com/vi/154zMtVKbKg/0.jpg)](http://www.youtube.com/watch?v=154zMtVKbKg)


