function startStress(parameters, callback) {

    if (!global.static.parameterChecker.startStress(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = startStress;
