/**
 * @file Contains the render loop function
 */


function render(){
  isRendering = true;
  requestAnimationFrame( render );

  update();

  renderer.render( scene, camera );
}
