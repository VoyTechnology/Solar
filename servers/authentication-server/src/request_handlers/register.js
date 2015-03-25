function register(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.register(req)) {
        return actions.responseEmitter.error(103, res);
    }
}

module.exports = register;
