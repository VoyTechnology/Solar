/**
 * @file Stores the Gonsole class
 */

/**
 * Handles the game console
 * @class
 */
var Gonsole = function(){

};

/**
 * Logs the message
 * @method
 * @param {string} msg - Message to log
 */
Gonsole.prototype.log = function(msg){
  $('.gonsole .content').append(msg + "\n");
};

/**
 * Clears the input
 * @method
 */
Gonsole.prototype.clrin = function(){
  $('#ginput').val("");
};

/**
 * Check the input that the user entered
 * @method
 */
Gonsole.prototype.checkInput = function(){

  var cmds = $('#ginput').val();

  if(cmds.length !== 0){
    var cmd = cmds.split(" ");

    switch(cmd[0]){
      case 'clear':
        $('.gonsole .content').empty();
        break;

      case 'devtools':
        if(dev){
          gui.Window.get().showDevTools();
        } else {
          log.error("Whatya doin.");
        }
        break;

      case 'test':
        test();
        break;

      case 'version':
        log.info("Solar v"+ package.version);
        break;

      default:
        log.error('Unknown command ' + cmd[0]);
        break;
    }

    // Clear the input at the end
    this.clrin();

  }
};
