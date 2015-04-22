/*
This file contains code to be
executed when the server receives
a "moveSync" message
*/

function moveSync(data, session) {

    // checking to see if the data received is valid
    var badData = game.actions.inputAN.moveSync(data);
    if(!badData.sucess) {
        // if not, return
        return;
    }

    // sync the players movement so that he can move freely again
    session.movementSynced = true;
}

module.exports = moveSync;
