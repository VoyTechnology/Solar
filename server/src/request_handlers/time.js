function time(session, socket) {
    var socketResponseEmitter = require(global._home + global.config.paths.socketResponseEM);
    socketResponseEmitter.time(null, socket);
}

module.exports = time;
