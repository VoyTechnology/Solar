/*
This file contains code to be
executed when the server receives
a "disconnect" message
*/

function disconnect(playerID) {

    // looking for the player
    for(var i=0; i<loggedInPlayers.length; i++) {

        if(loggedInPlayers[i].id == playerID) {

            // if found, update and remove it form loggedInPlayers array
            var playerDetails = loggedInPlayers[i].getEssentialDetails();
            db.players.update({id : playerID}, playerDetails);
            loggedInPlayers.splice(i, 1);
            return;
        }
    }


}

module.exports = disconnect;
