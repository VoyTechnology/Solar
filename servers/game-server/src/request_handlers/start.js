function start(data, session, socket) {
    if (data === null || typeof data.username === "undefined" || typeof data.token === "undefined") {
        return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e101, socket);
    }

    global.db.authentication.findOne({token : data.token}, function (authDoc) {
        if (authDoc === null) {
            return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
        }

        global.db.players.findOne({username : data.username}, function(playerDoc) {
            if (playerDoc === null) {
                return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
            }

            session.thisPlayer = new Player(playerDoc, socket);
            session.thisPlayer.loggedIn = true;
            global.server.loggedInPlayers.push(session.thisPlayer);
            global.server.actions.messageEM.accepted(session.thisPlayer, socket);
            global.server.actions.messageEM.otherPlayers(session.thisPlayer, socket);
        });
    });
}

module.exports = start;
