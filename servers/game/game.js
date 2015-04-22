function game() {

	// socket.IO server initialisation
	var app = express();
	var server = app.listen(3000);
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
			game.actions.startRH(data, session, socket);
		});

		socket.on("chat", function(data) {
			game.actions.chatRH(data, session, socket);
		});

		socket.on("move", function(data) {
			game.actions.moveRH(data, session, socket);
		});

		socket.on("moveSync", function(data) {
			game.actions.moveSyncRH(data, session);
		});

		socket.on("disconnect", function() {
			game.actions.disconnectRH(session.thisPlayer._id);
		});
	});

	console.log("\nGame server listening on port 3000");

}

module.exports = game;
