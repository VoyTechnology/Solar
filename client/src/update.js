/**
 * @file Contains the update function responsible for updating the scene before rendering
 */


var myLastPos;
var myLastDir;

var myPos, myDir;

var frameCount = 0;

var delta;

function update(){
  delta = clock.getDelta();
  player.update( delta );
  world.update( delta );
  frameCount++;

  myPos = player.tP.position;

  myDir = player.tP.rotation;

  // Do actions every 60 frames
  // if(frameCount % 60 === 0){
  //
  // }

  // Do actions every 3 frames (20 times a second)
  if(frameCount % 3 === 0){
    //if( (myPos != myLastPos) || (myDir != myLastDir) ){
      connection.updateLocation(myPos, myDir);
    //}
  }

  myLastPos = player.tP.position;
  myLastDir = player.tP.rotation;
}
