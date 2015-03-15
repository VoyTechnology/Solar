function showLog(parameters, callback) {

    if (!global.static.parameterChecker.showLog(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = showLog;
