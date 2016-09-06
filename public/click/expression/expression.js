// this is where we have the main class
var her;
var him;
var current_face;

function setup_expression(){
  strokeCap(PROJECT);

  current_face = new Face(createVector(width*0.175, height*0.1), gender);
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
  background(255);
  stroke(100);
  for(var i = 0; i < height; i+= 20){
    if(noise(i) > 0.4)
    line(0, i, width, i);
  }

  for(var i = 0; i < width; i+= 20){
    if(noise(i) > 0.4)
      line(i, 0, i, height);
  }
}

function resetFPoints(){
  current_face.resetFPoints();
}

function toggleMoveFPoints(){
  current_face.toggleMoveFPoints();
  setTimeout(resetFPoints, 3000);
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

function expression_set(data){
    resetFPoints();
}

function expression_updateSpeed(data){
  current_face.updateSpeed(data);
}
