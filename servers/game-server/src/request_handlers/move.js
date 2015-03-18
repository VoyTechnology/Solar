function move(data, session, socket) {
    console.log("INPUT");
    console.log(data);
    console.log("\n");

    if (!session.thisPlayer.loggedIn || !session.movementSynced) {
        return;
    }

    var badData = global.server.actions.inputAN.move(data);
    if (!badData.sucess) {
        return global.server.actions.messageEM.moveError(
            badData.error,
            data,
            session.thisPlayer,
            socket
        );
    }

    if(data.id != session.thisPlayer.id) {
        return global.server.actions.messageEM.moveError(
            global.server.config.errorCodes.e107,
            data,
            session.thisPlayer,
            socket
        );
    }

    var canMoveResponse = session.thisPlayer.canMoveHere(data.position);

    console.log("CAN MOVE RESPONSE");
    console.log(canMoveResponse);
    console.log("\n");

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
