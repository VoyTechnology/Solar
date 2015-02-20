function pstatus(session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var requestConstrutor = require(global.config.paths.socketResponseCS);
    var constructorConditions = null;
    requestConstrutor.pstatus(constructorConditions, session.thisPlayer, socket);
}

module.exports = pstatus;
