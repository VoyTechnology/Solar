/**
 * Sun class. Contains all function related to the sun
 * @class
 **/
var Sun = function( size, color, lumcolor, intensity, range ){
	this.size = size;
	this.color = color;
	this.lumcolor = lumcolor;
	this.intensity = intensity;
	this.range = range;

	var sunMesh = new THREE.SphereGeometry( 1, 40, 40);

	var sunMaterial = new THREE.MeshBasicMaterial({color: this.color});

	this.sunObj =  new THREE.Mesh( sunMesh, sunMaterial );

	this.sunObj.position.set(0,0,0);
	this.sunObj.scale.set(size*2, size*2, size*2);

	this.sunLight = new THREE.PointLight( lumcolor, intensity, range );
	this.sunLight.position.set(0,0,0);
	this.sunLight.castShadow = true;
	this.sunLight.shadowCameraNear = 10;
	this.sunLight.shadowCameraFar = player.camera.far;
	this.sunLight.shadowCameraFov = player.camera.fov;
	this.sunLight.shadowBias = -0.00021;
	this.sunLight.shadowDarkness = 0.9;
	this.sunLight.shadowMapWidth = 4096;
	this.sunLight.shadowMapHeight = 4096;
	this.sunLight.shadowCameraVisible = true;
	scene.add(this.sunLight);

	scene.add(this.sunObj);
};

Sun.prototype.update = function(){
	this.sunObj.position.set(player.chunk.x * -1000, player.chunk.y * -1000, player.chunk.z * -1000);
	this.sunLight.position.set(
		this.sunObj.position.x,
		this.sunObj.position.y,
		this.sunObj.position.z
	);
};
