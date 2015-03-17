function useSock(parameters, callback) {

    //validating parameters
    if (!global.static.parameterChecker.useSock(parameters)) {
        return callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }


    var success = global.nav.switchSocket(parameters[0]);
    if(!success) {
        return callback(102);
    }

    console.log();
    return callback();
}

module.exports = useSock;
