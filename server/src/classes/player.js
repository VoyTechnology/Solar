function Player() {
	this.loggedIn = false;
	this.username = "";
	this.password = "";
	this.position = {x:0, y:0, z:0};
	this.direction = {xAngle:0, yAngle:0, zAngle:0};
	this.maxSpeed = 50;
	this.PlayersInRange = [];

	this.PlayerUandP = function(username, password) {
		this.loggedIn = false;
		this.username = username;
		this.password = password;
		this.position = {x:0, y:0, z:0};
		this.direction = {xAngle:0, yAngle:0};
		this.maxSpeed = 50;
		this.PlayersInRange = [];
	};

	this.PlayerFromDoc = function(doc) {
		this.loggedIn = false;
		this.username = doc.username;
		this.password = doc.password;
		this.position = doc.position;
		this.direction = doc.direction;
		this.maxSpeed = doc.maxSpeed;
		this.PlayersInRange = doc.PlayersInRange;
		this._id = doc._id;
	};

	switch (arguments.length) {
		case 2 :
			this.PlayerUandP(arguments[0], arguments[1]);
			break;
		case 1 :
			this.PlayerFromDoc(arguments[0]);
			break;
	}
}

Player.prototype.canMoveHere = function(desiredLocation) {
	var response = {
		success : null,
		message : null
	};
	var desiredSpeed = Math.sqrt(
		Math.pow((desiredLocation.x - this.position.x),2) +
		Math.pow((desiredLocation.y - this.position.y),2) +
		Math.pow((desiredLocation.z - this.position.z),2)
	);

	if (desiredSpeed > this.maxSpeed)
	{
		response.success = false;
		response.message = "tooFar";
	}
	else if (desiredLocation.x > global.config.mapSize || desiredLocation.x < 0 ||
		desiredLocation.y > global.config.mapSize || desiredLocation.y < 0 ||
		desiredLocation.z > global.config.mapSize || desiredLocation.z < 0 ) {
		response.success = false;
		response.message = "invalidLocation";
	}
	else {
		response.success = true;
	}

	return response;
};

Player.prototype.canTurnHere = function(desiredDirection) {
	var response = {
		success : null,
		message : null
	};
	if (desiredDirection.xAngle > 2*Math.PI || desiredDirection.xAngle < 0 ||
		desiredDirection.yAngle > 2*Math.PI || desiredDirection.yAngle < 0) {
		response.success = false;
		response.message = "badAngle";
	}
	else {
		response.success = true;
	}
	return response;
};

Player.prototype.distanceBetweenPlayers = function(Player) {
		return Math.sqrt (
			Math.pow((Player.position.x - this.position.x),2) +
			Math.pow((Player.position.y - this.position.y),2) +
			Math.pow((Player.position.z - this.position.z),2)
		);

};

module.exports = Player;
