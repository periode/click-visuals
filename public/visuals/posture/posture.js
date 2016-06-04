var him;
var her;

var him_adjuster;
var her_adjuster;

var index = 0;

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

var currentPosture = 0;

var fade = 0;
var canFade = false;

function setup_posture(){
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

function update_posture(){
	her.update();
	him.update();

	him_adjuster.update();
	her_adjuster.update();

	if(canFade)
		fade++;
}

function draw_posture(){
	update_posture();
	noCursor();
	background(250);
	drawLines();
	her_adjuster.display();
	him_adjuster.display();
	her.display();
	him.display();

	fill(0, fade);
	rect(0, 0, width, height);
}

function drawLines(){
	for(var i = 0; i < 100; i += (height/1500)){
		stroke(i*2+40, 80);
		strokeWeight(cos(millis()*0.005+i)*2+2);
		line(0, height-i*i, width, height-i*i);
	}
}

function keyTyped(){
	if(key == 'f' || key == 'F'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(him.joints.length));
		him.joints[randomPicked].move(f);
	}

	if(key == 'g' || key == 'G'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(him.joints.length));
		him.joints[randomPicked].move(f);
		her.joints[randomPicked].move(f);
	}

	if(key == 'h' || key == 'H'){
		var f = createVector(random(-moveCoeff, moveCoeff), random(-moveCoeff, moveCoeff));
		var randomPicked = Math.floor(random(her.joints.length));
		her.joints[randomPicked].move(f);
	}

	if(key == 's' || key == 'S'){
		var newPostureHim = specificPosture(currentPosture, "him");
		var newPostureHer = specificPosture(currentPosture, "her");

		for(var i = 0; i < him_adjuster.joints.length; i++){
				him_adjuster.joints[i].initpos = newPostureHim[i].pos;
				him_adjuster.joints[i].reset();
				her_adjuster.joints[i].initpos = newPostureHer[i].pos;
				her_adjuster.joints[i].reset();
		}

		him_adjuster.shadow(him.getPosition());
		her_adjuster.shadow(her.getPosition());

		for(var i = 0; i < her.joints.length; i++){
			her.joints[i].initpos = newPostureHer[i].pos;
			her.joints[i].reset();
			him.joints[i].initpos = newPostureHim[i].pos;
			him.joints[i].reset();
		}

		him.limbs.forEach(function(l){
			l.wither();
		});
		her.limbs.forEach(function(l){
			l.wither();
		});
	}

	if(key == '0')
		currentPosture = 0;
	if(key == '1')
		currentPosture = 1;
	if(key == '2')
		currentPosture = 2;
	if(key == '3')
		currentPosture = 3;
	if(key == '4')
		currentPosture = 4;
		if(key == '5')
			currentPosture = 5;

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

	if(key == '['){
		moveCoeff *= 0.9;
	}

	if(key == ']'){
		moveCoeff *= 1.1;
	}

	if(key == '\\'){
		him_adjuster.slowDown();
		her_adjuster.slowDown();
	}

	if(key == 'z')
	canFade = true;

	return false;
}

function displayJoints(){
	for(var i = 0; i < joints.length; i++){
		joints[i].display();
	}
}

function displayLimbs(){
	for(var i = 0; i < limbs.length; i++){
		limbs[i].display();
	}
}

