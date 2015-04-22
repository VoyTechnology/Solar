/**
 * @file Contains the Ship class
 */

/**
 * Ship Class
 * @class
 */
var Ship = function( shipName, isPlayerControling ){

  this.loaded = false;
  this.model = {};

  this._shipConfig = require('../assets/ships/'+shipName+'/ship.json');

  var loader = new THREE.ColladaLoader();

  loader.options.convertUpAxis = true;

  var that = this;

  if(isPlayerControling){
    this.interiorLight = new THREE.PointLight(0x222222, 0.5, 0);
    scene.add( this.interiorLight );
  }

  loader.load('../assets/ships/'+ shipName + '/' + that._shipConfig.model + '.dae', function( collada ){
    dae = collada.scene;
    dae.scale.x = dae.scale.y = dae.scale.z = m(that._shipConfig.size);
    dae.updateMatrix();

    that.model = dae;

    scene.add( that.model );
    that.loaded = true;
    log.debug(shipName + " loaded");

  });
};

/**
 * Updates the location of player's ship
 * @method
 * @param {object} data - data to update with
 */
Ship.prototype.update = function( data ){
  this.model.position.x = data.position.x;
  this.model.position.y = data.position.y;
  this.model.position.z = data.position.z;

  if(this.interiorLight) this.interiorLight.position.set(data.position.x, data.position.y, data.position.z);

  this.model.rotation.x = data.rotation.x;
  this.model.rotation.y = data.rotation.y + Math.PI;
  this.model.rotation.z = -data.rotation.z;
};

Ship.prototype.getFlightControls = function(){
   return this._shipConfig;
};
