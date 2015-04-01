function newPassword(req, res) {
    // if parameters invalid
    req.query.username = req.query.username.toLowerCase();

    if (!actions.parameterAnalyser.newPassword(req)) {
        return actions.responseEmitter.error(103, res);
    }

    // checking if password token for this username exists
    for(var i=0; i<pendingNewPasswords.length; i++) {
        if ( pendingNewPasswords[i].username == req.query.username) {
            return actions.responseEmitter.error(108,res);
        }
    }

    db.authentication.findOne({username : req.query.username}, function(err, doc) {
        // if user is not registered
        if(doc === null) {
            return actions.responseEmitter.error(105, res);
        }

        var newPasswordToken = Math.floor(new Date().getTime() + (Math.random() * 100000000) * (Math.random() * 10000000000));

        // creating a pending newPassword entry
        var pendingNewPasswordEntry = {
            username : req.query.username,
            newPasswordToken : newPasswordToken,
            timeoutToken : null
        };

        // setting timeout function to delete
        pendingNewPasswordEntry.timeoutToken = setTimeout(function() {
            if (pendingNewPasswords[i].username == pendingNewPasswordEntry.username) {
                pendingNewPasswords.splice(i, 1);
                return;
            }
        } ,args.rth * 3600000);

        // pushing to pendingNewPasswords
        pendingNewPasswords.push(pendingNewPasswordEntry);
        
        // sending email
        actions.mailer.sendMail(
            doc.email,

            "New Password",

            "Please visit this link to Complete New Password put your new password at the end of the URL : " +
            "http://" + (args.local?"localhost":myIP) + ":" + args.port.toString() +
            "/completeNewPassword?token=" + newPasswordToken.toString() +"&password="
        );

        //responding okay
        actions.responseEmitter.okay(res);
    });

    /* JAMES
    this is where you will be writing the code for the newPassword call.

    to acess url varialbes e.g. :http://0.0.0.0/newPassword?username=someusername
    so to get the username varable you need to use this "req.query.username".

    to send a response for the request use "actions.responseEmitter.okay(res)" OR
    "actions.responseEmitter.error(103, res)"

    to send emails you use this : "actions.mailer.sendMail(to, subject, text)";
    an example email send would be :

    actions.mailer.sendMail("mladen.kajic2@mail.dcu.ie" ,"Test Subject", "Hey this is a test email");

    leave all the code that is already in here.
    do not edit anything anywhere other than this file and completeNewPassword file.
    */
}

module.exports = newPassword;
