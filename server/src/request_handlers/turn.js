function turn(data, session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var responseConstructor = require(global.config.paths.socketResponseCS);

    if(data === null || typeof data.xAngle === "undefined" || typeof data.yAngle === "undefined") {
        return responseConstructor.noData("turn", socket);
    }

    var broadcastConstructor = require(global.config.paths.broadcastMessageCS);
    var constructorConditions = null;
    var canTurnResponse = session.thisPlayer.canTurnHere(data);

    if (canTurnResponse.success) {
        session.thisPlayer.direction = data;
        constructorConditions = {
            success : true
        };
    }
    else {
        constructorConditions = {
            success : false,
            message : canTurnResponse.message
        };
    }

    responseConstructor.turn(constructorConditions, socket);
    broadcastConstructor.playerChangedState(session.thisPlayer, socket);
}

module.exports = turn;
