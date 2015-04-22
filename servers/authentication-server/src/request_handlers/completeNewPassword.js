function completeNewPassword(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.completeNewPassword(req)) {
        return actions.responseEmitter.error(103, res);
    }

    var thisEntry = null;
    // checking to see if this token is active
    for(var i=0; i<pendingNewPasswords.length; i++) {
        if(pendingNewPasswords[i].newPasswordToken == req.query.token) {
            thisEntry = pendingNewPasswords[i];
            pendingNewPasswords.splice(i, 1);
            break;
        }
    }

    if (thisEntry === null) {
        return actions.responseEmitter.error(102, res);
    }

    // clearing the interval
    clearTimeout(thisEntry.timeoutToken);

    // updating the database
    db.authentication.update({username:thisEntry.username}, {$set:{password: passTool.generate(req.query.password)}}, function() {
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
    do not edit anything anywhere other than this file and newPassword file.
    */

}

module.exports = completeNewPassword;
