/**
 * @file Cointains the settings class
 **/

// Define the height and width of the screen
var height = window.innerHeight,
    width = window.innerHeight;

/**
 * Settings Class. Checks and sets the default if they do not exist
 * @class
 * @param {object} default - Provides the default values for the settings
 **/
function Settings(defaults){
  for(var d = Object.keys(defaults).length - 1; d >= 0; d--){
    var key = Object.keys(defaults)[d];
    this.set(key, this.get(key) || defaults[key]);
  }
}

/**
 * Gets specific settings
 * @method
 * @param {string} key - Key to get the value of
 * @returns {String} Value of the Key
 **/
Settings.prototype.get = function(key){
  return window.localStorage[key];
};

/**
 * Sets specific settings
 * @method
 * @param {string|object} key - Key of the value to set
 * @param {string} value - Value corresponding to the key
 **/
Settings.prototype.set = function(key, value){
  if(typeof key == "object"){
    var keys = Object.keys(key);
    for(var k = keys.length - 1; i > 0; i--){
      window.localStorage[key[k]] = value;
    }
  } else {
    window.localStorage[key] = value;
  }
};
