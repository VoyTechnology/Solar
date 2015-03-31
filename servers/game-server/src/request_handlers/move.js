/*
This file contains code to be
executed when the server receives
a "move" message
*/

function move(data, session, socket) {

    console.log(data);
    // checking if player is logged in
    if (!session.thisPlayer.loggedIn || !session.movementSynced) {
        return;
    }

    // checking if data received is valid
    var badData = actions.inputAN.move(data);
    if (!badData.sucess) {
        // if not valid return moveError
        return actions.messageEM.moveError(
            badData.error,
            data,
            session.thisPlayer,
            socket
        );
    }

    // checking if id from data matches the id of the logged in player
    if(data.id != session.thisPlayer._id) {
        // if not return moveError message
        return actions.messageEM.moveError(
            107,
            data,
            session.thisPlayer,
            socket
        );
    }

    // checking if player can move where he wishes to move
    var canMoveResponse = session.thisPlayer.canMoveHere(data.position);

    // if so
    if (canMoveResponse.success) {
        // updating his new posittion
        session.thisPlayer.position = data.position;
        session.thisPlayer.orientation = data.orientation;

        // subtracting distance he just moved from his available distance to move
        session.thisPlayer.subtractAvailableDistance(canMoveResponse.distanceMoved);

        // emitting move message to other players
        actions.messageEM.move(data, socket);

        // setting so that in one second the distance he just moved his added back on to the distance he can move.
        // this is in place to control how much a player can move in one second
        setTimeout(session.thisPlayer.addAvailableDistance(canMoveResponse.distanceMoved), 1000);

    }
    // if not
    else if(canMoveResponse.message == "tooFar") {
        // unSync the player so that he needs to send a "moveSync" message before moving again
        session.movementSynced = false;

        // send moveError message
        actions.messageEM.moveError(
            109,
            data,
            session.thisPlayer,
            socket
        );
    }
}

module.exports = move;
