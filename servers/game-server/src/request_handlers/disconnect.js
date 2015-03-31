/*
This file contains code to be
executed when the server receives
a "disconnect" message
*/

function disconnect(playerID) {

    // retreiving and removing the player from the global array
    var playerToRemove = playerArray.remove(playerID, "I");

    // getting players details
    var playerDetails = playerToRemove.getEssentialDetails;

    // updating database
    db.players.update({_id : objectID(playerID)}, playerDetails);

}

module.exports = disconnect;
