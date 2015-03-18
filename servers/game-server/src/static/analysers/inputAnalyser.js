var inputAnalyser = {

    chat : function(data) {
        var message = {
            sucess : false,
            error : global.server.config.errorCodes.e101
        };

        if (data === null) {
            console.log("1");
        }
        else if (typeof data.timestamp != "number" || typeof data.originator != "string") {
            console.log("2");
        }
        else if (typeof data.recipient != "object" || typeof data.text != "string") {
            console.log("3");
        }
        else {
            message.sucess = true;
            delete message.error;
        }

        console.log(message);
        return message;
    },

    move : function(data) {
        var message = {
            sucess : false,
            error : global.server.config.errorCodes.e101
        };

        if (data === null) {

        }
        else if (typeof data.timestamp != "number" || typeof data.id != "number") {

        }
        else if (typeof data.position != "object" || typeof data.orientation != "object") {

        }
        else if (typeof data.username != "string") {

        }
        else if (typeof data.position.x != "number" || typeof data.position.y != "number" || typeof data.position.z != "number") {

        }
        else if (typeof data.orientation.x != "number" || typeof data.orientation.y != "number" || typeof data.orientation.z != "number") {

        }
        else {
            message.sucess = true;
            delete message.error;
        }

        return message;
    },

    start : function(data) {
        var message = {
            sucess : false,
            error : global.server.config.errorCodes.e101
        };

        if(data === null) {
        }
        else if (typeof data.token != "string" || typeof data.id != "number") {
        }
        else {
            message.success = true;
            delete message.error;
        }

        return message;
    },

    moveSync : function(data) {
        var message = {
            sucess : false,
            error : global.server.config.errorCodes.e101
        };

        if (data === null) {

        }
        else if (typeof data.timestamp != "number" || typeof data.id != "number") {

        }
        else {
            message.sucess = true;
            delete message.error;
        }

        return message;
    }

};

module.exports = inputAnalyser;
