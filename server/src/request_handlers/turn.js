function turn(data, session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);

    if(data === null || typeof data.xAngle === "undefined" || typeof data.yAngle === "undefined") {
        return socketResponseEmitter.noData("turn", socket);
    }

    var brodcastMessageEmitter = require(global.config.paths.brodcastMessageEM);
    var responseConditions = null;
    var canTurnResponse = session.thisPlayer.canTurnHere(data);

    if (canTurnResponse.success) {
        session.thisPlayer.direction = data;
        responseConditions = {
            success : true
        };
    }
    else {
        responseConditions = {
            success : false,
            message : canTurnResponse.message
        };
    }

    socketResponseEmitter.turn(responseConditions, socket);
    brodcastMessageEmitter.playerChangedState(session.thisPlayer, socket);
}

module.exports = turn;
