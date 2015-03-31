function register(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.register(req)) {
        return actions.responseEmitter.error(103, res);
    }

    // checking if register token for this username exists
    for(var i=0; i<pendingRegisters.length; i++) {
        if ( pendingRegisters[i].username == req.query.username || pendingRegisters[i].email == req.query.email) {
            return actions.responseEmitter.error(106,res);
        }
    }

    // checking if username already exists
    db.authentication.findOne({username : req.query.username}, function(err, doc) {
        // if username found return an error
        if (doc !== null) {
            return actions.responseEmitter.error(100,res);
        }

        // checking if email exists
        db.authentication.findOne({email : req.query.email}, function(err, doc) {
            // if email found return an error
            if (doc !== null) {
                return actions.responseEmitter.error(104,res);
            }

            // creating a register token
            var registerToken = Math.floor(new Date().getTime() + (Math.random() * 100000000) * (Math.random() * 10000000000));

            // creating a pending register entry
            var pendingRegisterEntry = {
                username : req.query.username,
                token : null,
                password : passTool.generate(req.query.password), // generating password hash from regular password
                email : req.query.email,
                registerToken : registerToken,
            };

            // setting function to delete register entry
            setTimeout(function() {
                for(var i=0; i<pendingRegisters.length; i++) {
                    if (pendingRegisters[i].username == pendingRegisterEntry.username) {
                        pendingRegisters.splice(i, 1);
                        return;
                    }
                }
            }, config.registrationTokenLifeHours * 3600000);

            // appending pending registrations array
            pendingRegisters.push(pendingRegisterEntry);

            // sending an email with a link to complete registration
            actions.mailer.sendMail(
                req.query.email,

                "Complete Registration",

                "Please visit this link to complete registration : " +
                "http://" + myIP + ":" + config.port.toString() +
                "/completeRegister?token=" + registerToken.toString()
            );

            // responding OK
            actions.responseEmitter.okay(res);
        });
    });
}

module.exports = register;
