function register(data, socket) {
    var socketResponseEmitter = require(global.config.paths.socketResponseEM);

    if(data === null || typeof data.username === "undefined" || typeof data.password === "undefined") {
        return socketResponseEmitter.noData("register", socket);
    }

    global.db.players.count({ username: data.username }, function (err, count) {
        var responseConditions = null;

        if (count) {
            responseConditions = {
                success : false,
                reason : "usernameTaken"
            };
        }
        else if (data.password.length < global.config.minPasswordSize) {
            responseConditions = {
                success : false,
                reason : "shortPassword"
            };
        }
        else {
            var Player = require(global.config.paths.playerClass);
            var newPlayer = new Player(data.username, data.password);
            global.db.players.save(newPlayer, function(err) {});
            newPlayer = null;
            responseConditions = {
                success : true
            };
        }

        socketResponseEmitter.register(responseConditions, socket);
    });
}

module.exports = register;
