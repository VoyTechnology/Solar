function newPassword(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.newPassword(req)) {
        return actions.responseEmitter.error(103, res);
    }
}

module.exports = newPassword;
