/*
 * Model creation script for a 16x8 grid made of zig-zag 8x8 grids.
 *
 */

var model = []
var scale = 1.0;
var centerX = 0;
var centerY = 0;
/*
var scale = -1 / 8.0;
var centerX = 31 / 2.0;
var centerY = 15 / 2.0;
*/

//TODO: this grid goes left to right, but should go top to bottom. change it
function grid8x8(index, x, y) {
    // Instance of a zig-zag 8x8 grid with upper-left corner at (x, y)
    for (var v = 0; v < 8; v++) {
        for (var u = 0; u < 8; u++) {
            var px = (v & 1) ? (x+7-u) : (x+u);
            var py = y + v;
            model[index++] = {
                point: [  (px - centerX) * scale, 0, (py - centerY) * scale ]
            };
            console.log("index " + (index-1) + ": ", model[index-1]);
        }
    }
}

var index = 0;
for (var i = 0; i<2; i++){
  grid8x8(index, i*8, 0);
  index += 64;
}

console.log(JSON.stringify(model));
