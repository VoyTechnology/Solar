var responseEmitter = {

    error : function(code, res) {
        var message = {
            status : "error",
            code : code,
            reasonText : config.errorCodes[code-100]
        };
        res.json(message);
        res.end();
    },

    okay : function(res) {
        res.json({status : "okay"});
        res.end();
    }
};

module.exports = responseEmitter;
