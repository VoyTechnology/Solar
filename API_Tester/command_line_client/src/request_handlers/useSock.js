function useSock(parameters, callback) {

    //validating parameters
    if (!static.parameterChecker.useSock(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }


    var success = nav.switchSocket(parameters[0]);
    if(!success) {
        return callback(102);
    }

    console.log();
    return callback();
}

module.exports = useSock;
