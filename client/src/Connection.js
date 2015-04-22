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
  this.messages = 0;

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
    id: settings.get('id'),
    token: settings.get('token')
  });

  that._socket.on('accepted', function( data ){
    that.established = true;
    that.authorised = true;
    try {
      player.loadShip( 'astratis_v1' );
    } catch(e){

    }


    log.info("Connected to server");

    hide_loading_window();

    player.setCamera({
      position: data.position,
      rotation: data.orientation
    },settings.get('id'));

    player.controls.update( clock.getDelta() );

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
      timestamp: Date.now(),
      id: player.id,
      position: pos,
      orientation: {
        x: rot.x,
        y: rot.y,
        z: rot.z
      }
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
        for(var i = data.players.added.length - 1; i >= 0; i--){
          players.push( new OtherPlayer( data ) );
        }
        for(var d = data.players.removed.length -1; i >= 0; i--){
          for(var p = players.length - 1; p >= 0; p--){
            if(data.players.removed[d].id == players[p].id){
              delete players[p];
              break;
            }
          }
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

/**
 * Sends a message to the server and clears the old message
 * @method
 * @param {object} sendData - The data to send to the server
 */
Connection.prototype.sendMessage = function( sendData ){
  var that = this;

  if(that.authorised){

    that._socket.emit('chat', {
      timestamp: sendData.timestamp,
      originator: settings.get('username'),
      recipient: sendData.reciepients,
      text: sendData.text
    });

    gonsole.clearFirst();

  }
};

/**
 * Listens for incoming messaged and appends them to the chat
 * @method
 */
Connection.prototype.listenForChat = function () {
    var that = this;

    that._socket.on('chat', function(data){

      gonsole.clearFirst();

      if(data.recipient.length === 0){
        gonsole.log("&lt;<gre>"+data.originator+"</gre>&gt; " + data.text);
      } else {
        gonsole.log("[ <gre>"+data.originator+"->me</gre> ] " + data.text);
      }
    });

    that._socket.on("chatError", function(data) {
      gonsole.revertMessage( data );
    });
};
