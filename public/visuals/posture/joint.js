var Joint = function(_pos){
	this.pos = _pos;
	this.initpos = _pos.copy();
	this.targetpos = createVector(0, 0);
	this.currentPos = _pos.copy();
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.rad = 1;

	this.lerpVal = 1;
	this.lerpInc = 0.0055;

	this.distanceFromOrigin = 40;

	this.update = function(){
		if(this.initpos.dist(this.pos) < this.distanceFromOrigin){
			this.velocity.add(this.acceleration);
			this.pos.add(this.velocity);

			this.acceleration.mult(0);
		}else{
			this.velocity.mult(-1);
			this.pos.add(this.velocity);

			this.acceleration.mult(0);
		}


		if(this.lerpVal < 1){
			this.pos.lerp(this.initpos, this.lerpVal);
			this.lerpVal += this.lerpInc;
		}
	}

	this.display = function(){
		noFill();
		push();
		translate(this.pos.x, this.pos.y);
		// ellipse(0, 0, this.rad*cos(millis()*0.001), this.rad*sin(millis()*0.001));
		pop();
	}

	this.getPos = function(){
		return this.pos;
	}

	this.move = function(force){
		this.acceleration.add(force);
	}

	this.reset = function(){
		this.velocity.mult(0);
		this.acceleration.mult(0);
		this.currentPos = createVector(this.pos.x, this.pos.y);
		this.lerpVal = 0;
		console.log(this.lerpVal);
		console.log(this.currentPos);
	}
}
