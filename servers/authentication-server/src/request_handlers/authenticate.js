function authenticate(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.authenticate(req)) {
        return actions.responseEmitter.error(103, res);
    }

    // object cointaining query data for simplicity and readability
    var dbQueryData = {
        username : req.query.username,
        password : req.query.password
    };

    // looking for players entry in authentication collection
    db.authentication.findOne(dbQueryData, function(err, doc) {
        // if not found return an error
        if (doc === null) {
            return actions.responseEmitter.error(107, res);
        }

        // creating a loginToken
        var loginToken = Math.floor(new Date().getTime() + (Math.random() * 100000) * (Math.random() * 100000));

        // updating document in authentication database to contain login token
        db.authentication.update(dbQueryData, {$set :{token : loginToken}}, function(err) {
            // setting timeout function to remove login token from database
            setTimeout(function() {
                db.authentication.update (dbQueryData, {$set :{token : null}});
            }, config.loginTokenLifeMinutes * 60000);

            // returning the token to the user
            res.json({token : loginToken});
            res.end();
        });
    });
}

module.exports = authenticate;
