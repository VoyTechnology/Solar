var method = Player.prototype;

function Player(username, password) {
	this.username = username;
	this.password = password;
	this.position = {x:0, y:0, z:0};
	this.direction = {xAngle:0, yAngle:0};
}

module.exports = Player;