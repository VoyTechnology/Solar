function register(data, socket) {
    var responseEmitter = require(global.config.paths.socketResponseCS);

    if(data === null || typeof data.username === "undefined" || typeof data.password === "undefined") {
        return responseEmitter.noData("register", socket);
    }

    global.db.players.count({ username: data.username }, function (err, count) {
        var constructorConditions = null;

        if (count) {
            constructorConditions = {
                success : false,
                reason : "usernameTaken"
            };
        }
        else if (data.password.length < global.config.minPasswordSize) {
            constructorConditions = {
                success : false,
                reason : "shortPassword"
            };
        }
        else {
            var Player = require(global.config.paths.playerClass);
            var newPlayer = new Player(data.username, data.password);
            global.db.players.save(newPlayer, function(err) {});
            newPlayer = null;
            constructorConditions = {
                success : true
            };
        }

        responseEmitter.register(constructorConditions, socket);
    });
}

module.exports = register;
