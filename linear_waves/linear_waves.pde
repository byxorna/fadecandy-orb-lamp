/*
This generates a waves that roll around a globe bottom to top
*/

OPC opc;


void setup()
{
  size(256,128);
  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "127.0.0.1", 7890);
 
  float spacing = width/16.0;
  opc.ledGrid8x8(0, width/4, height/2, spacing, PI/2, true);
  opc.ledGrid8x8(64, width * 0.75, height/2, spacing, PI/2, true);
  opc.setStatusLed(true);
  
  colorMode(HSB, 100);
}

// generates some noise between 0.0 and 1.0
float fractalNoise(float x, float y, float z) {
  float r = 0;
  float amp = 1.0;
  for (int octave = 0; octave < 4; octave++) {
    r += noise(x, y, z) * amp;
    amp /= 2;
    x *= 2;
    y *= 2;
    z *= 2;
  }
  return r;
}

void draw() {
  long now = millis();
  float speed = 0.01;
  float hue = now  * speed;
  float bandWidth = 4;

  loadPixels();
  for (int y=0; y < height; y++) {
    float h = (hue+y/bandWidth) % 100.0;
    for (int x=0; x < width; x++) {
      float s = 100;
      float b = 100;
      color c = color(h,s,b);
      pixels[x + width*y] = c;
    }
  }
  updatePixels();
}