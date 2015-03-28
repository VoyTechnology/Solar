function newSock(parameters, callback) {

    //validating parameters
    if (!static.parameterChecker.newSock(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    //checking if socket with that name already exists
    for(var i=0; i<servers.game_server.sockets.length; i++) {
        if (parameters[0] == servers.game_server.sockets[i].name) {
            return callback(106);
        }
    }

    //creating socket and attacking to socket list
    var socket = new classes.sock(parameters[0], true);
    servers.game_server.sockets.push(socket);

    console.log((parameters[0] + " Created\n").green);
    return callback();
}

module.exports = newSock;
