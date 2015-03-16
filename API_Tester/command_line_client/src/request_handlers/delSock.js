function delSock(parameters, callback) {

    if (!global.static.parameterChecker.delSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = delSock;
