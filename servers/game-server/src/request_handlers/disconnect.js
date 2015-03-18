/*
This file contains code to be
executed when the server receives
a "disconnect" message
*/

function disconnect(session) {

    // updating players document in PLAYERS collection
    global.server.db.players.update({id: session.thisPlayer.id}, session.thisPlayer.getEssentialDetails());

    // looking for player in logged in players array
    for(var i=0; i<global.server.loggedInPlayers.length; i++) {

        if(global.server.loggedInPlayers[i].id == session.thisPlayer.id) {
            // if found, remove him
            global.server.loggedInPlayers.splice(i, 1);
            break;
        }
    }
}

module.exports = disconnect;
