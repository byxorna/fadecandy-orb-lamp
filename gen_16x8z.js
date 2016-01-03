/*
 * Model creation script for a 16x8 grid made of zig-zag 8x8 grids.
 *
 */

var model = []
var scale = 1/8.0; // keep the points bounded between -1.0 and 1.0
//var scale = -1 / 8.0;

/*

Z=7
     
^  _ Y=0
|  /|
| /
|/
0------> X=15

*/

function grid8x8(index, x, z) {
  // Instance of a zig-zag 8x8 grid with upper-left corner at (x, z)
  for (var v = 0; v < 8; v++) {
    for (var u = 0; u < 8; u++) {
      var px = x+v;
      // if odd
      //var pz = (v & 1) ? z-(x+7-u) : z-(x+u);
      var pz = (v & 1) ? z-7+u : z-u;
      model[index++] = {
        point: [  px * scale, 0, pz * scale ]
      };
    }
  }
}

var index = 0;
grid8x8(0, -7.5, 3.5);
grid8x8(64, 0.5, 3.5);

console.log(JSON.stringify(model));
