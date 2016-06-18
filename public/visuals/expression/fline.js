//this holds the two points together

var FLine = function(_fp1, _fp2){
  this.fp1 = _fp1.pos;
  this.fp2 = _fp2.pos;

  this.udpate = function(){

  }

  this.display = function(){
    strokeWeight(2);
    line(this.fp1.x, this.fp1.y, this.fp2.x, this.fp2.y);
  }
}
