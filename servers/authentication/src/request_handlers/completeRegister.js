function completeRegister(req, res) {
    // if parameters invalid
    if (!auth.actions.parameterAnalyser.completeRegister(req)) {
        return auth.actions.responseEmitter.error(103, res);
    }

    // creating registrationEntry variable
    var registrationEntry;

    // searching for pending registration entry
    for (var i=0; i<pendingRegisters.length; i++) {
        if (pendingRegisters[i].registerToken == req.query.token) {
            registrationEntry = pendingRegisters[i];
            pendingRegisters.splice(i, 1);
            break;
        }
    }

    // removing registerToken
    delete registrationEntry.registerToken;
    // updating databases
    db.authentication.insert(registrationEntry, function() {
        // adding player to Players collection
        // but first we need to get the ObjectId
        // of the entry in authentication collection
        db.authentication.findOne({username : registrationEntry.username}, function(err, doc) {
            // updating players collection to contain newly registerd player
            var playersEntry = auth.config.defaultPlayer;
            playersEntry._id = doc._id;
            playersEntry.username = doc.username;
            db.players.insert(playersEntry);

            // responding with ok
            auth.actions.responseEmitter.okay(res);
        });
    });
}

module.exports = completeRegister;
