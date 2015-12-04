/*
This generates a line that rotates around and constantly changes color
*/

OPC opc;
float hue;
float prevRasterPos;


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

void draw() {
  long now = millis();
  float speed = 0.09; //wind speed, reasonable is 0.09
  float bandWidth = 10;
  float hueStep = 10.0;

  float rasterPos = now*speed % width;
  if (rasterPos < prevRasterPos){
    hue += hueStep;
  }
  prevRasterPos = rasterPos;


  loadPixels();
  for (int x=0; x < width; x++) {
    float h;
    if (x<rasterPos){
      h = (hue+hueStep*constrain(1.0-x/(rasterPos+bandWidth),0.0,1.0)) % 100.0;
    }else{
      h = hue % 100.0;
    }
    for (int y=0; y < height; y++) {
      float s = 100;
      float b = 100;
      color c = color(h,s,b);
      pixels[x + width*y] = c;
    }
  }
  
  updatePixels();
}

