/*
This file contains code to be
executed when the server receives
a "disconnect" message
*/

function disconnect(playerID) {

    // retreiving and removing the player from the global array
    var playerToRemove = playerArray.remove(playerID, "I");

    // basically if the player wasn't even logged in
    if(playerToRemove == -1) {
        return;
    }

    // getting players details
    var playerDetails = playerToRemove.getEssentialDetails();
    console.log(playerDetails);
    // updating database
    db.players.update({_id : objectID(playerID)}, playerDetails);

}

module.exports = disconnect;
