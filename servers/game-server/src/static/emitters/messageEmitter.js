/*
this file is specifically for emitting messages
from the server to specific clients
*/

var messageEmitter = {

    rejected : function(code, socket) {
        socket.emit("rejected", actions.errorCode(code));
    },

    accepted : function(thisPlayer, socket) {
        var response = {
            timestamp : new Date().getTime(),
            major : version.major,
            minor : version.minor,
            orientation : thisPlayer.orientation,
            position : thisPlayer.position
        };

        socket.emit("accepted", response);
        console.log("accepted");
    },

    disconnect : function(code, socket) {
        socket.emit("disconnect", actions.errorCode(code));
    },

    chat : function(conditions, socket) {
        var message = conditions.original;

        if (conditions.recipientArr.length === 0) {
            socket.broadcast.emit("chat", message);
        }
        else {
            for (var i=0; i<conditions.recipientArr.length; i++) {
                conditions.recipientArr[i].socket.emit("chat", message);
            }
        }
        console.log("chat");
    },

    chatError : function(errorCode, original, socket) {
        var data = {
            error : actions.errorCode(errorCode),
            original : original
        };
        socket.emit("chatError", data);
        console.log("chatError");
    },

    moveError : function(errorCode, original, thisPlayer, socket) {

        var data = {
            error : actions.errorCode(errorCode),
            original : original,
            position : thisPlayer.position,
            orientation : thisPlayer.orientation
        };

        socket.emit("moveError", data);
        console.log("moveError");
        console.log(data);
    },

    otherPlayers : function(thisPlayer, socket) {
        var message = {
            players : []
        };

        for(var i=0; i<playerArray.players.length; i++) {

            if (playerArray.players[i].username != thisPlayer.username) {
                message.players.push(playerArray.players[i].getEssentialDetails());
            }
        }

        socket.emit("otherPlayers", message);
        console.log("otherPlayers");
    },

    move : function(data, socket) {
        socket.broadcast.emit("move", data);
    }
};

module.exports = messageEmitter;
