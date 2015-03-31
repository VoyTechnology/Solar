// Requiring third party libraries
var express = require("express");
var socketIO = require("socket.io");
var mongojs = require("mongojs");
var passwordHash = require("password-hash");

// Setting up global variables
global.config = require("./config.json");
global.package = require("./package.json");
global._home = __dirname;
global.passTool = passwordHash;
global.playerArray = new (require(__dirname + config.paths.playerArrayCS))();
global.objectID = mongojs.ObjectId;
global.db = mongojs(config.database.name, config.database.collections);
global.actions = {
	playerCS : require(__dirname + config.paths.playerCS),
	startRH : require(__dirname + config.paths.startRH),
	chatRH : require(__dirname + config.paths.chatRH),
	disconnectRH : require(__dirname + config.paths.disconnectRH),
	moveRH : require(__dirname + config.paths.moveRH),
	moveSyncRH : require(__dirname + config.paths.moveSyncRH),
	messageEM : require(__dirname + config.paths.messageEM),
	inputAN : require(__dirname + config.paths.inputAN),
	errorCode : function(code) {
		return {
			code : code,
			reasonText : config.errorCodes[code-100]
		};
	}
};
global.version = {
	major : 1,
	minor : 2
};

// socket.IO server initialisation
var app = express();
var server = app.listen(config.mainServerPort);
var io = socketIO.listen(server);

// Server event handlers
io.on("connection", function(socket) {
	// session variable detailing properties of current session
	var session = {
		thisPlayer : {
			loggedIn : false,
		},
		movementSynced : true
	};

	socket.on("start", function(data) {
		actions.startRH(data, session, socket);
	});

	socket.on("chat", function(data) {
		actions.chatRH(data, session, socket);
	});

	socket.on("move", function(data) {
		actions.moveRH(data, session, socket);
	});

	socket.on("moveSync", function(data) {
		actions.moveSyncRH(data, session);
	});

	socket.on("disconnect", function() {
		actions.disconnectRH(session.thisPlayer._id);
	});
});

console.log("Listening on port : " + config.mainServerPort.toString());
