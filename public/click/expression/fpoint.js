//these are all the points, they're just here for the structure

var FPoint = function(_pos){
  this.pos = _pos;
  this.start_pos = _pos.copy();
  this.rad = 2;

  this.lerp = 1;
  this.inc = 0.01;

  this.v = createVector(random(-0.25, 0.25), random(-0.25, 0.25));
  this.start_v = this.v.copy();

  this.step = this.pos.x;
  this.dir = 1;

  this.update = function(){
    if(this.moving)
      this.pos.add(this.v);
    else {
      this.pos = this.start_pos.copy();
      this.v = createVector(random(-0.25, 0.25), random(-0.25, 0.25));
      this.start_v = this.v.copy();
    }
  }

  this.display = function(){
    push();
    translate(this.pos.x, this.pos.y);
    pop();
  }

  this.resetPosition = function(){
    this.lerp = 0;
    this.v.mult(-1);
  }
}
