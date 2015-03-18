/**
 * @file Stores the server connection class
 */

/**
 * Stores the server connection
 * @class
 */
var Connection = function( gameServerAddress ){
  var that = this;

  // Check is the connection established
  this.established = false;
  this.authorised = false;

  this._socket = io(gameServerAddress);

  this._socket.on('connection', function(){
    log.debug("Connection Initialized");

    that.established = true;
    console.log(that);
  });


};

/**
 * Connects to the server
 * @method
 */
Connection.prototype.connect = function(){
  var that = this;

  that._socket.emit('start', {
    id: +settings.get('username'),
    token: settings.get('token')
  });

  that._socket.on('accepted', function( data ){
    that.established = true;
    that.authorised = true;
    player.loadShip( 'astratis_v1' );

    log.info("Connected to server");

    new Event('server_connected');

    player.setCamera({position: data.position, rotation: data.orientation});

    // Clear the token
    settings.set('token', '');
  });

  that._socket.on('rejected', function( data ){
    that.established = true;
    that.authorised = false;

    settings.set('token', '');

    // Exit with status 801: Server rejected access
    that.disconnect('Rejected');
    game_exit_error(801, data.reasonText);
  });

  that._socket.on('disconnect', function( data ){
    game_exit_error(0, data.reasonText);
  });

};

/**
 * Sends the 'move' message to the server
 * @method
 * @param {Object} pos - Position of the player
 * @param {Object} rot - Rotation of the player
 */
Connection.prototype.updateLocation = function(pos, rot){
  var that = this;

  if(that.authorised){
    that._socket.emit('move', {
      timestamp: (new Date()).getTime(),
      id: +settings.get('username'),
      position: pos,
      orientation: rot
    });
  }
};

/**
 * Gets other players
 * @method
 */
Connection.prototype.otherPlayers = function(){
  var that = this;

  if(that.authorised){
      that._socket.on('otherPlayers', function(data){
        for(var i = data.players.length - 1; i >= 0; i--){
          players.push( new OtherPlayer( data ) );
        }
      });
  }

  this.updateOthers();
};

/**
 * Listens for  the 'move' message from the server
 * @method
 */
Connection.prototype.updateOthers = function(){

  var that = this;

  if(that.authorised){
    that._socket.on('move', function(data){
      for(var i = players.length - 1; i >= 0; i--){
        if(data.id == players[i].id){
          players[i].update( data );

          return;
        }
      }

      players.push( new OtherPlayer( data ) );

    });
  }
};


/**
 * Disconnects from the server
 * @method
 * @param {string} msg - Message to send to the server
 */
Connection.prototype.disconnect = function(msg){
  var that = this;

  that._socket.emit('disconnect', {
    'reasonText': msg
  });
};

Connection.prototype.sendMessage = function (recipients, msg) {
     var that = this;

     if (that.authorised) {

         /*
            temporary fix for the no usernames problem
         */

         var username = "";
        
         switch(+settings.get('username')) {

             case 0 : username = "james"; break;
             case 1 : username = "woj"; break;
             case 2 : username = "mladen"; break;
             default : username = "testun" + (+settings.get('username')).toString(); break;

        }

         /*

         */

         var messageData = {
             timestamp: (new Date()).getTime(),
             id: +settings.get('username'),
             originator: username,
             recipient: recipients,
             text: msg
         };

         that._socket.emit('chat', messageData);

         log.debug(messageData);

         var gonsoleLogMessage = "";
         if(recipients.length === 0) {
             gonsoleLogMessage += "(G)";
         }
         gonsoleLogMessage += "you : ";
         gonsoleLogMessage += msg;

         gonsole.log(msg);
     }
};

Connection.prototype.listenForChat = function () {
    var that = this;

    that._socket.on('chat', function(data){
        var msg = "";

        if(data.recipient.length === 0) {
            msg += "(G)";
        }

        msg += data.originator +" : ";
        msg += data.text;
        gonsole.log(msg);
    });

    that._socket.on("chatError", function(data) {
        log.warning("Chat Error");
        log.warning(data.error.reasonText);
    });
};
