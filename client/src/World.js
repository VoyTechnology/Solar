/**
 * @file Contains the world function which populates the scene
 */

 /**
  * The World class containing the entire world of the game
  * @class
  */
function World(){
  this.planets = [];
  this.sun = {};

  /* Create individual Planets */
  for(var pi = 0; pi < config.planets.length; pi++){
    this.planets.push( new Planet( config.planets[pi] ) );
  }

  this.create();
}

/**
 * Creates the world. No need to run as the constructior does it
 * @method
 */
World.prototype.create = function(){

  log.debug("World Initialization Started");

  // Add ambient lighting to all objects
  var ambientLight = new THREE.AmbientLight( 0x070707 );
  scene.add(ambientLight);

  // Add stars
  var star;
  var starGeom = new THREE.Geometry();
  for( var i = 0; i < 10000; i++){
    star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    star.y = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    star.z = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    starGeom.vertices.push( star );
  }
  var stars = new THREE.PointCloud( starGeom, new THREE.PointCloudMaterial( { color: 0xffffff } ) );
  scene.add(stars);

  // Add the sun
  this.sun = new Sun(m(config.sun.size), 0xffffdd, 0xfffffe, 0.8, Infinity);



  this.update();
};

/**
 * Updates the world
 * @method
 * @param {Number} delta - The delta time
 */
World.prototype.update = function( delta ){
  this.sun.update();

  for(var pi = this.planets.length - 1; pi >= 0; pi--){
    this.planets[pi].update( delta );
  }

};
