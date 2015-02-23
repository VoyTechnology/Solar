/**
 * @file Contains the world function which populates the scene
 */

function world(){

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
  var sun = new Sun(1, 0xffffff, 0xffffff, 0.8, 10000000);

  // Create and add a planet
  var planet = new Planet(1, 3, 0, 10, "../res/icons/2_no_clouds_8k.jpg");
  scene.add(planet);

  // Move the camera back
  camera.position.z = 15;
}
