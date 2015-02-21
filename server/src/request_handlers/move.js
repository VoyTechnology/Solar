function move(data, session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);

    if(data === null || typeof data.x === "undefined" || typeof data.y === "undefined" || typeof data.z === "undefined") {
        return socketResponseEmitter.noData("move", socket);
    }

    var brodcastMessageEmitter = require(global.config.paths.brodcastMessageEM);
    var responseConditions = null;
    var canMoveResponse = session.thisPlayer.canMoveHere(data);

    if (canMoveResponse.success) {
        session.thisPlayer.position = data;
        responseConditions = {
            success : true
        };
    }
    else {
        responseConditions = {
            success : false,
            reason : canMoveResponse.message
        };
    }

    socketResponseEmitter.move(responseConditions, socket);
    brodcastMessageEmitter.playerChangedState(session.thisPlayer, socket);
}

module.exports = move;
