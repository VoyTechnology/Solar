function startStress(parameters, callback) {

    if (!global.static.parameterChecker.startStress(parameters)) {
        callback(101);
    }

}

module.exports = startStress;
