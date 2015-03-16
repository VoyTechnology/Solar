function start(data, session, socket) {

    var badData = global.server.actions.inputAN.start(data);
    if (!badData.success) {
        return global.server.actions.messageEM.rejected(badData.error, socket);
    }

    global.server.db.authentication.findOne({token : data.token, id : data.id}, function (err, authDoc) {
        if (authDoc === null) {
            return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
        }

        global.server.db.players.findOne({id : data.id}, function(err, playerDoc) {
            if (playerDoc === null) {
                session.thisPlayer = new global.server.actions.playerCS(authDoc.username, authDoc.id, socket);
            }
            else {
                session.thisPlayer = new global.server.actions.playerCS(playerDoc, socket);
            }

            global.server.loggedInPlayers.push(session.thisPlayer);
            global.server.actions.messageEM.accepted(session.thisPlayer, socket);
            global.server.actions.messageEM.otherPlayers(session.thisPlayer, socket);
        });
    });
}

module.exports = start;
