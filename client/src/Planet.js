/**
 * @file Contains the Planet class
 */

/**
 * The Planet Class, returns a planet
 * @class
 */
function Planet( properties ){
	this.properties = properties;

	log.debug(this.properties.name + " Initialized");


	this.distance = this.properties.distance;

	var radius = this.properties.radius;

	// Create the 3D geometry
	var planetMesh = new THREE.BoxGeometry(1,1,1, 80,80,80 );


	if(this.properties.type == "gas" || this.properties.type == "water"){

		for (var vf = planetMesh.vertices.length - 1; vf >= 0; vf--) {
			planetMesh.vertices[vf].normalize().multiplyScalar(radius);
		}

	} else {

		for (var vr = planetMesh.vertices.length - 1; vr >= 0; vr--) {
			planetMesh.vertices[vr].normalize().multiplyScalar(radius - Math.random()*(radius/100));
		}

	}

	planetMesh.computeFaceNormals();
	planetMesh.computeVertexNormals();


	var planetMaterial = new THREE.MeshLambertMaterial({
		color: this.resolveColour(),
		wireframe: settings.get('wireframe') == 'true'
	});
	this.planetObject = new THREE.Mesh( planetMesh, planetMaterial );

	scene.add(this.planetObject);

	this.setOrbitTime(this.properties.distance);

	//this.update();
}


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
	this.planetObject.position.set(
		(player.chunk.x * -1000) + (this.distance * Math.cos( Date.now() / this.orbitTime )),
		(player.chunk.y * -1000),
		(player.chunk.z * -1000) + (this.distance * Math.sin( Date.now() / this.orbitTime ))
	);
};

/**
 * Gets the planet object
 * @method
 * @returns {Object} THREE.js object
 */
Planet.prototype.getObject = function(){
	return this.planetObject;
};

Planet.prototype.resolveColour = function(){
	switch(this.properties.type){
		case 'rock':
			return 0x3E2723;
		case 'metal':
			return 0x424242;
		case 'green':
			return 0x2E7D32;
		case 'water':
			return 0x1976D2;
		case 'gas':
			return 0xCDDC39;
	}
};
