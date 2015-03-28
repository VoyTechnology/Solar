function listSocks(parameters, callback) {

    // validating parameters
    if (!static.parameterChecker.listSocks(parameters)) {
        callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    // referencing socket array for convenience
    var socketsArray = servers.game_server.sockets;

    var numSocks = socketsArray.length;

    console.log("Amount of sockets : " + numSocks.toString().green + "\n\n");

    for(var i=0; i<socketsArray.length; i++) {
        process.stdout.write(socketsArray[i].name);

        // printing spaces so that the open/closed identifiers align
        for(var j=socketsArray[i].name.length; j<20; j++){process.stdout.write(" ");}

        if(socketsArray[i].socket.connected) {
            process.stdout.write("Open".green + "\n");
        }
        else {
            process.stdout.write("Closed".red + "\n");
        }
    }

    console.log();
    callback();
}

module.exports = listSocks;
