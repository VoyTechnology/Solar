/*
This file contains functions whos sole purpose is to check
if data received with certain messages is valid.
e.g. the "chat" function in this file checks data to make sure
it is correctly formatted for a "chat" message as per version
of API
*/

var inputAnalyser = {

    // chat Data analyser
    chat : function(data) {
        var message = {
            sucess : false,
            error : 101
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

    // move Data analyser
    move : function(data) {
        var message = {
            sucess : false,
            error : 101
        };

        if (data === null) {

        }
        else if (typeof data.timestamp != "number" || typeof data.id != "string") {
            console.log("1");
        }
        else if (typeof data.position != "object" || typeof data.orientation != "object") {
            console.log(2);
        }
        else if (typeof data.position.x != "number" || typeof data.position.y != "number" || typeof data.position.z != "number") {
            console.log(3);
        }
        else if (typeof data.orientation.x != "number" || typeof data.orientation.y != "number" || typeof data.orientation.z != "number") {
            console.log(4);
        }
        else {
            message.sucess = true;
            delete message.error;
        }

        return message;
    },

    // start Data analyser
    start : function(data) {
        var message = {
            sucess : false,
            error : 101
        };

        if(data === null) {
        }
        else if (typeof data.token != "string" || typeof data.id != "string") {
        }
        else {
            message.success = true;
            delete message.error;
        }

        return message;
    },

    // moveSync Data analyser
    moveSync : function(data) {
        var message = {
            sucess : false,
            error : 101
        };

        if (data === null) {

        }
        else if (typeof data.timestamp != "number" || typeof data.id != "string") {

        }
        else {
            message.sucess = true;
            delete message.error;
        }

        return message;
    }

};

module.exports = inputAnalyser;
