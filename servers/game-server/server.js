// Configuration
global.server = {
	config : require("./config.json"),
	package : require("./package.json"),
	_home : __dirname,
	loggedInPlayers : [],
	version : {major : 0, minor : 0},
	actions : {}
};

global.server.actions = {
	// Classes
	playerCS : require(__dirname + global.server.config.paths.playerCS),
	// Request Handlers
	startRH : require(__dirname + global.server.config.paths.startRH),
	chatRH : require(__dirname + global.server.config.paths.chatRH),
	disconnectRH : require(__dirname + global.server.config.paths.disconnectRH),
	moveRH : require(__dirname + global.server.config.paths.moveRH),
	timeRH : require(__dirname + global.server.config.paths.timeRH),
	moveSyncRH : require(__dirname + global.server.config.paths.moveSyncRH),
	// Emitters
	messageEM : require(__dirname + global.server.config.paths.messageEM)
};

// Standard stuff
var app = require('express')();
var socket = require('socket.io');
var server = app.listen(global.server.config.mainServerPort);
var io = socket.listen(server);

// Database initialisation
var mongojs = require('mongojs');

global.db = mongojs(global.server.config.database.name, [
	global.server.config.database.collections.players,
	global.server.config.database.collections.authentication
]);


// Server
io.on("connection", function(socket) {
	var session = {
		thisPlayer : {
			loggedIn : false,
		},
		movementSynced : true
	};

	socket.on("start", function(data) {
		global.server.actions.startRH(data, session, socket);
	});

	socket.on("chat", function(data, callback) {
		global.server.actions.charRH(data, session, socket);
	});

	socket.on("move", function(data) {
		global.server.actions.moveRH(data, session, socket);
	});

	socket.on("time", function(callback) {
		global.server.actions.timeRH(session, callback);
	});

	socket.on("disconnect", function() {
		global.server.actions.disconnectRH(session);
	});
});
