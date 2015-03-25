function newPassword(req, res) {
    // if parameters invalid
    if (!actions.parameterAnalyser.newPassword(req)) {
        return actions.responseEmitter.error(103, res);
    }

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
