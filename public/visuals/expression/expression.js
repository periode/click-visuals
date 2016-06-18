// this is where we have the main class

var lface;


var rface;

function setup_expression(){
  lface = new Face(createVector(width*0.05, height*0.3));
  rface = new Face(createVector(width*0.55, height*0.3));



}

function draw_expression(){
  drawBackground();

  lface.display();

  rface.display();
}

function drawBackground(){
  background(255);
}
