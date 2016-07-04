# fadecandy-orb-lamp
Stuff for a fadecandy+neopixel hack project

# Config

* LAYOUT - layout file (./layout_16x8z.json)
* OPC_HOST - OPC server host (localhost)
* OPC_PORT - OPC server UDP port (7890)
* PORT - http listen port
* PATTERNS_DIRECTORY - directory to pull in pattern functions (./patterns)

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

The central orb with LEDs:
![Orb being assembled](https://67.media.tumblr.com/41319c58181af70b657ea51ce22f9b04/tumblr_o1jj0wGjIN1suda6jo1_1280.gif)

Quick gif of one of the patterns:
![Orb Gif](https://67.media.tumblr.com/bad5ecad38fd4f0ad5e198a64c960325/tumblr_o3cfvjADXQ1suda6jo1_r1_400.gif)

Example of the web UI included. It provides control over what pattern is running, and can provide some user control over base colors used, animation period, intensity, and can shutdown or restart the lamp.
![Web UI](https://raw.githubusercontent.com/byxorna/fadecandy-orb-lamp/master/images/Screenshot_20160703-102027.png)

<iframe width="560" height="315" src="https://www.youtube.com/embed/iKaMXoh2JyU" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/lEtLCduEgj4" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/9Epn-c5ENxA" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/KWW0QkA8xVI" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZDA5kHAtc8I" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/154zMtVKbKg" frameborder="0" allowfullscreen></iframe>
