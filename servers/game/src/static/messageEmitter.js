/*
this file is specifically for emitting messages
from the server to specific clients
*/

var messageEmitter = {

    rejected : function(code, socket) {
        socket.emit("rejected", game.actions.errorCode(code));
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
    },

    disconnect : function(code, socket) {
        socket.emit("disconnect", game.actions.errorCode(code));
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

    chatError : function(errorCode, original, socket) {
        var data = {
            error : game.actions.errorCode(errorCode),
            original : original
        };
        socket.emit("chatError", data);
    },

    moveError : function(errorCode, original, thisPlayer, socket) {

        var data = {
            error : game.actions.errorCode(errorCode),
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

        for(var i=0; i<playerArray.players.length; i++) {

            if (playerArray.players[i].username != thisPlayer.username) {
                message.players.push(playerArray.players[i].getEssentialDetails());
            }
        }

        socket.emit("otherPlayers", message);
    },

    move : function(data, socket) {
        socket.broadcast.emit("move", data);
    },

    inventoryUpdate : function(player) {
    console.log("here");
    var message = {
        money : player.money,
        comodities : [],
        quantities : []
    };

    for (var i=0; i<player.items.length; i++) {
        var comodity = {
            id : player.items[i].id,
            name : player.items[i].name,
            description : player.items[i].description,
            units : player.items[i].units
        };

        var quantity = {
            comodity : comodity.id,
            quantity : player.items[i].quantity
        };

        message.comodities.push(comodity);
        message.quantities.push(quantity);
    }

    console.log(message);

    player.socket.emit("inventoryUpdate", message);
},

tradeError : function(code, player, original) {
    var message = {
        error : actions.errorCode(code),
        trade : original
    };

    player.socket.emit("tradeError", message);
}
};

module.exports = messageEmitter;
