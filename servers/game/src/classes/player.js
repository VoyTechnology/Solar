/*
The class used to store player information inside ram.
*/

function Player(doc, socket) {

	// establishing player variables
	this.loggedIn = true;
	this._id = doc._id;
	this.username = doc.username;
	this.ship = doc.ship;
	this.orientation = doc.orientation;
	this.position = doc.position;
	this.moveDistanceAvailable = args.pmda;
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
	var that = this;
	return function() {
		that.moveDistanceAvailable += distance;
	};
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
		_id : this._id,
		ship : this.ship,
		position : this.position,
		orientation : this.orientation
	};

	return message;
};

Player.prototype.addItems = function(itemsToAdd) {
	for (var i in this.items) {

		for(var j in itemsToAdd) {
			if (this.items[i].id == itemsToAdd[j].id) {

				this.items[i].quantity += itemsToAdd[j].quantity;
				itemsToAdd.splice(j, 1);
				break;

			}
		}

		if (itemsToAdd.length === 0) {
			return;
		}
	}

	for (var k in itemsToAdd) {
		this.items.push(itemsToAdd[k]);
	}
};

Player.prototype.removeItems = function(itemsToRemove) {
	for (var i in this.items) {

		for (var j in itemsToRemove) {
			if (this.items[i].id == itemsToRemove[j].id) {

				if (this.items[i].quantity == itemsToRemove[j].quantity) {
					this.items.splice(i, 1);
				}
				else {
					this.items[i].quantity -= itemsToAdd[j].quantity;
				}

				itemsToRemove.splice(j, 1);
				break;
			}
		}

		if (itemsToRemove.length === 0) {
			return;
		}
	}
};

Player.prototype.hasItems = function(itemsToFind) {
	for (var i in this.items) {

		for (var j in itemsToFind) {

			if (this.items[i].id == itemsToFind[j].id) {

				if (this.items[i].quantity < itemsToFind[j].quantity) {
					return 1;
				}
				else {
					itemsToFind.splice(j, 1);
					break;
				}

			}

		}

		if (itemsToFind.length === 0) {
			return 0;
		}

	}

	return 2;
};

module.exports = Player;
