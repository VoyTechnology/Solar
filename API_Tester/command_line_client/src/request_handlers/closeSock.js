function closeSock(parameters, callback) {

    if (!global.static.parameterChecker.closeSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = closeSock;
