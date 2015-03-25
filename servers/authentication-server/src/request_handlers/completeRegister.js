function completeRegister(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.completeRegister(req)) {
        return actions.responseEmitter.error(103, res);
    }
}

module.exports = completeRegister;
