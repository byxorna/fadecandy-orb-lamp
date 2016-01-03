/*
 * Model creation script for a 16x8 grid made of zig-zag 8x8 grids.
 *
 */

var model = []
var scale = 1.0;
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
for (var i = 0; i<2; i++){
  grid8x8(index, i*8, 7);
  index += 64;
}

/*
for (var i = 0 ; i < model.length; i++){
  console.log("index " + i + ": ", model[i]);
}
*/
console.log(JSON.stringify(model));
