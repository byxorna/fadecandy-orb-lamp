/*
This generates a random fractal mist over a grid of pixels
*/

OPC opc;
float dx, dy;


void setup()
{
  size(128,128);
  // setup a grid
  int nPixels = 64;
  int nPixelsPerRow = floor(sqrt(nPixels));
  int spacing = floor(height/(1+nPixelsPerRow));
  int marginL = spacing;
  int marginT = spacing;

  
  // Connect to the local instance of fcserver. You can change this line to connect to another computer's fcserver
  opc = new OPC(this, "127.0.0.1", 7890);
  
  for (int i = 0; i < nPixels; i++){
    opc.led(i, marginL + (i+1)%nPixelsPerRow*int(spacing), marginT + ((i/nPixelsPerRow)%nPixelsPerRow)*int(spacing));
  }
  // Make the status LED quiet
  opc.setStatusLed(false);
  
  colorMode(HSB, 100);
}

float noiseScale=0.02;

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
  float speed = 0.002; //wind speed, reasonable is 0.002
  float angle = sin(now * .0001); // angle the wind blows the mist at
  float z = now * 0.00008;
  float hue = now  * 0.005; // how the hue cycles, reasonable is 0.01
  //float scale = 0.005;
  float scale = 0.003; // how large the fractal globs are

  dx += cos(angle) * speed;
  dy += sin(angle) * speed;
  loadPixels();
  for (int x=0; x < width/2; x++) {
    for (int y=0; y < height; y++) {
     
      float n = fractalNoise(dx + x*scale, dy + y*scale, z);
      //float n = fractalNoise(dx + x*scale, dy + y*scale, z) - 0.75;

      float m = fractalNoise(dx + x*scale, dy + y*scale, z + 10.0);

      float h = (hue + 100.0 * m) % 100.0;
      float s = 100-50*n;  // vary intensity from 50% to 100%, more or less
      //float s = 100 - 100 * constrain(pow(3.0 * n, 3.5), 0.0, 0.5); // less bright, more reasonable
      //float s = 100;  // eye searing
      float b = 100 * constrain(pow(3.0 * n, 1.5), 0.0, 0.9);
      color c = color(h,s,b);
      // reflect the image to the other half
      int lpx = x + height*y;
      int rpx = (width*height-1) - x - height*(height-y-1);
      pixels[lpx] = c;
      pixels[rpx] = c;
    }
  }
  updatePixels();
}