var content = [];
var content_pos;
var t_index = -2;

var t_lerp_val = 0;
var t_lerp_inc = 0.06;

var t_start_pos;
var t_end_pos;

function setup_transition(){

  //initialize a negative index so that the text doesn't appear at first
  t_index = -2;

  content[0] = "et sois la plus heureuse";
  content[1] = "etant la plus jolie";
  content[2] = "o mon unique amour";
  content[3] = "et ma grande folie";

  t_start_pos = width*1.25;
  t_end_pos = width*0.5;

  content_pos = createVector(width*1.3, height*0.5);
  textSize(48);
  textAlign(CENTER, CENTER);


    fill(0);
    noStroke();
}


function draw_transition(){
  background(255);
  if(t_index >= 0)
    text(content[t_index], content_pos.x, content_pos.y);

  content_pos.x = lerp(t_start_pos, t_end_pos, t_lerp_val);

  if(t_lerp_val < 1)
    t_lerp_val += t_lerp_inc;

  // if(content_pos.x < -width*1.225)
  //   t_reset();
}

function t_swipe_in(_index){
  t_start_pos = width*1.3;
  t_end_pos = width*0.5;

  t_index = _index;

  t_lerp_val = 0;
}

function t_swipe(_index){

  if(_index == -1){//move out
    t_start_pos = width*0.5;
    t_end_pos = -width*1.3;

    t_lerp_val = 0;
  }else{//move in, with new t_index
    t_swipe_in(_index);
  }
}
