/*
This generates a line that rotates around and constantly changes color
*/

OPC opc;
float hue = 0;
float hueStep = 5.0;
float prevRasterPos = -1.0;


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