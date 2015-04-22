/**
 * @file Contains the Player class
 */

/**
 * Player class - stores the player's information
 * @class
 */
var Player = function(){
  this.ship = {};
  this.id = null;

  this.camera = new THREE.PerspectiveCamera(
    +settings.get('field_of_view'),
    +settings.get('screen_aspect_ratio'),
    +settings.get('min_render_distance'),
    +settings.get('max_render_distance')
  );

  this.position = {};
  this.chunk = {};
  this.tP = new THREE.Object3D();

  this.controls = new OldControls( this.tP );
  //this.controls.enable();

};

/**
 * Updates the player's location. Sets the chunks and relative position for the chunk system
 * @method
 * @param {Number} delta - The delta time
 */
Player.prototype.update = function( delta ){
  this.controls.update( delta );


  this.chunk = {
    x: ~~(this.tP.position.x / 1000),
    y: ~~(this.tP.position.y / 1000),
    z: ~~(this.tP.position.z / 1000)
  };

  this.position = {
    x: this.tP.position.x % 1000,
    y: this.tP.position.y % 1000,
    z: this.tP.position.z % 1000
  };

  this.camera.position.set(
    this.position.x,
    this.position.y,
    this.position.z
  );

  this.camera.rotation.set(
    this.tP.rotation.x,
    this.tP.rotation.y,
    this.tP.rotation.z
  );

  if(this.ship.loaded) this.ship.update( {
    'position': this.camera.position,
    'rotation': this.camera.rotation
  });
};

/**
 * Sets the camera position
 * @method
 */
Player.prototype.setCamera = function( data, id ){
  this.id = id;

  this.tP.position.x = data.position.x;
  this.tP.position.y = data.position.y;
  this.tP.position.z = data.position.z;

  this.camera.position.x = this.position.x;
  this.camera.position.y = this.position.y;
  this.camera.position.z = this.position.z;

  this.camera.rotation.x = data.rotation.x;
  this.camera.rotation.y = data.rotation.y;
  this.camera.rotation.z = data.rotation.z;
};

/**
 * Loads the player's ship
 * @method
 */
Player.prototype.loadShip = function( shipName ){
  this.ship = new Ship( shipName, true );

  //this.controls.setControlData( this.ship.getFlightControls() );
};
