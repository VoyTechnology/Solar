function authenticate(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.authenticate(req)) {
        return actions.responseEmitter.error(103, res);
    }

    // looking for players entry in authentication collection
    db.authentication.findOne({username : req.query.username}, function(err, doc) {
        // if not found return an error
        if (doc === null || !passTool.verify(req.query.password, doc.password)) {
            return actions.responseEmitter.error(107, res);
        }

        // creating a loginToken
        var loginToken = Math.floor(new Date().getTime() + (Math.random() * 100000) * (Math.random() * 100000)).toString();
        var hashedToken = passTool.generate(loginToken);

        // updating document in authentication database to contain login token
        db.authentication.update({username : req.query.username}, {$set :{token : hashedToken}}, function(err) {
            // setting timeout function to remove login token from database
            setTimeout(function() {
                db.authentication.update ({username : req.query.username}, {$set :{token : null}});
            }, config.loginTokenLifeMinutes * 60000);

            // returning the token to the user
            res.json({token : loginToken, id : doc._id, success : true});
            res.end();
        });
    });
}

module.exports = authenticate;
