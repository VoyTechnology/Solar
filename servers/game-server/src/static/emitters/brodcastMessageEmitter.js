var brodcastMessageEmitter = {

    playerChangedState : function(player, socket) {
        var message =  {
            message : "playerChangedState",
            data : {
                username : player.username,
                position : player.position,
                direction : player.direction,
            }
        };

        socket.broadcast.emit(message.message, message.data);
    },

    playerLoggedIn : function(player, socket) {
        var message = {
            message : "playerLoggedIn",
            data : {
                username : player.username,
                position : player.position,
                direction : player.direction
            }
        };

        socket.broadcast.emit(message.message, message.data);
    }
};

module.exports = brodcastMessageEmitter;
