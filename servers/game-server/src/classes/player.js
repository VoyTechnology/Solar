/*
The class used to store player information inside ram.
*/

function Player(doc, socket) {

	// establishing player variables
	this.loggedIn = true;
	this.id = doc.id;
	this.username = doc.username;
	this.ship = doc.ship;
	this.orientation = doc.orientation;
	this.position = doc.position;
	this.moveDistanceAvailable = config.PlayerMoveDistanceAvailable;
	this.socket = socket;

}

// function that returns a boolean indicating if a player can possibly move to a desired location.
Player.prototype.canMoveHere = function(desiredLocation) {
	var response;

	var desiredDistance = Math.sqrt(
		Math.pow((desiredLocation.x - this.position.x),2) +
		Math.pow((desiredLocation.y - this.position.y),2) +
		Math.pow((desiredLocation.z - this.position.z),2)
	);

	if (desiredDistance > this.moveDistanceAvailable)
	{
		response = {
			success : false,
			message : "tooFar"
		};
	}
	else {
		response = {
			success : true,
			distanceMoved : desiredDistance
		};
	}

	return response;
};

// function that returns a distance between two players.
Player.prototype.distanceBetweenPlayers = function(Player) {
	return Math.sqrt (
		Math.pow((Player.orientation.x - this.orientation.x),2) +
		Math.pow((Player.orientation.y - this.orientation.y),2) +
		Math.pow((Player.orientation.z - this.orientation.z),2)
	);
};

/*
this function is used for managing the speed at which a
player is travelling and making sure he does not go over it.
*/
Player.prototype.addAvailableDistance = function(distance) {
	this.moveDistanceAvailable += distance;
};

/*
this function is used for managing the speed at which a
player is travelling and making sure he does not go over it.
*/
Player.prototype.subtractAvailableDistance = function(distance) {
	this.moveDistanceAvailable -= distance;
};

// this function returns the essential details of a player.
Player.prototype.getEssentialDetails = function() {
	var message = {
		username : this.username,
		id : this.id,
		ship : this.ship,
		position : this.position,
		orientation : this.orientation
	};

	return message;
};

module.exports = Player;
