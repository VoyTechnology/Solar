/**
 * @file Contains helper functions
 */

function game_exit_error(code, msg){

  if(msg){
    $('#game_error #game_error_message').html(msg);
  } else {
    $('#game_error #game_error_message').html(getErrorMessage(code));
  }

  $('#game_error').show();

}

function getErrorMessage(code){

  return config.errors[code];

}

function closeWindow(){
  gui.Window.get().close();
  settings.set('token', "");
}

function hide_loading_window(){
  $('#game_loading').remove();
}

function set_camera(data){
  player.camera.position.x = data.position.x || settings.get('last_pos_x') || 0;
  player.camera.position.y = data.position.y || settings.get('last_pos_y') || 0;
  player.camera.position.z = data.position.z || settings.get('last_pos_z') || Mm(10);
}

function m(d){
  return d;
}

function km(d){
  return d * 1000;
}

function Mm(d){
  return d * 1000 * 1000;
}
