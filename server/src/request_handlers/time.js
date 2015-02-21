function time(session, socket) {
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);
    socketResponseEmitter.time(null, socket);
}

module.exports = time;
