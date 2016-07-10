// this is where we have the main class
var her;
var him;
var current_face;

function setup_expression(){
  her = new Face(createVector(width*0.175, height*0.1), "her");
  him = new Face(createVector(width*0.175, height*0.1), "him");
  strokeCap(PROJECT);

  current_face = her;
}

function draw_expression(){
  drawBackground();

  update();

  current_face.display();
}

function update(){
  current_face.update();
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
  current_face.resetFPoints();
}

function toggleMoveFPoints(){
  current_face.toggleMoveFPoints();
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
