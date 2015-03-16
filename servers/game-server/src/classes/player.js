function Player() {

	this.register = function(username, id, socket) {
		var doc = {
			username : username,
			id : id,
			orientation : {x:0, y:0, z:0},
			position : {x:0, y:0, z:0},
			ship : "CoolShip"
		};

		global.server.db.players.insert(doc);

		this.loggedIn = true;
		this.username = username;
		this.id = id;
		this.orientation = {x:0, y:0, z:0};
		this.position = {x:0, y:0, z:0};
		this.ship = "CoolShip";
		this.moveDistanceAvailable = global.server.config.PlayerMoveDistanceAvailable;
		this.socket = socket;
	};

	this.loadFromDB = function(doc, socket) {
		this.loggedIn = true;
		this.id = doc.id;
		this.username = doc.username;
		this.ship = doc.ship;
		this.orientation = doc.orientation;
		this.position = doc.position;
		this.moveDistanceAvailable = global.server.config.PlayerMoveDistanceAvailable;
		this.socket = socket;
	};

	switch (typeof arguments[0]) {
		case "string" :
			this.register(arguments[0], arguments[1]);
			break;
		case "object" :
			this.loadFromDB(arguments[0], arguments[1]);
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

Player.prototype.getDetailsForDatabase = function() {
	var details = {
		username : this.username,
		id : this.id,
		orientation : this.orientation,
		position : this.position,
		ship : this.ship
	};

	return details;
};

module.exports = Player;
