function leaveSock(parameters, callback) {

    if (!static.parameterChecker.leaveSock(parameters)) {
        callback(101);
    }

    //checking if within game server
    if (nav.server != "Game_Server") {
        return callback(105);
    }

    nav.switchSocket(-1);
    console.log();
    callback();

}

module.exports = leaveSock;
