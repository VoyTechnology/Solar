function leaveSock(parameters, callback) {

    if (!global.static.parameterChecker.leaveSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = leaveSock;
