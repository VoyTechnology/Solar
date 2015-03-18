function newSock(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.newSock(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    //checking if socket with that name already exists
    for(var i=0; i<global.servers.game_server.sockets.length; i++) {
        if (parameters[0] == global.servers.game_server.sockets[i].name) {
            return callback(106);
        }
    }

    //creating socket and attacking to socket list
    var socket = new global.classes.sock(parameters[0], true);
    global.servers.game_server.sockets.push(socket);

    console.log((parameters[0] + " Created\n").green);
    return callback();
}

module.exports = newSock;
