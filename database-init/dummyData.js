// loading external dependancies
var passHash = require("password-hash");
var mongojs = require('mongojs');
var args = require("commander");

args.version(2.0);
args.option("--num [num]", "Number of accounts to create, default 100", 100);
args.option("--deleteAll", "Erase whole database first");
args.option("--deleteTest", "Erase all test accounts first");
args.parse(process.argv);

// Setting up needed variables
var entryNamePattern = "testun";
var entryPassPattern = "testpass";
var startingPosition = { x : 0, y : 2000, z : 0 };

// establishing connection to database
var db = mongojs("solar", ["authentication", "players"]);
var OID = mongojs.ObjectId;

// this function is used to create a string of suitable length
// for the mongodb objectID conversion function from an index i
function indexToID(i) {
    var stringID = "";
    var paddingLength = 24 - ((i.toString()).length);

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
            token : passHash.generate(i.toString()),
            email : "example@gmail.com",
            username : entryNamePattern + i.toString(),
            password : passHash.generate(passToUse)
        }
    };
    // creating document for PLAYERS collection
    var playerData = {
        $set : {
            _id : OID(idToUse),
            username : entryNamePattern + i.toString(),
            ship : "astratis_v1",
            position : startingPosition,
            orientation : {x:0,y:0,z:0},
            test : true
        }
    };

    // uploading document to AUTHENTICATION collection
    db.authentication.update({_id : OID(idToUse)}, authenticationData, {upsert:true}, function() {
        // uploading document to PLAYERS collection after finished uploading to AUTHENTICATION collection
        db.players.update({_id : OID(idToUse)}, playerData, {upsert:true}, function() {
            // itterating counter
            i++;
            // checking if enough accounts already created
            if (i == args.num) {
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

function deletAllThenStart() {
    db.players.remove({}, function() {
        db.authentication.remove({}, function() {
            next(0);
        });
    });
}

function deleteTestsThenStart() {
    db.players.remove({test:true}, function() {
        db.authentication.remove({email:"example@gmail.com"}, function() {
            next(0);
        });
    });
}

// beginning recursive loop
console.log("Please Wait");
if (args.deleteAll) {
    deletAllThenStart();
}
else if (args.deleteTest) {
    deleteTestsThenStart();
}
else {
    next(0);
}
