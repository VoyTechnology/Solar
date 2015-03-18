/**
 * @file Contains the Planet class
 */

/**
 * The Planet Class, returns a planet
 * @class
 */
var Planet = function(prop){
	log.debug(prop.name + " Initialized");

	var texture = "";

	var pMesh = new THREE.SphereGeometry( 1, 100, 100);

	var planetMesh = new THREE.BoxGeometry(1,1,1, 100,100,100 );

	for (var i = planetMesh.vertices.length - 1; i >= 0; i--) {
		planetMesh.vertices[i].normalize().multiplyScalar(prop.radius);
	}

	var pTexture = new THREE.ImageUtils.loadTexture( texture );

	var pMaterial = new THREE.MeshLambertMaterial();
	//var pMaterial = new SolarShader.planetShader();

	this.pObj = new THREE.Mesh( planetMesh, pMaterial );

	//this.pObj.scale.set(prop.radius*2, prop.radius*2, prop.radius*2);

	scene.add(this.pObj);

	this.setDistance(prop.distance);
	this.setOrbitTime(prop.distance);

	this.update();

};

/**
 * Sets the distance away from the sun
 * @method
 */
Planet.prototype.setDistance = function(distance){
	this.distance = distance;
};

/**
 * Sets the orbit time
 * @method
 */
Planet.prototype.setOrbitTime = function(otime){
	// Orbit time is provided in seconds
	this.orbitTime = otime*1000;
};

/**
 * Updates the location of the planet
 * @method
 */
Planet.prototype.update = function( delta ){
	this.pObj.position.x = this.distance * Math.cos( ( (new Date()).getTime() / this.orbitTime ));
	this.pObj.position.z = this.distance * Math.sin( ( (new Date()).getTime() / this.orbitTime ));
};

/**
 * Gets the planet object
 * @method
 * @returns {Object} THREE.js object 
 */
Planet.prototype.getObject = function(){
	return this.pObj;
};
