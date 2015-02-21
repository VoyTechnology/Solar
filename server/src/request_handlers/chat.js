function chat(data, session, socket) {
    if(!session.thisPlayer.loggedIn){return;}
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);

    if(data === null || typeof data.type == "undefined" || typeof data.message == "undefined") {
        return socketResponseEmitter.noData("chat", socket);
    }

    var chatMessageEmitter = require(global.config.paths.chatMessageEM);
    var details = {
        type : data.type,
        fromPlayer : session.thisPlayer,
        messageText : data.message
    };
    var srConditions = {
        success : true,
        reason : null
    };

    chatMessageEmitter.global(details, socket);
    socketResponseEmitter.chat(srConditions, socket);
}

module.exports = chat;
