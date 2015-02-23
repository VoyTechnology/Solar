var chatMessageEmitter = {
    global : function(details, socket) {
        var message = {
            message : "chat",
            data : {
                type : details.type,
                from : details.fromPlayer.username,
                time : new Date().toJSON(),
                message : details.messageText
            }
        };

        socket.broadcast.emit(message.message, message.data);
        delete message.data.time;
    },

    personal : function(details) {
        var message = {
            message : "chat",
            data : {
                type : details.type,
                from : details.fromPlayer.username,
                time : new Date().toJSON(),
                message : details.messageText
            }
        };

        for (var i=0; i<details.toList.length; i++) {
            details.toList[i].socket.emit(message.message, message.data);
        }

        delete message.data.time;
    }
};

module.exports = chatMessageEmitter;
