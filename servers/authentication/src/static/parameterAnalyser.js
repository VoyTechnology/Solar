var parameterAnalyser = {

    authenticate : function(req) {
        if (typeof req.query.username != "string") {
            return false;
        }
        if (typeof req.query.password != "string") {
            return false;
        }
        return true;
    },

    register : function(req) {
        if (typeof req.query.username != "string") {
            return false;
        }
        if (typeof req.query.password != "string") {
            return false;
        }
        if (typeof req.query.email != "string") {
            return false;
        }
        if (req.query.email.indexOf('@') === -1) {
            return false;
        }
        return true;
    },

    completeRegister : function(req) {
        if (typeof req.query.token != "string") {
            return false;
        }
        return true;
    },

    newPassword : function(req) {
        if (typeof req.query.username != "string") {
            return false;
        }
        return true;
    },

    completeNewPassword : function(req) {
        if (typeof req.query.token != "string") {
            return false;
        }
        if (typeof req.query.password != "string") {
            return false;
        }
        return true;
    }

};

module.exports = parameterAnalyser;
