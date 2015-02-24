function login(data, session, socket) {
    if (session.thisPlayer.loggedIn) {return;}
    var socketResponseEmitter = require(global._home + global.config.paths.socketResponseEM);

    if(data === null || typeof data.username === "undefined" || typeof data.password === "undefined") {
        return socketResponseEmitter.noData("login", socket);
    }

    global.db.players.findOne({username: data.username}, function(err, doc) {
        var Player = require(global._home + global.config.paths.playerClass);
        var brodcastMessageEmitter = require(global._home + global.config.paths.brodcastMessageEM);
        var responseConditions = null;

        if ((doc === null) || (data.password != doc.password)) {
            responseConditions = {
                success : false
            };
        }
        else {
            session.thisPlayer = new Player(doc, socket);
            session.thisPlayer.loggedIn = true;
            global.loggedInPlayers.push(session.thisPlayer);
            responseConditions = {
                success : true
            };
        }

        socketResponseEmitter.login(responseConditions, session.thisPlayer, socket);
        brodcastMessageEmitter.playerLoggedIn(session.thisPlayer, socket);
    });
}

module.exports = login;
