/*

*/
function delSock(parameters, callback) {

    //validating parameters
    if (!static.parameterChecker.delSock(parameters)) {
        callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    // boolean variable indicating if leavesock should be called after deletion
    var shouldLeave;

    //Checking if already within a socket
    if(nav.socket === null) {
        shouldLeave = false;
    }
    else {
        if(parameters[0] == nav.socket) {
            shouldLeave = true;
        }
        else if (parameters.length === 0) {
            parameters.push(nav.socket);
            shouldLeave = true;
        }
        else {
            shouldLeave = false;
        }
    }

    // looping through sockets
    for(var i=0; i<sockets.length; i++) {

        // Deleting socket if found
        if (parameters[0] == sockets[i].name) {
            sockets[i].socket.disconnect();
            delete sockets[i].socket;
            sockets.splice(i, 1);
            console.log((parameters[0] + " Deleted.\n").green);

            // leaving socket if inside deleted socket
            if(shouldLeave) {
                nav.switchSocket(-1);
            }

            return callback();
        }
    }

    // error if not found
    return callback(102);
}

module.exports = delSock;
