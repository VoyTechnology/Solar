function pstatus(session, socket) {
    if (!session.thisPlayer.loggedIn){return;}
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);
    var responseConditions = null;
    socketResponseEmitter.pstatus(responseConditions, session.thisPlayer, socket);
}

module.exports = pstatus;
