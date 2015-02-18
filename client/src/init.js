/**
 * @file Stores function responsible for starting the game
 */

function init(){

  // Assign values to their corresponding definitions
  settings  = new Settings();
  log       = new Logger("Logger initialized");
  gonsole   = new Gonsole();
  connection =  new Connection();

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  // Create a new camera and cast the return values from the settings to ints
  camera = new THREE.PerspectiveCamera(
    +settings.get('field_of_view'),
    +settings.get('screen_aspect_ratio'),
    +settings.get('min_render_distance'),
    +settings.get('max_render_distance')
  );

  controls = new THREE.FlyControls( camera );

  renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialiasing: !!settings.get('antialiasing')
  });

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  // Temporary values
  controls.movementSpeed = 10;
  controls.domElement = renderer.domElement ;
  controls.rollSpeed = Math.PI / 15;
  controls.autoForward = false;
  controls.dragTolook = false;

  // Initialize the world
  world();

  // Start the rendering loop
  render();
}
