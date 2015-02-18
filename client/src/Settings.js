/**
 * @file Cointains the settings class
 **/

// Define the height and width of the screen
var height = window.innerHeight,
    width = window.innerHeight;

/**
 * Settings Class. Checks and sets the default if they do not exist
 * @class
 **/
function Settings(){
  this.set('field_of_view',       this.get('field_of_view')         || 75                 );
  this.set('screen_aspect_ratio', this.get('screen_aspect_ratio')   || width/height       );
  this.set('min_render_distance', this.get('min_render_distance')   || 0.000001           );
  this.set('max_render_distance', this.get('max_render_distance')   || 999999999999999999 );
  this.set('antialiasing',        this.get('antialiasing')          || true               );
  this.set('fullscreen',          this.get('fullscreen')            || true               );
  this.set('language',            this.get('language')              || "en"               );
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
 * @param {string} key - Key of the value to set
 * @param {string} value - Value corresponding to the key
 **/
Settings.prototype.set = function(key, value){
  window.localStorage[key] = value;
};
