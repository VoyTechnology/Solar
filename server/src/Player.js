var Constants = require("./Constants.js");

function Player() {
	this.username = "";
	this.password = "";
	this.position = {x:0, y:0, z:0};
	this.direction = {xAngle:0, yAngle:0, zAngle:0};
	this.maxSpeed = 50;
	this.playersInRange = [];

	this.playerUandP = function(username, password) {
		this.username = username;
		this.password = password;
		this.position = {x:0, y:0, z:0};
		this.direction = {xAngle:0, yAngle:0, zAngle:0};
		this.maxSpeed = 50;
		this.playersInRange = [];
	};

	this.playerFromDoc = function(doc) {
		this.username = doc.username;
		this.password = doc.password;
		this.position = doc.position;
		this.direction = doc.direction;
		this.maxSpeed = doc.maxSpeed;
		this.playersInRange = doc.playersInRange;
		this._id = doc._id;
	};

	switch (arguments.length) {
		case 2 :
			this.playerUandP(arguments[0], arguments[1]);
			break;
		case 1 :
			this.playerFromDoc(arguments[0]);
			break;
	}
}

Player.prototype.canMoveHere = function(desiredLocation) {
	var desiredSpeed = Math.sqrt(
		Math.pow((desiredLocation.x - this.position.x),2) +
		Math.pow((desiredLocation.y - this.position.y),2) +
		Math.pow((desiredLocation.z - this.position.z),2)
	);

	if (desiredSpeed > this.maxSpeed) {
		return false;
	}
	else if (desiredLocation.x > Constants.mapSize || desiredLocation.x < 0 ||
		desiredLocation.y > Constants.mapSize || desiredLocation.y < 0 ||
		desiredLocation.z > Constants.mapSize || desiredLocation.z < 0 ) {
		return false;
	}
	else {
		return true;
	}
};

Player.prototype.canTurnHere = function(desiredDirection) {
	if (desiredDirection.xAngle > 2*Math.PI || desiredDirection.xAngle < 0 ||
		desiredDirection.yAngle > 2*Math.PI || desiredDirection.yAngle < 0) {
		return false;
	}
	else {
		return true;
	}
};

module.exports = Player;
