/*
This file contains the cod to b executed upon the server receiving
a "start" message.
*/

function start(data, session, socket) {

    // checking if data provided is valid.
    var badData = global.server.actions.inputAN.start(data);

    if (!badData.success) {
        // emmitting error message if so
        return global.server.actions.messageEM.rejected(badData.error, socket);
    }

    //Checking if this player is already logged in.
    for (var i=0; i<global.server.loggedInPlayers.length; i++)
    {
        // if so, send rejected message with error 110
        if (data.id == global.server.loggedInPlayers[i].id) {
            return global.server.actions.messageEM.rejected(global.server.errorCodes.e110, socket);
        }
    }

    // fetching user from AUTHENTICATION collection
    global.server.db.authentication.findOne({token : data.token, id : data.id}, function (err, authDoc) {

        if (authDoc === null) {
            // if not found return authentication error
            return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
        }

        // fetching user from PLAYERS collection
        global.server.db.players.findOne({id : data.id}, function(err, playerDoc) {

            if (playerDoc === null) {
                // if not found return authentication error
                return global.server.actions.messageEM.rejected(global.server.config.errorCodes.e106, socket);
            }
            else {
                // if found load player into memmory
                session.thisPlayer = new global.server.actions.playerCS(playerDoc, socket);

                // save player to logged in players array
                global.server.loggedInPlayers.push(session.thisPlayer);

                // send accepted message
                global.server.actions.messageEM.accepted(session.thisPlayer, socket);

                // send other players message
                global.server.actions.messageEM.otherPlayers(session.thisPlayer, socket);
            }
        });
    });
}

module.exports = start;
