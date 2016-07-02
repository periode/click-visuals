//this holds the two points together

var FLine = function(_fp1, _fp2){
  this.fp1 = _fp1.pos;
  this.fp2 = _fp2.pos;

  this.move = function(){
    this.fp1 = _fp1.pos;
    this.fp2 = _fp2.pos;
  }

  this.display = function(){
    strokeWeight(2);
    var r1 = Math.random()*0.5;
    for(var i = 0; i < 4; i++){

      // line(this.fp1.x+noise(i+millis()*0.001)*10, this.fp1.y+noise(i*2+millis()*0.001)*7, this.fp2.x-noise(i)*10, this.fp2.y+noise(i+millis()*0.001)*10);
      line(this.fp1.x+r1*3, this.fp1.y+r1*4, this.fp2.x+r1*3, this.fp2.y+r1*3);
    }

  }
}
