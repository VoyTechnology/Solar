function start(data, session, socket) {
    if (data === null || typeof data.username === "undefined" || typeof data.token === "undefined") {
        return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e101, socket);
    }

    global.server.db.authentication.findOne({token : data.token}, function (err, authDoc) {
        if (authDoc === null) {
            return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
        }

        global.server.db.players.findOne({username : data.username}, function(err, playerDoc) {
            if (playerDoc === null) {
                return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
            }

            session.thisPlayer = new global.server.actions.playerCS(playerDoc, socket);
            session.thisPlayer.loggedIn = true;
            global.server.loggedInPlayers.push(session.thisPlayer);
            global.server.actions.messageEM.accepted(session.thisPlayer, socket);
            global.server.actions.messageEM.otherPlayers(session.thisPlayer, socket);
        });
    });
}

module.exports = start;
