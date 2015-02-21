function chat(data, session, socket) {

    if(!session.thisPlayer.loggedIn){return;}
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);

    if(data === null || typeof data.type == "undefined" || typeof data.message != "string") {
        return socketResponseEmitter.noData("chat", socket);
    }

    var chatMessageEmitter = require(global.config.paths.chatMessageEM);
    var messageSent = false;

    var chatMessageEmitterDetails = {
        type : data.type,
        fromPlayer : session.thisPlayer,
        messageText : data.message,
        toList : []
    };
    var srConditions = {
        success : null,
        reason : null
    };

    if(data.type == "global") {
        chatMessageEmitter.global(chatMessageEmitterDetails, socket);
        messageSent = true;
    }
    else if(data.type == "private") {
        for (var i=0; i<global.loggedInPlayers.length; i++) {
            if (global.loggedInPlayers[i].username == data.to) {
                chatMessageEmitterDetails.toList.push(global.loggedInPlayers[i]);
                break;
            }
        }

        chatMessageEmitter.personal(chatMessageEmitterDetails, socket);
        messageSent = true;
    }

    if(!messageSent) {
        srConditions.success = false;
        srConditions.reason = "invalidType";
    }
    else {
        srConditions.success = true;
    }

    socketResponseEmitter.chat(srConditions, socket);
}

module.exports = chat;
