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
        var message = conditions.original;

        if (conditions.recipientArr.length === 0) {
            socket.broadcast.emit("chat", message);
        }
        else {
            for (var i=0; i<conditions.recipientArr.length; i++) {
                conditions.recipientArr[i].socket.emit("chat", message);
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

        console.log("OUTPUT");
        console.log(data);
        console.log("\n");

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
        socket.broadcast.emit("move", data);
    }
};

module.exports = messageEmitter;
