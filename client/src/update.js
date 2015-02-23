/**
 * @file Contains the update function responsible for updating the scene before rendering
 */


var myLastPos;
var myLastDir;

var frameCount = 0;

function update(){
  frameCount++;

  if(frameCount % 60 === 0){
    // Do stuff every second
  }

  var delta = clock.getDelta();

  var myPos = camera.position;
  var myDir = camera.rotation;

  if( (myPos != myLastPos) || (myDir != myLastDir) ){
    connection.updateLocation(myPos, myDir);
  }

  myLastPos = myPos;
  myLastDir = myDir;

  //controls.movementSpeed = 0.33 * 10;
  controls.update( delta );
  controls.dragTolook = false;
}
