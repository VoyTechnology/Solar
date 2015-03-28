function showLog(parameters, callback) {

    if (!static.parameterChecker.showLog(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    // checking if already in a socket
    if (parameters.length === 0) {
        if (nav.socket === null) {
            return callback(102);
        }
        else {
            parameters.push(nav.socket);
        }
    }

    // referencing sockets array for convenience
    var socketsArray = servers.game_server.sockets;

    for (var i=0; i<socketsArray.length; i++)
    {
        // if socket found
        if (socketsArray[i].name == parameters[0]) {

            // Identifying how many logs to print
            var numLogsToCollect;
            var thisSock = socketsArray[i];

            if(thisSock.log.length === 0) {
                return callback(107);
            }
            else if(thisSock.log.length < config.logOutput) {
                numLogsToCollect = thisSock.log.length;
            }
            else {
                numLogsToCollect = config.logOutput;
            }

            // printing logs starting from last one going backwards
            for(var j=thisSock.log.length-1; j>thisSock.log.length-numLogsToCollect-1; j--) {
                var currentLog = thisSock.log[j];
                console.log("ID : " + currentLog.identifier.bold);
                console.log("Timestamp : " + currentLog.timestamp.toString().bold);
                console.log("Direction : " + (currentLog.direction=="Incoming"?"Incoming".green:"Outgoing".red));
                console.log("Data :");

                var stringData = JSON.stringify(currentLog.data);
                // formatting output of string for visual ease
                for(var k=0; k<stringData.length; k++) {
                    if(stringData[k] == ',') {
                        process.stdout.write(",\n");
                    }
                    else {
                        process.stdout.write(stringData[k]);
                    }
                }

                console.log("\n");
            }

            return callback();
        }
    }

    // returning error if not found
    return callback(102);
}

module.exports = showLog;
