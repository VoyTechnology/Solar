function leaveSock(parameters, callback) {

    if (!global.static.parameterChecker.leaveSock(parameters)) {
        callback(101);
    }

    //checking if within game server
    if (global.nav.server != "Game_Server") {
        return callback(105);
    }

    global.nav.switchSocket(-1);
    console.log();
    callback();

}

module.exports = leaveSock;
