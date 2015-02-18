/**
 * @file Stores the server connection class
 */

/**
 * Stores the server connection
 * @class
 */
var Connection = function(){
  var connString = "";
  connString += config.server.protocol;
  connString += "://";
  connString += config.server.address;
  connString += ":";
  connString += config.server.port;
  connString += "/";

  console.log(connString);

  this.socket = io(connString);

  // Log if successfully connected
  this.socket.on('connect', function(){
    log.info("Connected to "+ config.server.address);
  });
};


// Placeholder for future function
Connection.prototype.updateLocation = function(pos, dir){

};
