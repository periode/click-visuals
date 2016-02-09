var him;
var her;

var him_adjuster;
var her_adjuster;

//joints
var j_head;
var j_torso_top;
var j_torso_bottom;
var j_shoulder_left;
var j_shoulder_right;
var j_elbow_left;
var j_elbow_right;
var j_wrist_left;
var j_wrist_right;
var j_palm_left;
var j_palm_right;
var j_hip_left;
var j_hip_right;
var j_knee_left;
var j_knee_right;
var j_ankle_left;
var j_ankle_right;
var j_toe_left;
var j_toe_right;

var joints = [];

//limbs
var l_head;
var l_torso;
var l_arm_left;
var l_arm_right;
var l_forearm_left;
var l_forearm_right;
var l_hand_left;
var l_hand_right;
var l_thigh_left;
var l_thigh_right;
var l_leg_left;
var l_leg_right;
var l_foot_left;
var l_foot_right;

var limbs = [];

var shadow = false;

var moveCoeff = 4;

function setup(){
	var cnv = createCanvas(windowWidth, windowHeight);


	her = new Skeleton(createVector(width*0.25, 0), "her");
	him = new Skeleton(createVector(-width*0.25, 0), "him");
	her.setupJoints();
	her.setupLimbs();

	him.setupJoints();
	him.setupLimbs();

	her_adjuster = new Skeleton(createVector(width*0.75, 0), "other");
	him_adjuster = new Skeleton(createVector(-width*0.75, 0), "other");
	him_adjuster.setupJoints();
	him_adjuster.setupLimbs();
	her_adjuster.setupJoints();
	her_adjuster.setupLimbs();
}

function update(){
	her.update();
	him.update();

	him_adjuster.update();
	her_adjuster.update();
}

function draw(){
	update();
	background(255, 255, 257);
	drawLines();
	her_adjuster.display();
	him_adjuster.display();
	her.display();
	him.display();


}

function drawLines(){
	for(var i = 0; i < 80; i += (height/1000)){
		stroke(200-i, 100);
		strokeWeight(20);
		line(0, height-i*i, width, height-i*i);
	}
}

function keyTyped(){
	if(key == 'f' || key == 'F'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(her.joints.length));
		her.joints[randomPicked].move(f);
	}

	if(key == 'g' || key == 'G'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(him.joints.length));
		him.joints[randomPicked].move(f);
		her.joints[randomPicked].move(f);
	}

	if(key == 'h' || key == 'H'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(him.joints.length));
		him.joints[randomPicked].move(f);
	}

	if(key == 's' || key == 'S'){
		him_adjuster.shadow(him.getPosition());
		her_adjuster.shadow(her.getPosition());
				her.joints.forEach(function(j){
			j.reset();
		});
		him.joints.forEach(function(j){
			j.reset();
		});

		him.limbs.forEach(function(l){
			l.wither();
		});
		her.limbs.forEach(function(l){
			l.wither();
		});
	}

	if(key == 'u' || key == 'U'){
		him_adjuster.unshadow();
		her_adjuster.unshadow();

		setTimeout(function(){
		him.limbs.forEach(function(l){
			l.wither();
		});
		her.limbs.forEach(function(l){
			l.wither();
		});
		}, 2000);

	}

	if(key == 'r' || key == 'R'){
		her.joints.forEach(function(j){
			j.reset();
		});
		him.joints.forEach(function(j){
			j.reset();
		});
	}

	if(key == 'w' || key == 'W'){
		him.limbs.forEach(function(l){
			l.wither();
		});
		her.limbs.forEach(function(l){
			l.wither();
		});
	}

	return false;
}

function displayJoints(){
	for(var i = 0; i < joints.length; i++){
		joints[i].display();
	}
}

function setNewPosture(key){
	//decide which one to modify
	//if(key == 1) him.initpos = otherpos;
	//or sth like that
}

function displayLimbs(){
	for(var i = 0; i < limbs.length; i++){
		limbs[i].display();
	}
}