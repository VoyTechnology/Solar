function closeSock(parameters, callback) {

    if (!global.static.parameterChecker.closeSock(parameters)) {
        callback(101);
    }

}

module.exports = closeSock;
