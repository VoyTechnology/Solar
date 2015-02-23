/**
 * @file Handles game menus
 */

// Which windows are currently open
var open = {
  "menu": false,
  "gonsole": false,

};

// Bind keyboard characters to special actions
$(document).keydown( function( e ){
  switch(config.keys[e.keyCode]){
    case 'ESC':
      if(open.gonsole){
        open.gonsole ^= 1;
        $('.gonsole').toggle();
      } else {
        open.menu ^= 1;
        $('#menu').toggle();
      }
      break;

    case 'GONSOLE':
      if(!open.menu){
        open.gonsole ^= 1;
        $('.gonsole').toggle();
      }
      break;

    case 'ENTER':
      if(open.gonsole){
        gonsole.checkInput();
      }
      break;
  }
});

$('#menu_resume').click( function(){
  open.menu ^= 1;
  $('#menu').toggle();
});

$('#menu_exit').click( function(){
  console.log("Quitting");
  gui.Window.get().close();
});
