var responseEmitter = {

    error : function(code, res) {
        var message = {
            success : false,
            error : {
                code : code,
                reasonText : auth.config.errorCodes[code-100]
            }
        };
        res.json(message);
        res.end();
    },

    okay : function(res) {
        res.json({success : true});
        res.end();
    }
};

module.exports = responseEmitter;
