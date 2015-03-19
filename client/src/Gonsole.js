/**
 * @file Stores the Gonsole class
 */

/**
 * Handles the game console
 * @class
 */
var Gonsole = function () {

};

/**
 * Logs the message
 * @method
 * @param {string} msg - Message to log
 */
Gonsole.prototype.log = function (msg) {
    $('.gonsole .content').append("<ge>" + msg + "</ge>");
};

/**
 * Clears the input
 * @method
 */
Gonsole.prototype.clrin = function () {
    $('#ginput').val("");
};


Gonsole.prototype.runCmd = function( input ){
    switch( input[0] ){
        case '/clear':
            $('.gonsole .content').empty();
            break;

        case '/devtools':
            if (dev) {
                gui.Window.get().showDevTools();
            } else {
                log.error("Whatya doin.");
            }
            break;

        case '/test':
            test();
            break;

        case '/version':
            //log.info("Solar v" + package.version);
            break;

        case '/m':
            this.sendPrivate( input );
            break;

        default:
            log.error('Unknown command ' + msg[0]);
            break;
    }
};

/**
 * Check the input that the user entered
 * @method
 */

Gonsole.prototype.sendPrivate = function( input ){
  input.shift();

  var reciepients = input[0].split(",");

  input.shift();

  var message = {
    timestamp: (new Date()).getTime(),
    reciepients: reciepients,
    text: input.join(" ")
  };

  connection.sendMessage( message );

  this.log("[<gre timestamp='"+message.timestamp+"'>me->"+reciepients.join(", ")+"</gre>] "+input.join(" "));

};

Gonsole.prototype.sendPublic = function( input ){
  var message = {
    timestamp: (new Date()).getTime(),
    reciepients: [],
    text: input.join(" ")
  };

  connection.sendMessage( message );

  this.log("&lt;<gre timestamp='"+message.timestamp+"'>"+settings.get('username')+"</gre>&gt; "+input.join(" "));
};

Gonsole.prototype.checkInput = function(){
  var raw = $('#ginput').val();

  if(raw.length !== 0){
    var input = raw.split(" ");

    if(input[0].charAt(0) == "/"){
      this.runCmd( input );
    } else {
      this.sendPublic( input );
    }
  }

  this.clrin();
};

Gonsole.prototype.revertMessage = function( data ){
  $("gre[timestamp='"+data.original.timestamp+"']")
    .css("color", "red")
    .append(" Error: "+ data.error.reasonText);
};

Gonsole.prototype.clearFirst = function(){
  $(".gonsole .content").find('ge').first().remove();
};
