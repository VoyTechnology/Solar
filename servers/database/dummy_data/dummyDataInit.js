/*
This file is used to initialise the database
*/
console.log("Please Wait");

// loading config file
var config = require(__dirname + "/config.json");

// establishing connection to database
var mongojs = require('mongojs');
var db = mongojs(config.dbName, config.collections);

// itterator
var i=0;

// deleting data if needed.
if (config.deleteFirst) {
    db.authentication.remove({});
    db.players.remove({});
}

// wait for database before creating entrys
setTimeout(function() {
    // Creating special accounts
    var jamesData = {
        // authentication
        auth : {
            id : 0,
            token : "0",
            email : "example@gmail.com",
            username : "james",
            password : "windows4life",
        },
        // player
        player : {
            id : 0,
            username : "james",
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0},
        }
    };
    db.authentication.insert(jamesData.auth);
    db.players.insert(jamesData.player);

    var wojData = {
        // authentication
        auth : {
            id : 1,
            token : "1",
            email : "example@gmail.com",
            username : "woj",
            password : "windows4life",
        },
        // player
        player : {
            id : 1,
            username : "woj",
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0},
        }
    };
    db.authentication.insert(wojData.auth);
    db.players.insert(wojData.player);

    var mladenData = {
        // authentication
        auth : {
            id : 2,
            token : "2",
            email : "example@gmail.com",
            username : "mladen",
            password : "windows4life",
        },
        // player
        player : {
            id : 2,
            username : "mladen",
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0},
        }
    };
    db.authentication.insert(mladenData.auth);
    db.players.insert(mladenData.player);

    // looping through test accounts to make
    // starting token is the amount of special accounts
    for (i=config.numSpecialAccounts; i<(config.numTestAccounts + config.numSpecialAccounts); i++) {
        // creating document for AUTHENTICATION collection
        var authenticationData = {
            id : i,
            token : i.toString(),
            email : "example@gmail.com",
            username : config.entryNamePattern + i.toString(),
            password : "CoolPass",
        };

        // creating document for PLAYERS collection
        var playerData = {
            id : i,
            username : config.entryNamePattern + i.toString(),
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0},
        };

        // uploading documents to server
        db.authentication.insert(authenticationData);
        db.players.insert(playerData);
    }

    console.log("Done");
}, 2000);
