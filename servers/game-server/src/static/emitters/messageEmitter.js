var messageEmitter = {

    rejected : function(error, socket) {
        socket.emit("rejected", error);
    },

    accepted : function(thisPlayer, socket) {
        var response = {
            timestamp : new Date().getTime(),
            major : global.server.version.major,
            minor : global.server.version.minor,
            orientation : thisPlayer.orientation,
            position : thisPlayer.position
        };

        socket.emit("accepted", response);
    },

    disconnect : function(error, socket) {
        socket.emit("disconnect", error);
    },

    chat : function(conditions, socket) {
        var message = {
            timestamp : conditions.timestamp,
            originator : conditions.originator,
            recipient : conditions.recipientOriginal,
            text : conditions.text
        };

        if (conditions.recipient.length === 0) {
            socket.emit.broadcast("chat", message);
        }
        else {
            for (var player in conditions.recipientArr) {
                player.socket.emit("chat", message);
            }
        }
    },

    chatError : function(error, original, socket) {
        var data = {
            error : error,
            original : original
        };
        socket.emit("chatError", data);
    },

    moveError : function(error, original, thisPlayer, socket) {
        console.log("Output --- VVV");

        var data = {
            error : error,
            original : original,
            position : thisPlayer.position,
            orientation : thisPlayer.orientation
        };
        console.log(data);
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

        socket.emit("otherPlayers", message);
    },

    move : function(data, socket) {
        console.log("Output --- VVV");
        console.log(data);
        socket.broadcast.emit("move", data);
    }
};

module.exports = messageEmitter;
