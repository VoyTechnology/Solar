// Config file
global.config = require("./config.json");
global._home = __dirname;

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
		require(global._home + global.config.paths.registerRH)(data, socket);
	});

	socket.on("login", function(data) {
		require(global._home + global.config.paths.loginRH)(data, session, socket);
	});

	socket.on("turn", function(data) {
		require(global._home + global.config.paths.turnRH)(data, session, socket);
	});

	socket.on("move", function(data) {
		require(global._home + global.config.paths.moveRH)(data, session, socket);
	});

	socket.on("chat", function(data) {
		require(global._home + global.config.paths.chatRH)(data, session, socket);
	});

	socket.on("pstatus", function() {
		require(global._home + global.config.paths.pstatusRH)(session, socket);
	});

	socket.on("time", function() {
		require(global._home + global.config.paths.timeRH)(session, socket);
	});

	socket.on("version", function() {
		require(global._home + global.config.paths.versionRH)(session, socket);
	});

	socket.on("disconnect", function() {
		require(global._home + global.config.paths.disconnectRH)(session);
	});
});
