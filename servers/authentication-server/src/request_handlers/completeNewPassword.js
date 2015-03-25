function completeNewPassword(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.completeNewPassword(req)) {
        return actions.responseEmitter.error(103, res);
    }
}

module.exports = completeNewPassword;
