int sqwidth = 50;
color[] colors;
float noiseScale = 0.02;
float accelScale = 0.001;
float incrementStep = 0.5;

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
    int r = floor(noise(x*noiseScale,y*noiseScale)*100);
    colors[i] = color(r,100,100);
  }
}

void incrementColors(float step){
  for (int i = 0; i < colors.length; i++){
    color c = colors[i];
    // add random accelleration to hue stepping
    // to make the "origin" point look like it moves around with time
    int x = (i*sqwidth% width);
    int y = floor(i*sqwidth/width)*sqwidth;
    float stepNoise = noise(x*accelScale, y*accelScale);
    float sn = (stepNoise*100%2) == 0 ? -stepNoise : stepNoise;
    
    colors[i] = color((hue(c)+sn*step)%100,saturation(c),brightness(c));
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