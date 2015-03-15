function listSocks(parameters, callback) {

    if (!global.static.parameterChecker.listSocks(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = listSocks;
