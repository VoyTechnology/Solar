function chat(data, session, socket) {
    if (!session.thisPlayer.loggedIn) {
        return;
    }

    if ( data === null || typeof data.timestamp == "undefined" || typeof data.originator == "undefined" || typeof data.originator == "undefined" || typeof data.text == "undefined" ) {
        return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e101, data, socket);
    }

    if (data.originator != session.thisPlayer.username) {
        return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e107, data, socket);
    }

    var recipientArr = [];

    for (var playerName in data.recipient) {
        var playerFound = false;

        for (var player in global.server.loggedInPlayers) {
            if (player.username == playerName) {
                playerFound = true;
                recipientArr.push(player);
                break;
            }
        }

        if (!playerFound) {
            return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e108, data, socket);
        }
    }

    var conditions = {
        timestamp : data.timestamp,
        originator : data.originator,
        recipientOriginal : data.recipient,
        text : data.text,
        recipientArr : recipientArr
    };

    global.server.actions.messageEM.chat(conditions, socket);
}

module.exports = chat;
