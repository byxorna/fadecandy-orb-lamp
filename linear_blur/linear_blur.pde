/*
This generates a line that rotates around and constantly changes color
*/

OPC opc;
float hue = 0;
float hueStep = 5.0;
float prevRasterPos = -1.0;


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
  noStroke();
  float speed = 0.1;
  long now = millis();
  float rasterPos = now*speed % width;
  if (rasterPos < prevRasterPos){
    hue = (hue+hueStep)%100;
  }
  fill((hue+hueStep)%100,100,100);
  rect(0,0, rasterPos, height);
  fill(hue, 100, 100);
  rect(rasterPos,0,width-rasterPos,height);
  prevRasterPos = rasterPos;
}