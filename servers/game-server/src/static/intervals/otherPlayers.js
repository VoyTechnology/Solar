function otherPlayers() {
	for (var loggedInPlayer in global.server.loggedInPlayers) {
		var message = {
			players : []
		};

		for (var otherPlayer in global.server.loggedInPlayers) {
			if (otherPlayer.username != loggedInPlayer.username) {
				message.push(otherPlayer.broadcastMessageConstructor());
			}
		}

		loggedInPlayer.socket.emit("otherPlayers", message);
	}
}

module.exports = otherPlayers;
