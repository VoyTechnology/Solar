// loading config file
var config = require("./config.json");

// establishing connection to server
var io = require('socket.io-client');
var socket = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());

// accounts to use
var account = {
    id : 1,
    token : "1"
};

// callback data variables
var acceptedData = null;
var rejectedData = null;
var otherPlayersData = null;

// callback data reset function
function resetData() {
    acceptedData = null;
    rejectedData = null;
    otherPlayersData = null;
}

// callback listeners
socket.on("accepted", function(data) {
    acceptedData = data;
    console.log(data);
});
socket.on("rejected", function(data) {
    rejectedData = data;
});
socket.on("otherPlayers", function(data) {
    otherPlayersData = data;
});

// tests
exports.Bad_Token_Authentication_Test = function(test) {
    test.expect(5);

    var message = {
        id : account.id,
        token : "bgdklgfweiopfjbklnjsdvl"
    };

    socket.emit("start", message);

    setTimeout(function(){
        test.notEqual(rejectedData, null);
        test.equal(acceptedData, null);
        test.equal(otherPlayersData, null);
        test.equal(rejectedData.code, 106);
        test.equal(rejectedData.reasonText, "Authentication failure");

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Null_Data_Authentication_Test = function(test) {
    test.expect(5);

    var message = null;

    socket.emit("start", message);

    setTimeout(function(){
        test.notEqual(rejectedData, null);
        test.equal(acceptedData, null);
        test.equal(otherPlayersData, null);
        test.equal(rejectedData.code, 101);
        test.equal(rejectedData.reasonText, "Missing parameter in request");

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Empty_Object_Authentication_Test = function(test) {
    test.expect(5);

    var message = {};

    socket.emit("start", message);

    setTimeout(function(){
        test.notEqual(rejectedData, null);
        test.equal(acceptedData, null);
        test.equal(otherPlayersData, null);
        test.equal(rejectedData.code, 101);
        test.equal(rejectedData.reasonText, "Missing parameter in request");

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Weird_Data_Authentication_Test = function(test) {
    test.expect(5);

    var message = {fsdljkf : "fsd"};

    socket.emit("start", message);

    setTimeout(function(){
        test.notEqual(rejectedData, null);
        test.equal(acceptedData, null);
        test.equal(otherPlayersData, null);
        test.equal(rejectedData.code, 101);
        test.equal(rejectedData.reasonText, "Missing parameter in request");

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Successful_Authentication_Test = function(test) {
    test.expect(3);

    var message = account;

    socket.emit("start", message);

    setTimeout(function(){
        test.notEqual(acceptedData, null);
        test.notEqual(otherPlayersData, null);
        test.equal(rejectedData, null);

        resetData();
        test.done();
    }, config.waitTime);
};

/*
{
"timestamp": 368389679893479,
"major":0,
"minor":2
"position": {
"x":42363.5374374,
"y":3947394796.215,
"z":846.26732
},
"orientation": {
"x":1.457,
"y":0.525,
"z":0.2546
}
}
*/
