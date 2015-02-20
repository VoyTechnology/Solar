function move(data, session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var responseConstructor = require(global.config.paths.socketResponseCS);

    if(data === null || typeof data.x === "undefined" || typeof data.y === "undefined" || typeof data.z === "undefined") {
        return responseConstructor.noData("move", socket);
    }

    var broadcastConstructor = require(global.config.paths.broadcastMessageCS);
    var constructorConditions = null;
    var canMoveResponse = session.thisPlayer.canMoveHere(data);

    if (canMoveResponse.success) {
        session.thisPlayer.position = data;
        constructorConditions = {
            success : true
        };
    }
    else {
        constructorConditions = {
            success : false,
            reason : canMoveResponse.message
        };
    }

    responseConstructor.move(constructorConditions, socket);
    broadcastConstructor.playerChangedState(session.thisPlayer, socket);
}

module.exports = move;
