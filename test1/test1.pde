int sqwidth = 50;
color[] colors;
float noiseScale = 0.003;
float incrementStep = 0.2;

void setup()
{
  size(500,500);
  noStroke();
  fill(255,102);
  
  int nsquares = floor(height*width/(sq(sqwidth)));
  colors = new color[nsquares];
  println("computed " + nsquares + " squares");
  colorMode(HSB, 100);
  for (int i = 0; i < colors.length; i++){
    int x = (i*sqwidth% width);
    int y = floor(i*sqwidth/width)*sqwidth;
    int h = floor(noise(x*noiseScale,y*noiseScale)*100);
    colors[i] = color(h,100,100);
  }
}

void incrementColors(float step){
  for (int i = 0; i < colors.length; i++){
    color c = colors[i];
    // add random accelleration to hue stepping
    colors[i] = color((hue(c)+step)%100,saturation(c),brightness(c));
  }
}

void draw() {
  background(255);
  incrementColors(incrementStep);
  for (int i = 0; i < colors.length; i++){
    int px = (i*sqwidth% width);
    int py = floor(i*sqwidth/width)*sqwidth;
    fill(colors[i]);
    rect(px,py,sqwidth,sqwidth);
  }
  
  
  
}