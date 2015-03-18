function stopStress(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.stopStress(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    // checking if stress test already in progress
    if (!global.servers.game_server.stress.active) {
        return callback(110);
    }
    global.servers.game_server.stress.active = false;

    // initiating statistics variables
    var numMessagesSent = 0;
    var numMessagesReceived = 0;

    // looping through stress test accounts
    for(var i=0; i<global.servers.game_server.stress.sockets.length; i++) {
        // referencing variable for convenience
        var sock = global.servers.game_server.stress.sockets[i];

        // updating statistics
        numMessagesSent += sock.messagesSent;
        numMessagesReceived += sock.messagesReceived;

        // deactivating socket
        sock.stopMoving();
        sock.socket.disconnect();
    }

    // clearing array
    global.servers.game_server.stress.sockets.splice(0, global.servers.game_server.stress.sockets.length);

    // printing statistics
    console.log("Stress test completed".green);
    console.log("Number of messages sent : " + numMessagesSent.toString().bold.green);
    console.log("Number of messages received : " + numMessagesReceived.toString().bold.yellow);
    return callback();
}

module.exports = stopStress;
