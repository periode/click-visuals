//these are all the points, they're just here for the structure

var FPoint = function(_pos){
  this.pos = _pos.copy();
  this.rad = 2;

  this.update = function(){
    
  }

  this.display = function(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(255, 0, 0);
    ellipse(0, 0, this.rad, this.rad);
    pop();
  }
}
