/*
This file is used to initialise the database
*/
console.log("Please Wait");

// loading config file
var config = require(__dirname + "/config.json");

// establishing connection to database
var mongojs = require('mongojs');
var db = mongojs(config.dbName, config.collections);

// determining how many test accounts to create by
// checking if a command line argument was supplied
var numTestAccounts;
if (process.argv.length < 3) {
    numTestAccounts = config.defaultNumTestAccounts;
}
else {
    numTestAccounts = parseInt(process.argv[2]);
}

// this function creates and inserts next test account entry.
function next(i) {

    // creating document for AUTHENTICATION collection
    var authenticationData = {
        $set : {
            id : i,
            token : i.toString(),
            email : "example@gmail.com",
            username : config.entryNamePattern + i.toString(),
            password : "CoolPass"
        }
    };
    // creating document for PLAYERS collection
    var playerData = {
        $set : {
            id : i,
            username : config.entryNamePattern + i.toString(),
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0}
        }
    };

    // uploading document to AUTHENTICATION collection
    db.authentication.update({id : i}, authenticationData, {upsert:true}, function() {
        // uploading document to PLAYERS collection after finished uploading to AUTHENTICATION collection
        db.players.update({id : i}, playerData, {upsert:true}, function() {
            // itterating counter
            i++;
            // checking if enough accounts already created
            if (i == numTestAccounts) {
                // if so terminating the program
                console.log("Done");
                process.exit(code=0);
            }
            else {
                // otherwise call itself again.
                next(i);
            }
        });
    });
}

// beginning recursive loop
next(0);
