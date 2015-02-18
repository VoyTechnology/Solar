// Standard stuff
var app = require('express')();
var socket = require('socket.io');
var server = app.listen(3000);
var io = socket.listen(server);

// Database initialisation
var mongojs = require('mongojs');
var db = mongojs("solar", ["players"]);

// Custom class declerations
var Player = require("./src/Player.js");

// Server
io.on("connection", function(socket) {
	console.log("Someone connected");
	var loggedIn = false;
	var thisPlayer;

	socket.on("register", function(data) {
		console.log("attempted registration");
		db.players.count({ username: data.username }, function (err, count) {
  			if (count) {
  				socket.emit("registerFail",{
  					id: 0,
  					message: "Username taken"
				});
  			}
  			else if (data.password.length < 4) {
  				socket.emit("registerFail",{
  				 id: 1,
  				 message: "Password too short"
  				});
  			}
  			else {
  				var newPlayer = new Player(data.username, data.password);
  				db.players.save(newPlayer, function(err) {
  					if (err) {
  						console.log("error saving model of newly registered player");
  					}
  					else {
  						console.log("Successful registration!");
  					}
  				});
  				socket.emit("registerSuccess");
  			}
		});
	});

	socket.on("login", function(data) {
		console.log("attempted login");
		if (loggedIn) {return;}
		db.players.findOne({username: data.username}, function(err, doc) {
			if (doc === null) {
				socket.emit("loginFail");
			}
			else if (data.password != doc.password) {
				socket.emit("loginFail");
			}
			else {
				thisPlayer = new Player(doc);
				loggedIn   = true;
				socket.emit("loginSuccess", {
					player: thisPlayer
				});
				console.log(thisPlayer.username + " just logged in!");
			}
		});
	});

	socket.on("disconnect", function() {
		if (!loggedIn) {return;}
		loggedIn = false;

		db.players.findOne({_id: thisPlayer._id}, function(err, doc) {
			if (err) {
				console.log("Error updating player database before disconnect");
			}
			else {
				thisPlayer.speed = 0;
				thisPlayer.playersInRange = [];
				db.players.update({_id: doc._id}, thisPlayer);
				console.log(thisPlayer.username + " disconnected!");
			}
		});
	});

	socket.on("changeDirection", function(data) {
		if (thisPlayer.canTurnHere(data)) {
			thisPlayer.direction = data;
			socket.emit("changeDirectionSuccess", thisPlayer.direction);
		}
		else {
			socket.emit("changeDirectionFail");
		}
	});

	socket.on("changePosition", function(data) {
		if (thisPlayer.canMoveHere(data)) {
			thisPlayer.position = data;
			socket.emit("changePositionSuccess", thisPlayer.position);
		}
		else {
			socket.emit("changePositionFail");
		}
	});
});
