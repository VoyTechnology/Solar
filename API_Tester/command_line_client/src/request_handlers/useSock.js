function useSock(parameters, callback) {

    if (!global.static.parameterChecker.useSock(parameters)) {
        console.log("ERROR".red);
        console.log(global.config.errorCodes.e101.red);
        callback();
    }

}

module.exports = useSock;
