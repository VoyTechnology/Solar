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
