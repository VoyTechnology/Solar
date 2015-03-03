function time(session, callback) {
    global.server.actions.callbackEM.time(null, callback);
}

module.exports = time;
