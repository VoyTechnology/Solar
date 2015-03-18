/**
 * @file Stores the server connection class
 */

/**
 * Stores the server connection
 * @class
 */
var Connection = function(){
  var that = this;

  // Check is the connection established
  this.established = false;
  this.authorised = false;

  var connString = "";
  connString += config.server.protocol;
  connString += "://";
  connString += config.server.address;
  connString += ":";
  connString += config.server.port;
  connString += "/";

  console.log(connString);

  this._socket = io(connString);

  this._socket.on('connection', function(){
    log.debug("Connection Initialized");

    that.established = true;
    console.log(that);
  });


};

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

Connection.prototype.disconnect = function(msg){
  var that = this;

  that._socket.emit('disconnect', {
    'reasonText': msg
  });
};

// Placeholder for future function
Connection.prototype.sendPrivateMessage = function(to, msg){
  var that = this;

  if(this._authorised){

  }
};

Connection.prototype.sendGlobalMessage = function(msg){
  var that = this;

  if(this._established){

  }
};
