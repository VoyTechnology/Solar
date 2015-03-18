function delSock(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.delSock(parameters)) {
        callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    // boolean variable indicating if leavesock should be called after deletion
    var shouldLeave;

    //Checking if already within a socket
    if(global.nav.socket === null) {
        shouldLeave = false;
    }
    else {
        if(parameters[0] == global.nav.socket) {
            shouldLeave = true;
        }
        else if (parameters.length === 0) {
            parameters.push(global.nav.socket);
            shouldLeave = true;
        }
        else {
            shouldLeave = false;
        }
    }

    // looping through sockets
    for(var i=0; i<global.servers.game_server.sockets.length; i++) {

        // Deleting socket if found
        if (parameters[0] == global.servers.game_server.sockets[i].name) {
            global.servers.game_server.sockets[i].socket.disconnect();
            delete global.servers.game_server.sockets[i].socket;
            global.servers.game_server.sockets.splice(i, 1);
            console.log((parameters[0] + " Deleted.\n").green);

            // leaving socket if inside deleted socket
            if(shouldLeave) {
                global.nav.switchSocket(-1);
            }

            return callback();
        }
    }

    // error if not found
    return callback(102);
}

module.exports = delSock;
