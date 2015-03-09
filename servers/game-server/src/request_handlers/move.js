function move(data, session, socket) {
    console.log("input---VVV");
    console.log(data);
    if (!session.thisPlayer.loggedIn || !session.movementSynced) {
        console.log(session.thisPlayer.username + " Not Logged In");
        return;
    }

    if(data === null || typeof data.timestamp == "undefined" || typeof data.position == "undefined" || typeof data.orientation == "undefined") {
        console.log("Bad Data");
        global.server.actions.messageEM.moveError(
            lobal.server.config.errorCodes.e101,
            data,
            session.thisPlayer,
            socket
        );
    }

    if(data.username != session.thisPlayer.username) {
        console.log("Usernames Not Matching");
        global.server.actions.messageEM.moveError(
            global.server.config.errorCodes.e107,
            data,
            session.thisPlayer,
            socket
        );
    }

    var canMoveResponse = session.thisPlayer.canMoveHere(data.position);

    if (canMoveResponse.success) {
        session.thisPlayer.position = data.position;
        session.thisPlayer.orientation = data.orientation;

        session.thisPlayer.subtractAvailableDistance(canMoveResponse.distanceMoved);
        global.server.actions.messageEM.move(data, socket);
        setTimeout(session.thisPlayer.addAvailableDistance(canMoveResponse.distanceMoved), 1000);

    }
    else if(canMoveResponse.message == "tooFar") {
        session.movementSynced = false;
        global.server.actions.messageEM.moveError(
            global.server.config.errorCodes.e109,
            data,
            session.thisPlayer,
            socket
        );
    }
}

module.exports = move;
