/**
 * @file Stores the OtherPlayer class
 */

/**
 * Stores the information about other players
 * @class
 */
var OtherPlayer = function( data ){

  this.id = data.id;
  this.username = data.username;

  this.ship = new Ship( data.ship || 'astratis_v1');

  this.update( data );

};

/**
 * Updates the location of the ship
 * @method
 */
OtherPlayer.prototype.update = function( data ){
  if( this.ship.loaded ) this.ship.update({
    position: {
      x: (player.chunk.x * -1000) + data.position.x,
      y: (player.chunk.y * -1000) + data.position.y,
      z: (player.chunk.z * -1000) + data.position.z
    },
    rotation: data.orientation
  });
};
