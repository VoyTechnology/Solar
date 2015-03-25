function authenticate(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.authenticate(req)) {
        return actions.responseEmitter.error(103, res);
    }
}

module.exports = authenticate;
