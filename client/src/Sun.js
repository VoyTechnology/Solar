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

	var sunLight = new THREE.PointLight( lumcolor, intensity, range );
	sunLight.position.set(0,0,0);
	sunLight.castShadow = true;
	sunLight.shadowCameraNear = 10;
	sunLight.shadowCameraFar = Math.pow(2,53)-1;
	sunLight.shadowCameraFov = 10;
	sunLight.shadowBias = -0.00021;
	sunLight.shadowDarkness = 0.9;
	sunLight.shadowMapWidth = 4096;
	sunLight.shadowMapHeight = 4096;
	sunLight.shadowCameraVisible = true;
	sunLight.target = camera;
	scene.add(sunLight);

	scene.add(this.sunObj);
	return this.sObj;
};
