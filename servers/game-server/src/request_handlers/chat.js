/*
This file contains code to be
executed when the server receives
a "chat" message
*/

function chat(data, session, socket) {

    console.log(data);
    // checking if player on this session has not been accepted login
    if (!session.thisPlayer.loggedIn) {
        return;
    }

    // checking if data received is valid
    var badData = actions.inputAN.chat(data);
    if ( !badData.sucess ) {
        // if so return a chatError
        return actions.messageEM.chatError(badData.error, data, socket);
    }

    // checking if originator is equal to the username of the logged in player
    if (data.originator != session.thisPlayer.username) {
        // if not return a chatError
        return actions.messageEM.chatError(107, data, socket);
    }

    // array referencing the player objects that the message is to be sent to
    var recipientArr = [];

    // finding players to send message to
    for(var i=0; i<data.recipient.length; i++)
    {
        var playerFound = playerArray.getPlayer(data.recipient[i], "U");

        if (playerFound == -1) {
            return actions.messageEM.chatError(108, data, socket);
        }

        recipientArr.push(playerFound);
    }

    // data that is sent to message emitter
    var conditions = {
        original : data,
        recipientArr : recipientArr
    };

    // emitting the chat message
    actions.messageEM.chat(conditions, socket);
}

module.exports = chat;
