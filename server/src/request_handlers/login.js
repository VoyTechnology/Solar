function login(data, session, socket) {
    if (session.thisPlayer.loggedIn) {return;}
    var responseConstructor = require(global.config.paths.socketResponseCS);

    if(data === null || typeof data.username === "undefined" || typeof data.password === "undefined") {
        return responseConstructor.noData("login", socket);
    }

    global.db.players.findOne({username: data.username}, function(err, doc) {
        var Player = require(global.config.paths.playerClass);
        var broadcastConstructor = require(global.config.paths.broadcastMessageCS);
        var constructorConditions = null;

        if ((doc === null) || (data.password != doc.password)) {
            constructorConditions = {
                success : false
            };
        }
        else {
            session.thisPlayer = new Player(doc);
            session.thisPlayer.loggedIn = true;
            global.loggedInPlayers.push(session.thisPlayer);
            constructorConditions = {
                success : true
            };
        }

        responseConstructor.login(constructorConditions, session.thisPlayer, socket);
        broadcastConstructor.playerLoggedIn(session.thisPlayer, socket);
    });
}

module.exports = login;
