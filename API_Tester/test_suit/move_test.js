// loading config file
var config = require("./config.json");

// establishing connection to server
var io = require('socket.io-client');
var socket1 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());
var socket2 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString(), {'force new connection': true});
socket1.emit("start", {username: "testun1", token: "1"});
socket2.emit("start", {username: "testun2", token: "2"});

// callback data variables
var moveErrorData = null;
var moveData = null;
var otherPlayersData = null;
var sock2MoveData = null;

// callback data reset function
function resetData() {
    moveErrorData = null;
    moveData = null;
    otherPlayersData = null;
    sock2MoveData = null;
    socket1.emit("moveSync", {});
}

resetData();

// callback listeners
socket1.on("moveError", function(data) {
    moveErrorData = data;
    console.log("VVVV--moveError--VVVV");
    console.log(data);
});
socket1.on("move", function(data) {
    moveData = data;
    console.log("VVVV--moveData--VVVV");
    console.log(data);
});
socket2.on("move", function(data) {
    sock2MoveData = data;
    console.log("VVVV--sock2MoveData--VVVV");
    console.log(data);
});
socket1.on("otherPlayers", function(data) {
    otherPlayersData = data;
    console.log("VVVV--otherPlayers--VVVV");
    console.log(data);
});

// tests
exports.Too_far_Move_Test = function(test) {
    test.expect(10);
    setTimeout(function(){
        var message = {
            timestamp : new Date().getTime(),
            username : "testun1",
            position : {x:1000,y:1000,z:1000},
            orientation : {x:1.5,y:0,z:1}
        };

        socket1.emit("move", message);

        setTimeout(function(){
            test.notEqual(moveErrorData, null);
            test.equal(JSON.stringify(moveErrorData.original), JSON.stringify(message));
            test.equal(moveErrorData.position.x, 0);
            test.equal(moveErrorData.position.y, 0);
            test.equal(moveErrorData.position.z, 0);
            test.equal(moveErrorData.orientation.x, 0);
            test.equal(moveErrorData.orientation.y, 0);
            test.equal(moveErrorData.orientation.z, 0);
            test.equal(moveErrorData.error.code, 109);
            test.equal(moveErrorData.error.reasonText, "Out of bounds");

            test.done();
            resetData();
        }, config.waitTime);
    },5000);
};

exports.Succesful_Move_Test = function(test) {
    test.expect(10);

    var message = {
        timestamp : new Date().getTime(),
        username : "testun1",
        position : {x:20,y:20,z:20},
        orientation : {x:1.5,y:0,z:1}
    };

    socket1.emit("move", message);
    message.position = {x:1000, y:1000, z: 1000};
    socket1.emit("move", message);

    setTimeout(function(){
        test.equal(moveErrorData.original.position.x, 1000);
        test.equal(moveErrorData.original.position.y, 1000);
        test.equal(moveErrorData.original.position.z, 1000);
        test.equal(sock2MoveData.username, "testun1");
        test.equal(sock2MoveData.position.x, 20);
        test.equal(sock2MoveData.position.y, 20);
        test.equal(sock2MoveData.position.z, 20);
        test.equal(sock2MoveData.orientation.x, 1.5);
        test.equal(sock2MoveData.orientation.y, 0);
        test.equal(sock2MoveData.orientation.z, 1);

        test.done();
        resetData();
    }, config.waitTime);
};

/*
exports.Database_Saving_Position_Test = function(test) {
    test.expect();

    var message = {

    };

    socket.emit("x", message);

    setTimeout(function(){
        test.notEqual();
        test.equal();

        test.done();
        resetData();
    }, config.waitTime);
};
*/
