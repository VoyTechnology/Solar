function stopStress(parameters, callback) {

    if (!global.static.parameterChecker.stopStress(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = stopStress;
