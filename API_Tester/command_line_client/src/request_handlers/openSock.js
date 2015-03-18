function openSock(parameters, callback) {

    if (!global.static.parameterChecker.openSock(parameters)) {
        callback(101);
    }

}

module.exports = openSock;
