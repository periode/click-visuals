// this is where we have the main class

var lface;


var rface;

function setup_expression(){
  lface = new Face(createVector(width*0.05, height*0.3), "her");
  rface = new Face(createVector(width*0.55, height*0.3), "him");
  strokeCap(PROJECT);
}

function draw_expression(){
  drawBackground();

  update();

  lface.display();

  rface.display();
}

function update(){
  lface.update();
  rface.update();
}

function drawBackground(){
  background(0);
  stroke(30);
  for(var i = 0; i < height; i+= 20){
    if(noise(i) > 0.3)
    line(0, i, width, i);
  }

  for(var i = 0; i < width; i+= 20){
    if(noise(i) > 0.3)
      line(i, 0, i, height);
  }
}

function resetFPoints(){
  lface.resetFPoints();
  rface.resetFPoints();
}

function toggleMoveFPoints(){
  lface.toggleMoveFPoints();
  rface.toggleMoveFPoints();
}

function keyTyped(){
  switch (key){
    case "t":
      resetFPoints();
      break;
    case "m":
      toggleMoveFPoints();
    default:
      break;
  }
}
