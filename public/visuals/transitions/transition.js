var content = [];
var content_pos;
var index = 0;

var transition_lerp_val = 0;
var transition_lerp_inc = 0.04;

function setup_transition(){
  content[0] = "et sois la plus heureuse";
  content[1] = "etant la plus jolie";
  content[2] = "o mon unique amour";
  content[3] = "et ma grande folie";

  index = Math.floor(Math.random()*content.length);

  content_pos = createVector(width*1.1, height*0.5);
  textSize(48);
  textAlign(CENTER, CENTER);


    fill(0);
    noStroke();
}


function draw_transition(){
  background(255);
  text(content[index], content_pos.x, content_pos.y);

  content_pos.x = lerp(width*1.1, width*0.5, transition_lerp_val);

  if(transition_lerp_val < 1)
    transition_lerp_val += transition_lerp_inc;
}
