// establishing command line arguments
global.args = require("commander");

args.version(2.2);
args.option("--all", "Run all servers", false);
args.option("--local", "Use if running on localhost", false);
args.option("--g", "Force run game server", false);
args.option("--d", "Force run discovery server", false);
args.option("--a", "Force run authentication server", false);
args.option("--rth [rth]", "How long a registratin token is valid in hours, default 5", 5);
args.option("--ltm [ltm]", "How long a login token is valid in minutes, default 5", 5);
args.parse(process.argv);

// loading dependancies depending on servers to run
global.version = {
	major : 2,
	minor : 0
};






global.__home = __dirname;
if (args.all || args.g) {
	global.express = require("express");
	global.socketIO = require("socket.io");
	global.mongojs = require("mongojs");
	global.db = mongojs("solar", ["authentication", "players"]);
	global.passwordHash = require("password-hash");
	global.playerArray = new (require(__dirname + "/game/src/classes/playerArray.js"))();
	global.game = {
		actions : {
			playerCS : require(__dirname + "/game/src/classes/player.js"),
			startRH : require(__dirname + "/game/src/request_handlers/start.js"),
			chatRH : require(__dirname + "/game/src/request_handlers/chat.js"),
			disconnectRH : require(__dirname + "/game/src/request_handlers/disconnect.js"),
			moveRH : require(__dirname + "/game/src/request_handlers/move.js"),
			moveSyncRH : require(__dirname + "/game/src/request_handlers/moveSync.js"),
			messageEM : require(__dirname + "/game/src/static/messageEmitter.js"),
			inputAN : require(__dirname + "/game/src/static/inputAnalyser.js"),
			errorCode : require(__dirname + "/game/src/static/errorCode.js")
		}
	};

	require(__dirname + "/game/game.js")();
}





if (args.all || args.d) {
	global.http = require('http');

	require(__dirname + "/discovery/discovery.js")();
}





if (args.all || args.a) {
	require(__dirname + "/authentication/src/static/ipFinder.js")();
	global.mongojs = require("mongojs");
	global.db = mongojs("solar", ["authentication", "players"]);
	global.express = require("express");
	global.passwordHash = require("password-hash");
	global.bodyParser = require("body-parser");
	global.nodemailer = require("nodemailer");
	global.pendingRegisters = [];
	global.pendingNewPasswords = [];
	global.activeAuthenticateTokens = [];
	global.auth = {
		config : require(__dirname + "/authentication/config.json"),
		actions : {
			authenticate : require(__dirname + "/authentication/src/request_handlers/authenticate.js"),
			register : require(__dirname + "/authentication/src/request_handlers/register.js"),
			completeRegister : require(__dirname + "/authentication/src/request_handlers/completeRegister.js"),
			newPassword : require(__dirname + "/authentication/src/request_handlers/newPassword.js"),
			completeNewPassword : require(__dirname + "/authentication/src/request_handlers/completeNewPassword.js"),
			parameterAnalyser : require(__dirname + "/authentication/src/static/parameterAnalyser.js"),
			responseEmitter : require(__dirname + "/authentication/src/static/responseEmitter.js"),
			mailer : new (require(__dirname + "/authentication/src/static/emailEmitter.js"))()
		}
	};

	require(__dirname + "/authentication/authentication.js")();
}
