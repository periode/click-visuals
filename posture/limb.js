var Limb = function(_joint1, _joint2){
	this.pos1 = _joint1;
	this.pos2 = _joint2;
	this.wither_coeff = 0;
	this.wither_inc = 0.025;


	this.update = function(){
		this.wither_coeff = constrain(this.wither_coeff, 0, 1);
		this.wither_coeff += this.wither_inc;
	}

	this.display = function(){
		line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
		strokeWeight(1+noise(millis()*0.01, this.pos2.x));
		for(var i = 0; i < 10; i++){
			line(this.pos1.x+(noise(i, millis()*0.0001)-0.5)*15*i*this.wither_coeff, this.pos1.y+(noise(i-100, millis()*0.0001)-0.5)*5*i*this.wither_coeff, this.pos2.x-(noise(i, millis()*0.01)-0.5)*5, this.pos2.y+(noise(i, millis()*0.0001)-0.5)*5*i*this.wither_coeff);
		}
	}

	this.display_shadow = function(){
		strokeCap(SQUARE);
		strokeWeight(40);
		stroke(100, 100+noise(millis()*0.001, this.pos1.x)*155);
		line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
	}

	this.wither = function(){
		this.wither_inc *= -1;
	}
}
