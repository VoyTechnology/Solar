function openSock(parameters, callback) {

    if (!global.static.parameterChecker.openSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = openSock;
