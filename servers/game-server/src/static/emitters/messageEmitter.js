/*
this file is specifically for emitting messages
from the server to specific clients
*/

var messageEmitter = {
    
    rejected : function(error, socket) {
        socket.emit("rejected", error);
        console.log("rejected");
    },

    accepted : function(thisPlayer, socket) {
        var response = {
            timestamp : new Date().getTime(),
            major : global.server.version.major,
            minor : global.server.version.minor,
            orientation : thisPlayer.orientation,
            position : thisPlayer.position
        };

        console.log("accepted");
        socket.emit("accepted", response);
    },

    disconnect : function(error, socket) {
        console.log("disconnect");
        socket.emit("disconnect", error);
    },

    chat : function(conditions, socket) {
        var message = conditions.original;

        if (conditions.recipientArr.length === 0) {
            console.log("chat broad");
            socket.broadcast.emit("chat", message);
        }
        else {
            for (var i=0; i<conditions.recipientArr.length; i++) {
                console.log("chat single");
                conditions.recipientArr[i].socket.emit("chat", message);
            }
        }
    },

    chatError : function(error, original, socket) {
        var data = {
            error : error,
            original : original
        };
        console.log("chatError");
        socket.emit("chatError", data);
    },

    moveError : function(error, original, thisPlayer, socket) {

        var data = {
            error : error,
            original : original,
            position : thisPlayer.position,
            orientation : thisPlayer.orientation
        };

        console.log("moveError");
        socket.emit("moveError", data);
    },

    otherPlayers : function(thisPlayer, socket) {
        var message = {
            players : []
        };


        for(var i=0; i<global.server.loggedInPlayers.length; i++) {

            if (global.server.loggedInPlayers[i].username != thisPlayer.username) {
                message.players.push(global.server.loggedInPlayers[i].getEssentialDetails());
            }
        }

        console.log("otherPlayers");
        socket.emit("otherPlayers", message);
    },

    move : function(data, socket) {
        console.log("move broad");
        socket.broadcast.emit("move", data);
    }
};

module.exports = messageEmitter;
