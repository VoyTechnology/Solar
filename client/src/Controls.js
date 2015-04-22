/**
 * Controls Class - Handles the controls for the game
 * @class
 */

var Controls = function( object ){

  // Contain the moveStates, so the currently pressed buttons / gamepad controls
  this.moveState = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    forward: 0,
    backward: 0,
    pitch: {
      up: 0,
      down: 0
    },
    yaw: {
      left: 0,
      right: 0,
    },
    roll: {
      left: 0,
      right: 0
    }
  };

  this.absoluteMove = {
    forward: 0
  };

  // Move and rotation vectors
  this.moveVector = new THREE.Vector3(0,0,0);
  this.rotationVector = new THREE.Vector3(0,0,0);

  // Rotation Quaternion
  this.tmpQuat = new THREE.Quaternion();

  this.menu = {
    "menu": false,
    "gonsole": false
  };

  log.debug("Contols Initialized");

  // Object to control
  this.object = object;

  // Are the controls enabled
  this.enabled = false;

  // Spacecraft flight characteristics
  this._flightparams = {};

  // Current State of button press
  this.keystate = {};

  for(var ksi = 0; ksi < 150; ksi++){
    this.keystate[ksi] = 0;
  }

  window.addEventListener("gamepadconnected", function(gp){
    console.log(gp);
  });

  var that = this;

  // Listen for buttons being pressed down
	document.addEventListener("keydown", function(e){
		that.keystate[e.keyCode] = 1;
	});

	// Listen for button being no longer pressed
	document.addEventListener("keyup", function(e){
    that.keystate[e.keyCode] = 0;
	});

  this.update( );

};

/**
 * Disables the controls
 * @method
 */
Controls.prototype.disable = function(){
  enabled = false;
};

/**
 * Sets the ship specific information for the control
 * @method
 * @param {object} properties - The properties to determine the control of a ship
 */
Controls.prototype.setControlData = function( data ){
  this._flightparams = {
    max_speed: data.max_speed, //c
    max_rotation: data.max_rotation, //r
    weight: data.weight, //t
    acceleration: {
      forward: data.acceleration.forward, // c/s2
      backward: data.acceleration.backward // c/s2
    }
  };
};

/**
 * Enabled the Controls
 * @method
 */
Controls.prototype.enable = function(){
  this.enabled = true;
  this.updateRotationVector();
  this.updateMoveVector();
};

Controls.prototype.update = function( delta ){

  if(this.enabled){
    var spd = this.absoluteMove.forward;

    var maxMoveMult = delta * c(this._flightparams.max_speed);
    this.moveMult = delta * c(this._flightparams.max_speed);

    //((x-1)^4 + (x-1)^3) * 9.4
    var rotMult = (
        ( (spd-1)*(spd-1)*(spd-1)*(spd-1) ) +
        ( (spd-1)*(spd-1)*(spd-1) )
      ) * -9.4;

    this.moveState.forward = this.keystate[ settings.get("button_forward") ];
    this.moveState.backward = this.keystate[ settings.get("button_backward") ];

    this.moveState.yaw.left = this.keystate[ settings.get("button_yaw_left") ];
    this.moveState.yaw.right = this.keystate[ settings.get("button_yaw_right") ];

    this.moveState.up = this.keystate[ settings.get("button_up") ];
    this.moveState.down = this.keystate[ settings.get("button_down") ];

    this.moveState.pitch.up = this.keystate[ settings.get("button_pitch_up") ];
    this.moveState.pitch.down = this.keystate[ settings.get("button_pitch_down") ];

    this.moveState.roll.left = this.keystate[ settings.get("button_roll_left") ];
    this.moveState.roll.right = this.keystate[ settings.get("button_roll_right") ];

    this.moveState.left = this.keystate[ settings.get("button_left") ];
    this.moveState.right = this.keystate[ settings.get("button_right") ];

    this.updateMoveVector();
    this.updateRotationVector(rotMult);

    //if(gamepad.connected){

    //}

    this.object.translateX( this.moveVector.x * this.moveMult);
    this.object.translateY( this.moveVector.y * this.moveMult);
    this.object.translateZ( this.moveVector.z * maxMoveMult);
  }





};

Controls.prototype.updateRotationVector = function(rotMult){
  this.rotationVector.x = ( -this.moveState.pitch.down + this.moveState.pitch.up);
  this.rotationVector.y = ( -this.moveState.yaw.right + this.moveState.yaw.left);
  this.rotationVector.z = ( -this.moveState.roll.right + this.moveState.roll.left);

  this.tmpQuat.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
  this.object.quaternion.multiply( this.tmpQuat );

  // expose the rotation vector for convenience
  this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );

};


Controls.prototype.updateMoveVector = function( delta ){
  if(this.moveState.forward !== 0){
    this.absoluteMove.forward = this.moveState.forward - this.moveState.backward;
    this.absoluteMove.forward *= 1.1;
  }

  this.moveVector.x = ( -this.moveState.left + this.moveState.right );
  this.moveVector.y = ( -this.moveState.yaw.right + this.moveState.yaw.left);
  this.moveVector.z = -Math.min(1, this.absoluteMove.forward);
};
