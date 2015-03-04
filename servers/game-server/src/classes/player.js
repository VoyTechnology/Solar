function Player() {

	this.PlayerUandP = function(username, password, socket) {
		this.loggedIn = false;
		this.username = username;
		this.password = password;
		this.orientation = {x:0, y:0, z:0};
		this.direction = {x:0, y:0, z:0};
		this.moveDistanceAvailable = global.server.config.PlayerMoveDistanceAvailable;
		this.playersInRange = [];
	};

	this.PlayerFromDoc = function(doc, socket) {
		this.loggedIn = false;
		this.username = doc.username;
		this.ship = "CoolShip";
		this.password = doc.password;
		this.orientation = doc.orientation;
		this.direction = doc.direction;
		this.moveDistanceAvailable = global.server.config.PlayerMoveDistanceAvailable;
		this._id = doc._id;
		this.socket = socket;
		this.playersInRange = [];
	};

	switch (typeof arguments[0]) {
		case "string" :
			this.PlayerUandP(arguments[0], arguments[1]);
			break;
		case "object" :
			this.PlayerFromDoc(arguments[0], arguments[1]);
			break;
	}
}

Player.prototype.canMoveHere = function(desiredLocation) {
	var response;

	var desiredDistance = Math.sqrt(
		Math.pow((desiredLocation.x - this.orientation.x),2) +
		Math.pow((desiredLocation.y - this.orientation.y),2) +
		Math.pow((desiredLocation.z - this.orientation.z),2)
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

Player.prototype.distanceBetweenPlayers = function(Player) {
	return Math.sqrt (
		Math.pow((Player.orientation.x - this.orientation.x),2) +
		Math.pow((Player.orientation.y - this.orientation.y),2) +
		Math.pow((Player.orientation.z - this.orientation.z),2)
	);
};

Player.prototype.addAvailableDistance = function(distance) {
	this.moveDistanceAvailable += distance;
};

Player.prototype.subtractAvailableDistance = function(distance) {
	this.moveDistanceAvailable -= distance;
};

Player.prototype.getEssentialDetails = function() {
	var message = {
		username : this.username,
		ship : this.ship,
		position : this.position,
		orientation : this.orientation
	};

	return message;
};

Player.prototype.getMoveMessageDetails = function(timestamp) {
	var message = {
		timestamp : timestamp,
		username : this.username,
		position : this.position,
		orientation : this.orientation
	};

	return message;
};

module.exports = Player;
