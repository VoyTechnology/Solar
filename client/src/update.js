/**
 * @file Contains the update function responsible for updating the scene before rendering
 */


var myLastPos;
var myLastDir;

var myPos, myDir;

var frameCount = 0;



function update(){
  var delta = clock.getDelta();
  player.update( delta );
  frameCount++;

  myPos = {
    x: player.camera.position.x,
    y: player.camera.position.y,
    z: player.camera.position.z,
  };


  myDir = {
    x: player.camera.rotation.x,
    y: player.camera.rotation.y,
    z: player.camera.rotation.z,
  };

  // Do actions every 60 frames
  if(frameCount % 60 === 0){

  }

  // Do actions every 3 frames (20 times a second)
  if(frameCount % 3 === 0){
    if( (myPos != myLastPos) || (myDir != myLastDir) ){
      connection.updateLocation(myPos, myDir);
    }
  }

  // Update each planet
  for(var i = 0; i < planets.length; i++){
     planets[i].update( delta );
  }



  myLastPos = myPos;
  myLastDir = myDir;
}
