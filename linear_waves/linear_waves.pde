/*
This generates a waves that roll around a globe R->L
*/

OPC opc;
float dx, dy;


void setup()
{
  size(128,128);
  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "127.0.0.1", 7890);
 
   // setup a grid
  int nPixels = 36;
  int nPixelsPerRow = floor(sqrt(nPixels));
  int spacing = floor(height/(1+nPixelsPerRow));
  int marginL = spacing;
  int marginT = spacing;
  
  for (int i = 0; i < nPixels; i++){
    opc.led(i, marginL + (i+1)%nPixelsPerRow*int(spacing), marginT + ((i/nPixelsPerRow)%nPixelsPerRow)*int(spacing));
  }

  // Make the status LED quiet
  opc.setStatusLed(false);
  
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
  float speed = 0.004; //wind speed, reasonable is 0.002
  float angle = PI; // PI=right, PI/2=up
  float hue = now  * speed;
  float bandWidth = 4;
  dx += cos(angle) ;
  dy += sin(angle) ;
  loadPixels();
  for (int x=0; x < width; x++) {
    float h = (hue+x/bandWidth) % 100.0;
    for (int y=0; y < height; y++) {
      float s = 100;
      float b = 100;
      color c = color(h,s,b);
      pixels[x + width*y] = c;
    }
  }
  updatePixels();
}

