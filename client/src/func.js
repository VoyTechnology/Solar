/**
 * @file Contains helper functions
 */

 /**
  * Gives the user an error message
  * @function
  * @param {Number} code - Error code
  * @param {string} msg - Optional error message
  */
function game_exit_error(code, msg){

  if(msg){
    $('#game_error #game_error_message').html(msg);
  } else {
    $('#game_error #game_error_message').html(getErrorMessage(code));
  }

  $('#game_error').show();

}

/**
 * Gets an error message of specific code
 * @function
 * @param {Number} code - Error code
 * @returns {string} Error message
 */
function getErrorMessage(code){

  return config.errors[code];

}

/**
 * Closes the current window
 * @function
 */
function closeWindow(){
  gui.Window.get().close();
  settings.set('token', "");
}

/**
 * Hides the loading screen
 * @function
 */
function hide_loading_window(){
  $('#game_loading').remove();
}

/**
 * Sets the camera
 * @param {Object} data - The location data
 */
function set_camera(data){
  player.camera.position.x = data.position.x || settings.get('last_pos_x') || 0;
  player.camera.position.y = data.position.y || settings.get('last_pos_y') || 0;
  player.camera.position.z = data.position.z || settings.get('last_pos_z') || Mm(10);
}


/**
 * Convert to meters
 * @function
 * @param {Number} d - Distance to convert
 * @returns {Number} Converted distance
 */
function m(d){
  return d;
}

/**
 * Convert to kilometers
 * @function
 * @param {Number} d - Distance to convert
 * @returns {Number} Converted distance
 */
function km(d){
  return m(d) * 1000;
}

/**
 * Convert to Megameters(?)
 * @function
 * @param {Number} d - Distance to convert
 * @returns {Number} Converted distance
 */
function Mm(d){
  return m(d) * 1000 * 1000;
}

/**
 * Convert to speed of light
 * @function
 * @param {Number} d - Distance to convert
 * @returns {Number} Converted distance
 */
function c(d){
  return km(d) * 300000;
}

/**
 * Returns the values as fraction of the speed of light.
 * @function
 * @param {Number} d - Distance to convert
 * @returns {Number} Fraction of the speed of light
 */
function as_c(){
  return d / (300000 * km(1));
}


/**
 * Updates the display with the throttle
 * @function
 * @param {Number} speed - current throttle level
 */
function updateThrottle( speed ){
  var p = $("#speed_positive");
  var n = $("#speed_negative");

  if(speed >= 0){
    p.css({
      "top": 75-(speed*10)+"vh",
      "height": (speed*10)+"vh"
    });
  } else if( speed === 0 ){
    n.css("height", 0);
  } else {
    n.css({
      "top": "75vh",
      "height": (-speed*10)+"vh"
    });
  }
}

/**
 * Displays the location of the player
 * @function
 * @param {Number} speed - current throttle level
 */
function displayLocation( speed ){
  var location = player.tP.position;

  var target = $("#top_helmet");

  target.html(
    "x: "+ (location.x >> 1 << 1) +
    ", y: " + (location.y >> 1 << 1) +
    ", z: " + (location.z >> 1 << 1)
  );
}
