/**
 * @file Contains the Planet class
 */

/**
 * The Planet Class, returns a planet
 * @method
 */
var Planet = function(size, posx, posy, posz, texture, clouds){

	var pMesh = new THREE.SphereGeometry( 1, 100, 100);

	var pTexture = new THREE.ImageUtils.loadTexture( texture );

  var pMaterial = new THREE.MeshLambertMaterial({map: pTexture});
	var pObj = new THREE.Mesh( pMesh, pMaterial );

	pObj.position.set(posx, posy, posz);
	pObj.scale.set(size*2, size*2, size*2);

	return pObj;
};
