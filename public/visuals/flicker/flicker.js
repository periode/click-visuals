var flicker_cols;
var flicker_rows;

var flicker_frequency;
var flicker_offset;
var flicker_speed;

var xstep;
var ystep;

var chromatic = false;

function setup_flicker(){
  frameRate(20);

  flicker_cols = 1;
  flicker_rows = 500;

  xstep = width/flicker_cols;
  ystep = height/flicker_rows;

  flicker_frequency = 0;
  flicker_offset = 1;

}

function draw_flicker(){
  background(255, 200);
  noStroke();
  update_flicker();

  for(var x = 0; x < flicker_cols; x++){
    for(var y = 0; y < flicker_rows; y++){
      if(!chromatic){
        fill(parseInt(noise(millis()*10000))*255);
      }else{
        if(random(1) > 0.5){
          fill(130, 63, 115);//purple
        }else{
          fill(189, 197, 197);//silver
        }
      }

      if(noise(x + millis()*flicker_speed, y) < flicker_frequency)
        rect(x*xstep, y*ystep, xstep+1, ystep+1+parseInt(random(2))*flicker_offset);
    }
  }
}

function update_flicker(){

}

function f_updateColumns(val){
  flicker_cols = val;

  xstep = width/flicker_cols;
}

function f_updateRows(val){
  flicker_rows = val;

  ystep = height/flicker_rows;
}

function f_updateFrequency(val){
  flicker_frequency = val;
}

function f_updateSpeed(val){
  flicker_speed = val;
}

function f_updateOffset(val){
  flicker_offset = val;
}

function f_toggleChromatic(){
  chromatic = !chromatic;
}
