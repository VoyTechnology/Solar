/*
This file contains code to be
executed when the server receives
a "disconnect" message
*/

function disconnect(playerID) {

    // looking for the player
    for(var i=0; i<global.server.loggedInPLayers.length; i++) {

        if(global.server.loggedInPlayers[i].id == playerID) {

            // if found, update and remove it form loggedInPlayers array
            var playerDetails = global.server.loggedInPlayers[i].getEssentialDetails();
            global.server.db.players.update({id : playerID}, playerDetails);
            global.server.loggedInPlayers.splice(i, 1);
            return;
        }
    }


}

module.exports = disconnect;