function specificPosture(_number, _gender){
	var sp = [];

	if(_number == 0){
		console.log('hello number 0');
		var j_head = new Joint(createVector(width*0.5, height*0.1));
		sp.push(j_head);
		var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
		sp.push(j_torso_top);
		var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
		sp.push(j_torso_bottom);

		var j_shoulder_left = new Joint(createVector(width*0.425, height*0.225));
		sp.push(j_shoulder_left);
		var j_shoulder_right = new Joint(createVector(width*0.575, height*0.225));
		sp.push(j_shoulder_right);
		var j_elbow_left = new Joint(createVector(width*0.4, height*0.375));
		sp.push(j_elbow_left);
		var j_elbow_right = new Joint(createVector(width*0.6, height*0.375));
		sp.push(j_elbow_right);
		var j_wrist_left = new Joint(createVector(width*0.4, height*0.5));
		sp.push(j_wrist_left);
		var j_wrist_right = new Joint(createVector(width*0.6, height*0.5));
		sp.push(j_wrist_right);
		var j_palm_left = new Joint(createVector(width*0.415, height*0.515));
		sp.push(j_palm_left);
		var j_palm_right = new Joint(createVector(width*0.585, height*0.515));
		sp.push(j_palm_right);

		var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
		sp.push(j_hip_left);
		var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
		sp.push(j_hip_right);
		var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
		sp.push(j_knee_left);
		var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
		sp.push(j_knee_right);
		var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
		sp.push(j_ankle_left);
		var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
		sp.push(j_ankle_right);
		var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
		sp.push(j_toe_left);
		var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
		sp.push(j_toe_right);
	}

	if(_number == 1){
		if(_gender == "her"){
			var j_head = new Joint(createVector(width*0.5, height*0.1));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.425, height*0.225));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.575, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.4, height*0.205));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.6, height*0.205));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.4, height*0.1));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.6, height*0.1));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.455, height*0.115));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.55, height*0.115));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
		}else{
			var j_head = new Joint(createVector(width*0.5, height*0.1));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.425, height*0.225));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.575, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.45, height*0.375));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.6, height*0.205));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.6, height*0.25));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.6, height*0.1));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.615, height*0.25));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.55, height*0.115));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
		}
	}else if(_number == 2){
		if(_gender == "her"){
			var j_head = new Joint(createVector(width*0.5, height*0.45));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.55));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.8));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.425, height*0.6));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.475, height*0.6));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.4, height*0.4));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.45, height*0.4));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.4, height*0.3));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.475, height*0.3));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.415, height*0.275));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.485, height*0.275));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.825));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.475, height*0.825));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.35, height*0.95));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.35, height*0.95));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
		}else{
			var j_head = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.55));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.8));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.45, height*0.55));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.55, height*0.55));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.45, height*0.9));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.5, height*0.9));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.35, height*0.75));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.35, height*0.75));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.95));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.95));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.35, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.34, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.4, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.32, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.38, height*0.95));
			sp.push(j_toe_right);
		}
	}else if(_number == 3){
		if(_gender == "her"){
			var j_head = new Joint(createVector(width*0.5, height*0.1));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.425, height*0.225));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.55, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.325, height*0.325));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.6, height*0.375));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.275, height*0.305));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.55, height*0.5));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.265, height*0.3));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.525, height*0.515));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);

		}else{
			var j_head = new Joint(createVector(width*0.5, height*0.1));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.45, height*0.325));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.55, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.425, height*0.125));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.55, height*0.375));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.425, height*0.1));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.425, height*0.05));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.485, height*0.515));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
		}
	}else if(_number == 4){
		if(_gender == "her"){
			var j_head = new Joint(createVector(width*0.5, height*0.15));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.45, height*0.25));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.55, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.425, height*0.375));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.55, height*0.375));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.45, height*0.5));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.5, height*0.25));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.485, height*0.515));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
		}else{
			var j_head = new Joint(createVector(width*0.5, height*0.15));
			sp.push(j_head);
			var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
			sp.push(j_torso_top);
			var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_torso_bottom);

			var j_shoulder_left = new Joint(createVector(width*0.45, height*0.25));
			sp.push(j_shoulder_left);
			var j_shoulder_right = new Joint(createVector(width*0.55, height*0.225));
			sp.push(j_shoulder_right);
			var j_elbow_left = new Joint(createVector(width*0.425, height*0.375));
			sp.push(j_elbow_left);
			var j_elbow_right = new Joint(createVector(width*0.55, height*0.375));
			sp.push(j_elbow_right);
			var j_wrist_left = new Joint(createVector(width*0.45, height*0.5));
			sp.push(j_wrist_left);
			var j_wrist_right = new Joint(createVector(width*0.5, height*0.5));
			sp.push(j_wrist_right);
			var j_palm_left = new Joint(createVector(width*0.5, height*0.25));
			sp.push(j_palm_left);
			var j_palm_right = new Joint(createVector(width*0.485, height*0.515));
			sp.push(j_palm_right);

			var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
			sp.push(j_hip_left);
			var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
			sp.push(j_hip_right);
			var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
			sp.push(j_knee_left);
			var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
			sp.push(j_knee_right);
			var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
			sp.push(j_ankle_left);
			var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
			sp.push(j_ankle_right);
			var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
			sp.push(j_toe_left);
			var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
			sp.push(j_toe_right);
			}
		}else if(_number == 5){
			if(_gender == "her"){
				var j_head = new Joint(createVector(width*0.5, height*0.1));
				sp.push(j_head);
				var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
				sp.push(j_torso_top);
				var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
				sp.push(j_torso_bottom);

				var j_shoulder_left = new Joint(createVector(width*0.5, height*0.225));
				sp.push(j_shoulder_left);
				var j_shoulder_right = new Joint(createVector(width*0.5, height*0.225));
				sp.push(j_shoulder_right);
				var j_elbow_left = new Joint(createVector(width*0.55, height*0.3));
				sp.push(j_elbow_left);
				var j_elbow_right = new Joint(createVector(width*0.55, height*0.3));
				sp.push(j_elbow_right);
				var j_wrist_left = new Joint(createVector(width*0.6, height*0.195));
				sp.push(j_wrist_left);
				var j_wrist_right = new Joint(createVector(width*0.6, height*0.175));
				sp.push(j_wrist_right);
				var j_palm_left = new Joint(createVector(width*0.625, height*0.1));
				sp.push(j_palm_left);
				var j_palm_right = new Joint(createVector(width*0.635, height*0.1));
				sp.push(j_palm_right);

				var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
				sp.push(j_hip_left);
				var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
				sp.push(j_hip_right);
				var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
				sp.push(j_knee_left);
				var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
				sp.push(j_knee_right);
				var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
				sp.push(j_ankle_left);
				var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
				sp.push(j_ankle_right);
				var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
				sp.push(j_toe_left);
				var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
				sp.push(j_toe_right);
			}else{
				var j_head = new Joint(createVector(width*0.5, height*0.1));
				sp.push(j_head);
				var j_torso_top = new Joint(createVector(width*0.5, height*0.2));
				sp.push(j_torso_top);
				var j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
				sp.push(j_torso_bottom);

				var j_shoulder_left = new Joint(createVector(width*0.5, height*0.225));
				sp.push(j_shoulder_left);
				var j_shoulder_right = new Joint(createVector(width*0.5, height*0.225));
				sp.push(j_shoulder_right);
				var j_elbow_left = new Joint(createVector(width*0.525, height*0.395));
				sp.push(j_elbow_left);
				var j_elbow_right = new Joint(createVector(width*0.525, height*0.375));
				sp.push(j_elbow_right);
				var j_wrist_left = new Joint(createVector(width*0.55, height*0.395));
				sp.push(j_wrist_left);
				var j_wrist_right = new Joint(createVector(width*0.6, height*0.375));
				sp.push(j_wrist_right);
				var j_palm_left = new Joint(createVector(width*0.55, height*0.4));
				sp.push(j_palm_left);
				var j_palm_right = new Joint(createVector(width*0.585, height*0.4));
				sp.push(j_palm_right);

				var j_hip_left = new Joint(createVector(width*0.475, height*0.625));
				sp.push(j_hip_left);
				var j_hip_right = new Joint(createVector(width*0.525, height*0.625));
				sp.push(j_hip_right);
				var j_knee_left = new Joint(createVector(width*0.45, height*0.75));
				sp.push(j_knee_left);
				var j_knee_right = new Joint(createVector(width*0.55, height*0.75));
				sp.push(j_knee_right);
				var j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
				sp.push(j_ankle_left);
				var j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
				sp.push(j_ankle_right);
				var j_toe_left = new Joint(createVector(width*0.42, height*0.95));
				sp.push(j_toe_left);
				var j_toe_right = new Joint(createVector(width*0.58, height*0.95));
				sp.push(j_toe_right);
			}
		}

	return sp;
}
