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

/**
 * Sends a public message to everybody
 * @method
 * @param {object} input - full input of the chat
 */
Gonsole.prototype.sendPublic = function( input ){
  var message = {
    timestamp: (new Date()).getTime(),
    reciepients: [],
    text: input.join(" ")
  };

  connection.sendMessage( message );

  this.log("&lt;<gre timestamp='"+message.timestamp+"'>"+settings.get('username')+"</gre>&gt; "+input.join(" "));
};


/**
 * Checks is there something inputed in the chat console
 * @method
 */
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


/**
 * Appends an error to the message to inform the user about the problem
 * @method
 * @param {object} data - Error data to be inserted
 */
Gonsole.prototype.revertMessage = function( data ){
  $("gre[timestamp='"+data.original.timestamp+"']")
    .css("color", "red")
    .append(" Error: "+ data.error.reasonText);
};

/**
 * Removes the first element from the gonsole
 * @method
 */
Gonsole.prototype.clearFirst = function(){
  var total_height = 0;
  $(".gonsole .content").find('ge').each(function(){
    total_height += $(this).height();
  });

  console.log(total_height);

  var wrapper_height = $(".gonsole").height();
  console.log(wrapper_height);

  while(total_height > wrapper_height-20){
    console.log("lol");
    var el = $(".gonsole .content").find('ge').first();
    total_height -= el.height();
    el.remove();
  }

};
