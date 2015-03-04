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
            direction : thisPlayer.direction
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
        var data = {
            error : error,
            original : original,
            position : thisPlayer.position,
            orientation : thisPlayer.orientation
        };
        socket.emit("moveError", data);
    },

    otherPlayers : function(thisPlayer, socket) {
        var message = {
            players : []
        };

        for(var somePlayer in global.server.loggedInPlayers) {
            if (somePlayer.username != thisPlayer.username) {
                message.players.push(somePlayer.getEssentialDetails());
            }
        }

        socket.emit("otherPlayers", message);
    },

    move : function(data, socket) {
        socket.emit.broadcast("move", data);
    }
};

module.exports = messageEmitter;
