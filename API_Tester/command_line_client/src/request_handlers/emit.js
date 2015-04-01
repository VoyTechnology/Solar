function emit(parameters, callback) {

    //validating parameters
    if (!static.parameterChecker.emit(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    //checking if within a socket
    if(nav.socket === null) {
        return callback(102);
    }

    // looking for socket with that name
    for(var i=0; i<sockets.length; i++) {

        // if found
        if(nav.socket == sockets[i].name) {

            // get data from json file
            var data = require(__home + config.paths.emitData);
            delete require.cache[require.resolve(__home + config.paths.emitData)];

            // if timestamp present in data, overide it with actual timestamp
            if (typeof data.timestamp != "undefined") {
                data.timestamp = new Date().getTime();
            }

            sockets[i].emit(parameters[0], data);
            var logShowName = [];
            logShowName.push(nav.socket);
            console.log("Done".green);
            console.log();
            return callback();
        }

    }

    return callback(102);
}

module.exports = emit;
