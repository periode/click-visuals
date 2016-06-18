//this is the class for the whole face which contains a bunch of points


var Face = function(_center){
  //center of position
  this.center = _center.copy();
  console.log(this.center);

  this.fpoints = [];

  //face outline
  this.fpoints[0] = new FPoint(createVector(width*0.1, height*0.1));
  this.fpoints[1] = new FPoint(createVector(width*0.115, height*0.4));
  this.fpoints[2] = new FPoint(createVector(width*0.185, height*0.5));
  this.fpoints[3] = new FPoint(createVector(width*0.215, height*0.5));
  this.fpoints[4] = new FPoint(createVector(width*0.285, height*0.4));
  this.fpoints[5] = new FPoint(createVector(width*0.3, height*0.1));

  //eye left
  this.fpoints[6] = new FPoint(createVector(width*0.15, height*0.125));
  this.fpoints[7] = new FPoint(createVector(width*0.135, height*0.13));
  this.fpoints[8] = new FPoint(createVector(width*0.15, height*0.135));
  this.fpoints[9] = new FPoint(createVector(width*0.165, height*0.13));

  //eye right
  this.fpoints[10] = new FPoint(createVector(width*0.25, height*0.125));
  this.fpoints[11] = new FPoint(createVector(width*0.235, height*0.13));
  this.fpoints[12] = new FPoint(createVector(width*0.25, height*0.135));
  this.fpoints[13] = new FPoint(createVector(width*0.265, height*0.13));

  //nose
  this.fpoints[14] = new FPoint(createVector(width*0.195, height*0.285));
  this.fpoints[15] = new FPoint(createVector(width*0.205, height*0.285));

  //mouth
  this.fpoints[16] = new FPoint(createVector(width*0.165, height*0.375));
  this.fpoints[17] = new FPoint(createVector(width*0.185, height*0.4));
  this.fpoints[18] = new FPoint(createVector(width*0.215, height*0.4));
  this.fpoints[19] = new FPoint(createVector(width*0.235, height*0.375));



  this.flines = [];

  //face outline
  this.flines[0] = new FLine(this.fpoints[0], this.fpoints[1]);
  this.flines[1] = new FLine(this.fpoints[1], this.fpoints[2]);
  this.flines[2] = new FLine(this.fpoints[2], this.fpoints[3]);
  this.flines[3] = new FLine(this.fpoints[3], this.fpoints[4]);
  this.flines[4] = new FLine(this.fpoints[4], this.fpoints[5]);

  //eye left
  this.flines[5] = new FLine(this.fpoints[6], this.fpoints[7]);
  this.flines[6] = new FLine(this.fpoints[7], this.fpoints[8]);
  this.flines[7] = new FLine(this.fpoints[8], this.fpoints[9]);
  this.flines[8] = new FLine(this.fpoints[9], this.fpoints[6]);

  //eye right
  this.flines[9] = new FLine(this.fpoints[10], this.fpoints[11]);
  this.flines[10] = new FLine(this.fpoints[11], this.fpoints[12]);
  this.flines[11] = new FLine(this.fpoints[12], this.fpoints[13]);
  this.flines[12] = new FLine(this.fpoints[13], this.fpoints[10]);

  //nose
  this.flines[13] = new FLine(this.fpoints[14], this.fpoints[15]);

  //mouth
  this.flines[14] = new FLine(this.fpoints[16], this.fpoints[17]);
  this.flines[15] = new FLine(this.fpoints[17], this.fpoints[18]);
  this.flines[16] = new FLine(this.fpoints[18], this.fpoints[19]);

  this.update = function(){
    for(var i = 0; i < this.fpoints.length; i++){
      this.fpoints[i].update();
    }
  }


  this.display = function(){
    push();
    translate(this.center.x, this.center.y);
    fill(0);
    for(var i = 0; i < this.fpoints.length; i++){
      text(i, this.fpoints[i].x, this.fpoints[i].y);
      this.fpoints[i].display();
    }

    for(var i = 0; i < this.flines.length; i++){
      this.flines[i].display();
    }
    pop();
  }


}
