/**
 * @file Stores function responsible for starting the game
 */

function init(){

  // Assign values to their corresponding definitions
  settings  =   new Settings(config.defaults);
  log       =   new Logger("Logger initialized");
  connection=   new Connection( settings.get('gameServerAddress') );
  gonsole   =   new Gonsole();
  player    =   new Player();

  scene = new THREE.Scene();
  clock = new THREE.Clock();
  // Initialize the world
  world = new World();

  document.addEventListener('server_connected', hide_loading_window());

  // Try to connect and then wait to see was connection successful
  connection.connect();
  connection.otherPlayers();
  connection.listenForChat();

  setTimeout(function(){

    if(!connection.established){
      game_exit_error(802);
    } else {
      connection.updateOthers();
    }

  // Wait until displaying the error message
  },config.connectionTimeout);

  renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true,
    antialiasing: Boolean(settings.get('antialiasing'))
  });

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  // Temporary values
  player.controls.movementSpeed = m(1000);
  player.controls.domElement = renderer.domElement ;
  player.controls.rollSpeed = Math.PI / 15;
  player.controls.autoForward = false;
  player.controls.dragTolook = false;

  // Start the rendering loop
  render();
}
