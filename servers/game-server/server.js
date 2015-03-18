// Configuration
global.server = {
	config : require("./config.json"),
	package : require("./package.json"),
	_home : __dirname,
	loggedInPlayers : [],
	version : {
		major : 1,
		minor : 1
	},
	actions : {},
	db : null
};

// adidional custom files loading
global.server.actions = {
	// Classes
	playerCS : require(__dirname + global.server.config.paths.playerCS),
	// Request Handlers
	startRH : require(__dirname + global.server.config.paths.startRH),
	chatRH : require(__dirname + global.server.config.paths.chatRH),
	disconnectRH : require(__dirname + global.server.config.paths.disconnectRH),
	moveRH : require(__dirname + global.server.config.paths.moveRH),
	moveSyncRH : require(__dirname + global.server.config.paths.moveSyncRH),
	// Emitters
	messageEM : require(__dirname + global.server.config.paths.messageEM),
	// Analysers
	inputAN : require(__dirname + global.server.config.paths.inputAN)
};

// socket.IO initialisation
var app = require('express')();
var socket = require('socket.io');
var server = app.listen(global.server.config.mainServerPort);
var io = socket.listen(server);

// Database initialisation
var mongojs = require('mongojs');
global.server.db = mongojs(global.server.config.database.name, global.server.config.database.collections);

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
		global.server.actions.startRH(data, session, socket);
	});

	socket.on("chat", function(data) {
		global.server.actions.chatRH(data, session, socket);
	});

	socket.on("move", function(data) {
		global.server.actions.moveRH(data, session, socket);
	});

	socket.on("moveSync", function(data) {
		global.server.actions.moveSyncRH(data, session);
	});

	socket.on("disconnect", function() {
		global.server.actions.disconnectRH(session.thisPlayer.id);
	});
});
