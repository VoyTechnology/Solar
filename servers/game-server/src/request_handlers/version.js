function version(session, socket) {
    var socketResponseEmitter = require(global._home + global.config.paths.socketResponseEM);
    socketResponseEmitter.version(socket);
}

module.exports = version;
