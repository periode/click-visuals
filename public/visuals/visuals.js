function setup(){
  var cnv = createCanvas(windowWidth, windowHeight);
  background(255);
  if(state == 'virus'){
    setup_virus();
  }

  if(state == 'posture'){
    setup_posture();
  }

  if(state == 'expression')
    setup_expression();
}

function draw(){
  if(state == 'virus')
    draw_virus();

  if(state == 'posture')
    draw_posture();

  if(state == 'expression')
    draw_expression();
}
