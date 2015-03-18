/*
This file contains code to be
executed when the server receives
a "chat" message
*/

function chat(data, session, socket) {

    // checking if player on this session has not been accepted login
    if (!session.thisPlayer.loggedIn) {
        return;
    }

    // checking if data received is valid
    var badData = global.server.actions.inputAN.chat(data);
    if ( !badData.sucess ) {
        // if so return a chatError
        return global.server.actions.messageEM.chatError(badData.error, data, socket);
    }

    // checking if originator is equal to the username of the logged in player
    if (data.originator != session.thisPlayer.username) {
        // if not return a chatError
        return global.server.actions.messageEM.chatError(global.server.config.errorCodes.e107, data, socket);
    }

    // array referencing the player objects that the message is to be sent to
    var recipientArr = [];

    // finding players to send message to
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

    // data that is sent to message emitter
    var conditions = {
        original : data,
        recipientArr : recipientArr
    };

    // emitting the chat message
    global.server.actions.messageEM.chat(conditions, socket);
}

module.exports = chat;
