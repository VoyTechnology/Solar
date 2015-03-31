/*
This file is used to initialise the database
*/
console.log("Please Wait");

// loading config file
var config = require(__dirname + "/config.json");

// establishing connection to database
var mongojs = require('mongojs');
var db = mongojs(config.dbName, config.collections);
var OID = mongojs.ObjectId;

// loading in password hash and salt module
var passHash = require("password-hash");

// determining how many test accounts to create by
// checking if a command line argument was supplied
var numTestAccounts;
if (process.argv.length < 3) {
    numTestAccounts = config.defaultNumTestAccounts;
}
else {
    numTestAccounts = parseInt(process.argv[2]);
}

// this function is used to create a string of suitable length
// for the mongodb objectID conversion function from an index i
function indexToID(i) {
    var stringID = "";
    var paddingLength = 12 - ((i.toString()).length);

    for(var j=0 ; j<paddingLength; j++) {
        stringID += "0";
    }

    stringID += i.toString();
    return stringID;
}

// this function creates and inserts next test account entry.
function next(i) {

    var idToUse = indexToID(i);
    var passToUse = "testpass" + i.toString();

    // creating document for AUTHENTICATION collection
    var authenticationData = {
        $set : {
            _id : OID(idToUse),
            token : i.toString(),
            email : "example@gmail.com",
            username : config.entryNamePattern + i.toString(),
            password : passHash.generate(passToUse)
        }
    };
    // creating document for PLAYERS collection
    var playerData = {
        $set : {
            _id : OID(idToUse),
            username : config.entryNamePattern + i.toString(),
            ship : "astratis_v1",
            position : config.startingPosition,
            orientation : {x:0,y:0,z:0}
        }
    };

    // uploading document to AUTHENTICATION collection
    db.authentication.update({_id : OID(idToUse)}, authenticationData, {upsert:true}, function() {
        // uploading document to PLAYERS collection after finished uploading to AUTHENTICATION collection
        db.players.update({_id : OID(idToUse)}, playerData, {upsert:true}, function() {
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
