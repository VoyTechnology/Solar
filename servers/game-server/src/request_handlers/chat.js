function chat(data, session, socket) {

    if (!session.thisPlayer.loggedIn) {
        return;
    }

    var badData = global.server.actions.inputAN.chat(data);
    if ( !badData.sucess ) {
        console.log("HEHEHEHEHEEH");
        return global.server.actions.messageEM.chatError(badData.error, data, socket);
    }

    if (data.originator != session.thisPlayer.username) {
        return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e107, data, socket);
    }

    var recipientArr = [];

    for(var i=0; i<data.recipient.length; i++)
    {
        var playerFound = false;

        for(var j=0; j<global.server.loggedInPlayers.length; j++)
        {
            if(data.recipient[i] == global.server.loggedInPlayers[j].username) {
                playerFound = true;
                recipientArr.push(global.server.loggedInPlayers[j]);
            }
        }

        if (!playerFound) {
            return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e108, data, socket);
        }
    }



    var conditions = {
        original : data,
        recipientArr : recipientArr
    };

    global.server.actions.messageEM.chat(conditions, socket);
}

module.exports = chat;
