// Config file
global.config = require("./config.json");

// Standard stuff
var app = require('express')();
var socket = require('socket.io');
var server = app.listen(global.config.mainServerPort);
var io = socket.listen(server);

// Database initialisation
var mongojs = require('mongojs');
global.db = mongojs(global.config.database.name, [global.config.database.collections.players]);

// Global userArray
global.loggedInPlayers = [];

// Server
io.on("connection", function(socket) {
	console.log("connected");
	var session = {thisPlayer : {loggedIn : false}};

	socket.on("register", function(data) {
		require(global.config.paths.registerRH)(data, socket);
	});

	socket.on("login", function(data) {
		require(global.config.paths.loginRH)(data, session, socket);
	});

	socket.on("disconnect", function() {
		require(global.config.paths.disconnectRH)(session);
	});

	socket.on("pstatus", function() {
		require(global.config.paths.pstatusRH)(session, socket);
	});

	socket.on("turn", function(data) {
		require(global.config.paths.turnRH)(data, session, socket);
	});

	socket.on("move", function(data) {
		require(global.config.paths.moveRH)(data, session, socket);
	});

	socket.on("chat", function(data) {
		require(global.config.paths.chatRH)(data, session, socket);
	});
});
