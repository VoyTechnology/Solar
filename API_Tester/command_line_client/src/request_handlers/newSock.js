function newSock(parameters, callback) {

    if (!global.static.parameterChecker.newSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = newSock;
