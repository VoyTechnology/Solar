/**
 * @file Contains the world function which populates the scene
 */

function world(){
  log.debug("world Initialized");

  // Add ambient lighting to all objects
  var ambientLight = new THREE.AmbientLight( 0x070707 );
  scene.add(ambientLight);

  // Add stars
  var starGeom = new THREE.Geometry();
  for( var i = 0; i < 10000; i++){
    var vertex = new THREE.Vector3();
    vertex.x = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    vertex.y = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    vertex.z = THREE.Math.randFloatSpread( Math.pow(2, 53)-1 );
    starGeom.vertices.push( vertex );
  }
  var stars = new THREE.PointCloud( starGeom, new THREE.PointCloudMaterial( { color: 0xffffff } ) );
  scene.add(stars);

  // Add the sun
  var sun = new Sun(400, 0xffffdd, 0xfffffe, 0.8, 10000000);

  /* Create individual Planets */
  for(var p = 0; p < config.planets.length; p++){
    planets.push( new Planet( config.planets[p] ) );
  }
}
