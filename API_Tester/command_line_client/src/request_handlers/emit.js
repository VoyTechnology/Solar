function emit(parameters, callback) {

    if (!global.static.parameterChecker.emit(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = emit;
