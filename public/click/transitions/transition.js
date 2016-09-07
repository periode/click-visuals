var content = [];
var content_pos;
var t_index = -2;

var t_lerp_val = 0;
var t_lerp_inc = 0.04;

var t_start_pos;
var t_end_pos;

var t_direction = 0;

function setup_transition(){

  //initialize a negative index so that the text doesn't appear at first
  t_index = -2;

  content[0] = "People love me.\nAnd you know what, I have been very successful.\nEverybody loves me.";
  content[1] = "#HasJustineLandedYet?";
  content[2] = "it's best to tweet your jokes at night\nbecause everyones drunk, sad, or both #clicktips";
  content[3] = "She is unattractive both inside and out.\nI fully understand why her former husband left her for a man\n- he made a good decision.";

  content[4] = "I'm so happy after such a long struggle to be living my true self.\nWelcome to the world Caitlyn.\nCan't wait for you to get to know her/me.";
  content[5] = "\"I have a boyfriend\" is the easiest way to get a man to leave you alone.\nBecause he respects another man more than you. #yesallwomen";
  content[6] = "#BroTheory 79: Being a #Bro has nothing to do with your gender.\nIf you #KeepTheCode & always down for a sickass time,\n you're #TheFewTheProud";
  content[7] = "Shocking moment:\nArmed police confront French woman wearing burkini on a beach.";
  content[8] = "Who was the greatest prostitute in history?\nMs. Pacman, for 25 cents that b***h swallowed balls till she died.";
  content[9] = "Wife of a Bears' lineman wins a bronze medal today in Rio Olympics.";

  t_start_pos = width*1.25;
  t_end_pos = width*0.5;

  content_pos = createVector(width*1.3, height*0.5);
  textSize(24);
  textAlign(CENTER, CENTER);



    fill(0);
    noStroke();
}


function draw_transition(){
  background(255);
  textFont("Roboto Mono");
  if(t_index >= 0)
    text(content[t_index], content_pos.x, content_pos.y);

  content_pos.x = lerp(t_start_pos, t_end_pos, t_lerp_val);

  if(t_lerp_val < 1)
    t_lerp_val += t_lerp_inc;

  // if(content_pos.x < -width*1.225)
  //   t_reset();
}

function t_swipe_in(_index, _direction){
  t_direction = _direction;

  var i = _index+4;
  t_title(i);
}

function t_swipe_out(){
  if(t_direction == -1){//move towards left edge
    t_start_pos = width*0.5;
    t_end_pos = -width*0.8;

    t_lerp_val = 0;
  }else{
    t_start_pos = width*0.5;
    t_end_pos = width*1.8;

    t_lerp_val = 0;
  }
}

function t_swipe(_index, _direction){

  if(_index == -1){//move out
    t_swipe_out()
  }else{//move in, with new t_index
    t_swipe_in(_index, _direction);
  }
}

function t_title(_index){
  t_index = _index;

  t_start_pos = width*0.5;
  t_end_pos = width*0.5;
  t_lerp_val = 1;


}
