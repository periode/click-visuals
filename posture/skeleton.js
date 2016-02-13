var Skeleton = function(_position, _gender){
	//joints
	this.j_head;
	this.j_torso_top;
	this.j_torso_bottom;
	this.j_shoulder_left;
	this.j_shoulder_right;
	this.j_elbow_left;
	this.j_elbow_right;
	this.j_wrist_left;
	this.j_wrist_right;
	this.j_palm_left;
	this.j_palm_right;
	this.j_hip_left;
	this.j_hip_right;
	this.j_knee_left;
	this.j_knee_right;
	this.j_ankle_left;
	this.j_ankle_right;
	this.j_toe_left;
	this.j_toe_right;

	this.joints = [];

	//limbs
	this.l_head;
	this.l_torso;
	this.l_arm_left;
	this.l_arm_right;
	this.l_forearm_left;
	this.l_forearm_right;
	this.l_hand_left;
	this.l_hand_right;
	this.l_thigh_left;
	this.l_thigh_right;
	this.l_leg_left;
	this.l_leg_right;
	this.l_foot_left;
	this.l_foot_right;

	this.limbs = [];

	this.position = _position.copy();
	this.original_position = _position.copy();
	this.target_position = _position.copy();
	this.gender = _gender;


	this.lerp_val = 1;
	this.lerp_inc = 0.001;

	if(this.gender == "her")
		this.color = color(200, 100, 100, 200);
	else if(this.gender == "him")
		this.color = color(20, 20, 130, 200);
	else
		this.color = color(200, 200, 200, 200);

	this.update = function(){
		// if(this.gender == "him" || this.gender == "her"){
			this.joints.forEach(function(j){
				j.update();
			});

			this.limbs.forEach(function(l){
				l.update();
			});
		// }


		if(this.lerp_val < 1){
			this.lerp_val += this.lerp_inc;
		}


		this.position.lerp(this.target_position, this.lerp_val);
	}

	this.display = function(){
		push();
		translate(this.position.x, this.position.y);
		stroke(this.color);

		if(this.gender == "her" || this.gender == "him"){
			this.joints.forEach(function(j){
				j.display();
			});

			strokeWeight(4);
			stroke(this.color);
			this.limbs.forEach(function(l){
				l.display();
			});
		}else{
			strokeWeight(30);
			this.limbs.forEach(function(l){
				l.display_shadow();
			});
		}
		pop();
	}

	this.shadow = function(pos){
		this.target_position = pos.copy();
		this.lerp_val = 0;
	}

	this.unshadow = function(){
		this.target_position = this.original_position.copy();
		this.lerp_val = 0;
	}

	this.slowDown = function(){
		this.lerp_inc *= 0.5;
	}

	this.getPosition = function(){
		return this.position;
	}

	this.setupJoints = function(){
		this.j_head = new Joint(createVector(width*0.5, height*0.1));
		this.joints.push(this.j_head);
		this.j_torso_top = new Joint(createVector(width*0.5, height*0.2));
		this.joints.push(this.j_torso_top);
		this.j_torso_bottom = new Joint(createVector(width*0.5, height*0.5));
		this.joints.push(this.j_torso_bottom);

		this.j_shoulder_left = new Joint(createVector(width*0.425, height*0.225));
		this.joints.push(this.j_shoulder_left);
		this.j_shoulder_right = new Joint(createVector(width*0.575, height*0.225));
		this.joints.push(this.j_shoulder_right);
		this.j_elbow_left = new Joint(createVector(width*0.4, height*0.375));
		this.joints.push(this.j_elbow_left);
		this.j_elbow_right = new Joint(createVector(width*0.6, height*0.375));
		this.joints.push(this.j_elbow_right);
		this.j_wrist_left = new Joint(createVector(width*0.4, height*0.5));
		this.joints.push(this.j_wrist_left);
		this.j_wrist_right = new Joint(createVector(width*0.6, height*0.5));
		this.joints.push(this.j_wrist_right);
		this.j_palm_left = new Joint(createVector(width*0.415, height*0.515));
		this.joints.push(this.j_palm_left);
		this.j_palm_right = new Joint(createVector(width*0.585, height*0.515));
		this.joints.push(this.j_palm_right);

		this.j_hip_left = new Joint(createVector(width*0.475, height*0.625));
		this.joints.push(this.j_hip_left);
		this.j_hip_right = new Joint(createVector(width*0.525, height*0.625));
		this.joints.push(this.j_hip_right);
		this.j_knee_left = new Joint(createVector(width*0.45, height*0.75));
		this.joints.push(this.j_knee_left);
		this.j_knee_right = new Joint(createVector(width*0.55, height*0.75));
		this.joints.push(this.j_knee_right);
		this.j_ankle_left = new Joint(createVector(width*0.45, height*0.95));
		this.joints.push(this.j_ankle_left);
		this.j_ankle_right = new Joint(createVector(width*0.55, height*0.95));
		this.joints.push(this.j_ankle_right);
		this.j_toe_left = new Joint(createVector(width*0.42, height*0.95));
		this.joints.push(this.j_toe_left);
		this.j_toe_right = new Joint(createVector(width*0.58, height*0.95));
		this.joints.push(this.j_toe_right);
	}

	this.setupLimbs = function(){
		this.l_head = new Limb(this.j_head.getPos(), this.j_torso_top.getPos());
		this.limbs.push(this.l_head);
		this.l_torso = new Limb(this.j_torso_top.getPos(), this.j_torso_bottom.getPos());
		this.limbs.push(this.l_torso);
		this.l_arm_left = new Limb(this.j_shoulder_left.getPos(), this.j_elbow_left.getPos());
		this.limbs.push(this.l_arm_left);
		this.l_arm_right = new Limb(this.j_shoulder_right.getPos(), this.j_elbow_right.getPos());
		this.limbs.push(this.l_arm_right);
		this.l_forearm_left = new Limb(this.j_elbow_left.getPos(), this.j_wrist_left.getPos());
		this.limbs.push(this.l_forearm_left);
		this.l_forearm_right = new Limb(this.j_elbow_right.getPos(), this.j_wrist_right.getPos());
		this.limbs.push(this.l_forearm_right);
		this.l_hand_left = new Limb(this.j_wrist_left.getPos(), this.j_palm_left.getPos());
		this.limbs.push(this.l_hand_left);
		this.l_hand_right = new Limb(this.j_wrist_right.getPos(), this.j_palm_right.getPos());
		this.limbs.push(this.l_hand_right);
		this.l_thigh_left = new Limb(this.j_hip_left.getPos(), this.j_knee_left.getPos());
		this.limbs.push(this.l_thigh_left);
		this.l_thigh_right = new Limb(this.j_hip_right.getPos(), this.j_knee_right.getPos());
		this.limbs.push(this.l_thigh_right);
		this.l_leg_left = new Limb(this.j_knee_left.getPos(), this.j_ankle_left.getPos());
		this.limbs.push(this.l_leg_left);
		this.l_leg_right = new Limb(this.j_knee_right.getPos(), this.j_ankle_right.getPos());
		this.limbs.push(this.l_leg_right);
		this.l_foot_left = new Limb(this.j_ankle_left.getPos(), this.j_toe_left.getPos());
		this.limbs.push(this.l_foot_left);
		this.l_foot_right = new Limb(this.j_ankle_right.getPos(), this.j_toe_right.getPos());
		this.limbs.push(this.l_foot_right);
	}
}
