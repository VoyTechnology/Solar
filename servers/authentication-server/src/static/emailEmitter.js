function emailEmitter() {
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'razoftsolar@gmail.com',
            pass: 'N0t@Wind0w$P@$$w0rd'
        }
    });
}

emailEmitter.prototype.sendMail = function(to, subject, text) {
    var mailOptions = {
        from: "<razoftsolar@gmail.com>", // sender address
        to: "", // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: text // html body
    };

    if (typeof to != "object") {
        mailOptions.to = to;
    }
    else {
        for (var i=0; i<to.length; i++) {
            mailOptions.to += to[i];
            if (i != to.length-1) {
                mailOptions += ", ";
            }
        }
    }

    this.transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }
    });

};

module.exports = emailEmitter;
