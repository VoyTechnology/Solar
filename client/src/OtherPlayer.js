var OtherPlayer = function( data ){

  this.id = data.id;
  this.username = data.username;

  this.ship = new Ship( data.ship || 'astratis_v1');

  this.update( data );

};


OtherPlayer.prototype.update = function( data ){
  if( this.ship.loaded ) this.ship.update({position: data.position, rotation: data.orientation });
};
