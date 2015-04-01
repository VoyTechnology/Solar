function authenticate(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.authenticate(req)) {
        console.log(1);
        return actions.responseEmitter.error(103, res);
    }

    console.log(req.query);

    // looking for players entry in authentication collection
    db.authentication.findOne({username : req.query.username}, function(err, doc) {
        // if not found return an error
        if (doc === null || !passTool.verify(req.query.password, doc.password)) {
            console.log(2);
            return actions.responseEmitter.error(107, res);
        }

        // checking if person already authenticated within the last x amount of minutes
        for(var i=0; i<activeAuthenticateTokens.length; i++) {
            if(activeAuthenticateTokens[i].username == req.query.username) {
                // if so clearing their timeout function which sets the login token to null in the database
                clearTimeout(activeAuthenticateTokens[i].timeoutToken);
                // deleting this entry
                activeAuthenticateTokens.splice(i, 1);
            }
        }

        // creating a loginToken
        var loginToken = Math.floor(new Date().getTime() + (Math.random() * 100000) * (Math.random() * 100000)).toString();
        var hashedToken = passTool.generate(loginToken);

        // updating document in authentication database to contain login token
        db.authentication.update({username : req.query.username}, {$set :{token : hashedToken}}, function(err) {
            var autnenticationListEntry = {
                username : req.query.username,
                timeoutToken : null
            };

            // setting timeout function to remove login token from database
            autnenticationListEntry.timeoutToken = setTimeout(function() {
                // deleting token in database
                db.authentication.update ({username : req.query.username}, {$set :{token : null}});
                // deleting active token entry from list
                for(var i=0; i<activeAuthenticateTokens.length; i++) {
                    if(activeAuthenticateTokens[i].username == req.query.username) {
                        // deleting this entry
                        activeAuthenticateTokens.splice(i, 1);
                    }
                }
            }, args.ltm * 60000);

            // appending activeAuthenticateTokensList
            activeAuthenticateTokens.push(autnenticationListEntry);

            // returning the token to the user
            res.json({token : loginToken, id : doc._id, success : true});
            res.end();
        });
    });
}

module.exports = authenticate;
