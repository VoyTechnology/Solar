function move(data, session, socket) {
    if (!session.thisPlayer.loggedIn || !session.movementSynced) {
        return;
    }

    if(data === null || typeof data.timestamp == "undefined" || typeof data.position == "undefined" || typeof data.orientation == "undefined") {

        global.server.actions.messageEM.moveError(
            lobal.server.config.errorCodes.e101,
            data,
            session.thisPlayer
        );
    }

    var canMoveResponse = session.thisPlayer.canMoveHere(data);

    if (canMoveResponse.success) {
        session.thisPlayer.position = data.position;
        session.thisPlayer.orientation = data.orientation;

        session.thisPlayer.subtratAvailableMoveDistance(canMoveResponse.distanceMoved);
        global.server.actions.messageEM.move(data, socket);
        setTimeout(session.thisPlayer.addAvailableDistance(canMoveResponse.distanceMoved), 1000);

    }
    else if(canMoveResponse.message == "tooFar") {
        session.movementSynced = false;

        global.server.actions.messageEM.moveError(
            lobal.server.config.errorCodes.e109,
            data,
            session.thisPlayer
        );
    }
}

module.exports = move;
