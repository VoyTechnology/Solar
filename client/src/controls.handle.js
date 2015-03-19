/**
 * Controls Class - Handles the contols for the game
 * @class
 */

var Controls = function( camera ){
  log.debug("Contols Initialized");

  // Are the controls enabled
  var enabled = false;

  // Current State of button press
  var keystate = {};
  var moveState = {};

  // Listen for buttons being pressed down
	document.addEventListener("keydown", function(e){
		keystate[e.keyCode] = true;
	});

	// Listen for button being no longer pressed
	document.addEventListener("keyup", function(e){
		delete keystate[e.keyCode];
	});

};

/**
 * Disables the controls
 * @method
 */
Controls.prototype.disable = function(){
  enabled = false;
};


/**
 * Enabled the Controls
 * @method
 */
Controls.prototype.enable = function(){
  enabled = true;
};

Controls.prototype.moveControl = function(){

};
