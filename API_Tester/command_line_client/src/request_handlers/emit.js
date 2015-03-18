function emit(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.emit(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    //checking if within a socket
    if(global.nav.socket === null) {
        return callback(102);
    }

    // referencing socketsArray for convenience
    var socketsArray = global.servers.game_server.sockets;

    // looking for socket with that name
    for(var i=0; i<socketsArray.length; i++) {

        // if found
        if(global.nav.socket == socketsArray[i].name) {

            // get data from json file
            var data = require(global.__home + global.config.paths.emitData);
            delete require.cache[require.resolve(global.__home + global.config.paths.emitData)];

            // if timestamp present in data, overide it with actual timestamp
            if (typeof data.timestamp != "undefined") {
                data.timestamp = new Date().getTime();
            }

            socketsArray[i].emit(parameters[0], data);
            var logShowName = [];
            logShowName.push(global.nav.socket);
            return global.requestHandlers.showLog(logShowName, callback);
        }

    }

    return callback(102);
}

module.exports = emit;
