// loading config file
var config = require(__dirname + "/config.json");

// establishing connection to database
var mongojs = require('mongojs');
var db = mongojs(config.dbName, config.collections);

// itterator
var i=0;

// auth data
for (i=0; i<config.numTestAccounts; i++) {
    var num = i.toString();

    var entry = {
        username : config.entryNamePattern + num,
        token : num
    };

    db.authentication.insert(entry);
}

for (i=0; i<config.specials.length; i++) {
    db.authentication.insert(config.specials[i]);
}

// player data
for (i=0; i<config.numTestAccounts; i++) {
    var num = i.toString();

    var entry = {
        username : config.entryNamePattern + num,
        password : "CoolPassword",
        ship : "astratis_v1",
        position : {x:0, y:0, z:0},
        orientation : {x:0, y:0, z:0}
    };

    db.players.insert(entry);
}

for (i=0; i<config.specials.length; i++) {
    var entry = {
        username : config.specials[i].username,
        password : "windowsislife",
        ship : "astratis_v1",
        position : {x:0, y:0, z:0},
        orientation : {x:0, y:0, z:0}
    }

    db.players.insert(entry);
}
