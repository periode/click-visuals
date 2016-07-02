//these are all the points, they're just here for the structure

var FPoint = function(_pos){
  this.pos = _pos;
  this.start_pos = _pos.copy();
  this.rad = 2;

  this.lerp = 1;
  this.inc = 0.01;

  this.v = createVector(random(-0.25, 0.25), random(-0.25, 0.25));

  this.step = this.pos.x;
  this.dir = 1;

  this.update = function(){
    // this.step += 0.01 * this.dir;
    // var v = createVector((noise(this.step)-0.5)*10, (noise(this.step)-0.5)*10);
    if(this.moving)
      this.pos.add(this.v);
    else {
      this.pos = this.start_pos.copy();
      this.v = createVector(random(-0.25, 0.25), random(-0.25, 0.25));
    }
    //  this.pos.x += 0.01;

    // if(this.lerp < 1){
    //   this.lerp += this.inc;
    //   v = this.start_pos.copy();
    //   this.pos = p5.Vector.lerp(this.pos, v, this.lerp);
    // }else{
    //   this.pos = p5.Vector.lerp(this.pos, v, 1);
    // }
  }

  this.display = function(){
    push();
    translate(this.pos.x, this.pos.y);
    // ellipse(0, 0, this.rad, this.rad);
    pop();
  }

  this.resetPosition = function(){
    // this.pos = this.start_pos.copy();
    this.lerp = 0;
    this.v.mult(-1);
  }
}
