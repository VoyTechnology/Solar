function stopStress(parameters, callback) {

    if (!global.static.parameterChecker.stopStress(parameters)) {
        callback(101);
    }

}

module.exports = stopStress;
