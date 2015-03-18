/**
 * @file Stores function responsible for starting the game
 */

function init(){

  // Assign values to their corresponding definitions
<<<<<<< HEAD
  settings  =   new Settings(config.defaults);
  log       =   new Logger("Logger initialized");
  connection=   new Connection();
  gonsole   =   new Gonsole();
  player    =   new Player();

  // setTimeout( function(){
  //   var connected_event = new Event('server_connected');
  //   connection.established = true;
  // }, 1000);

  document.addEventListener('server_connected', hide_loading_window());

  // Try to connect and then wait to see was connection successful
  connection.connect();
  connection.otherPlayers();

=======
  settings  = new Settings();
  log       = new Logger("Logger initialized");
  gonsole   = new Gonsole();
  connection =  new Connection("Connection...");
>>>>>>> 0fc9e7c816543e0f31ed0474f5c7579ef4c4f65a


  setTimeout(function(){

    if(!connection.established){
      game_exit_error(802);
    } else {
      connection.updateOthers();
    }
  // Wait until displaying the error message
  },config.connectionTimeout);


  scene = new THREE.Scene();
  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialiasing: !!settings.get('antialiasing')
  });

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  //player.loadShip( 'Astratis' );

  // Temporary values
  player.controls.movementSpeed = 1000;
  player.controls.domElement = renderer.domElement ;
  player.controls.rollSpeed = Math.PI / 15;
  player.controls.autoForward = false;
  player.controls.dragTolook = false;

  // Initialize the world
  world();

  // Start the rendering loop
  render();
}
