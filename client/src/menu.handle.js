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
      if(player.controls.menu.gonsole){
        player.controls.menu.gonsole ^= 1;
        $('#ginput_wrap').toggle();
      } else {
        player.controls.menu.menu ^= 1;
        $('#menu').toggle();
      }
      break;

    case 'T':
      if(!player.controls.menu.menu && !player.controls.menu.gonsole){
        player.controls.enabled ^= 1;
        $('#ginput_wrap').toggle();
        $('#ginput').focus();
        gonsole.clrin();
        player.controls.menu.gonsole ^= 1;
      }
      break;

    case 'ENTER':
      if(player.controls.menu.gonsole){
        player.controls.enabled ^= 1;
        player.controls.menu.gonsole ^= 1;
        $('#ginput_wrap').toggle();
        gonsole.checkInput();
      }
      break;
  }
});

$('#menu_resume').click( function(){
  player.control.menu.menu ^= 1;
  $('#menu').toggle();
});

$('#menu_exit').click( function(){
  console.log("Quitting");
  closeWindow();
});
