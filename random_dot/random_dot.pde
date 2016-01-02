OPC opc;
PImage dot;

void setup()
{
  size(256, 128);
  dot = loadImage("dot.png");
  opc = new OPC(this, "127.0.0.1", 7890);
  float spacing = width/16.0;
  opc.ledGrid8x8(0, width/4, height/2, spacing, PI/2, true);
  opc.ledGrid8x8(64, width * 0.75, height/2, spacing, PI/2, true);
}

void draw()
{
  background(0);
  
  // Change the dot size as a function of time, to make it "throb"
  // pulse at 
  float dotSize = height * 0.6 * (1.0 + 0.2 * sin(millis() * 0.0016));

  // Draw it centered at the mouse location
  int x = 0;
  int y = 0;
  image(dot, mouseX - dotSize/2, mouseY - dotSize/2, dotSize, dotSize);
}