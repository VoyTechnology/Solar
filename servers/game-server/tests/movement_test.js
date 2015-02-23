var config = require("./config.json");
var io = require('socket.io-client');
var socket = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());

socket.emit(config.APIFunctions.login, config.testAccounts.a1);

var moveData = null;
var turnData = null;
var pstatusData = null;

function resetData() {
    moveData = null;
    turnData = null;
    pstatusData = null;
}

socket.on(config.callbacks.move, function(data) {
    moveData = data;
});

socket.on(config.callbacks.turn, function(data) {
    turnData = data;
});

socket.on(config.callbacks.pstatus, function(data) {
    pstatusData = data;
});


exports.Too_Far_Move_Test = function(test) {
    test.expect(5);
    var position = {x: 100, y: 100, z: 100};
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        socket.emit(config.APIFunctions.pstatus);
        setTimeout(function() {
            test.equal(moveData.success, false);
            test.equal(moveData.message, "Too far.");
            test.equal(pstatusData.position.x, 0);
            test.equal(pstatusData.position.y, 0);
            test.equal(pstatusData.position.z, 0);
            resetData();
            test.done();
        }, config.waitTime);
    }, config.waitTime);
};

exports.Off_The_Map_Move_Test = function(test) {
    test.expect(5);
    var position = {x: -1, y: -1, z:-1};
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        socket.emit(config.APIFunctions.pstatus);
        setTimeout(function() {
            test.equal(moveData.success, false);
            test.equal(moveData.message, "Invalid location.");
            test.equal(pstatusData.position.x, 0);
            test.equal(pstatusData.position.y, 0);
            test.equal(pstatusData.position.z, 0);
            resetData();
            test.done();
        }, config.waitTime);
    }, config.waitTime);
};

exports.Successful_Move_Test = function(test) {
    test.expect(4);
    var position = {x: 5, y: 5, z: 5};
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        socket.emit(config.APIFunctions.pstatus);
        setTimeout(function(){
            test.equal(moveData.success, true);
            test.equal(pstatusData.position.x, 5);
            test.equal(pstatusData.position.y, 5);
            test.equal(pstatusData.position.z, 5);
            resetData();
            test.done();
        },config.waitTime);
    }, config.waitTime);
};

exports.Weird_Data_Move_Test = function(test) {
    test.expect(2);
    var position = {xp: 5, gy: 5};
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        test.equal(moveData.success, false);
        test.equal(moveData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};

exports.Null_Data_Move_Test = function(test) {
    test.expect(2);
    var position = null;
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        test.equal(moveData.success, false);
        test.equal(moveData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};

exports.Empty_Data_Object_Move_Test = function(test) {
    test.expect(2);
    var position = {};
    socket.emit(config.APIFunctions.move, position);

    setTimeout(function(){
        test.equal(moveData.success, false);
        test.equal(moveData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};

exports.Bad_Angle_Turn_Test = function(test) {
    test.expect(3);
    var direction = {xAngle: 10, yAngle: 10};
    socket.emit(config.APIFunctions.turn, direction);

    setTimeout(function(){
        socket.emit(config.APIFunctions.pstatus);
        setTimeout(function(){
            test.equal(turnData.success, false);
            test.equal(pstatusData.direction.xAngle, 0);
            test.equal(pstatusData.direction.yAngle, 0);
            resetData();
            test.done();
        },config.waitTime);
    }, config.waitTime);
};

exports.Successful_Turn_Test = function(test) {
    test.expect(3);
    var direction = {xAngle: Math.PI, yAngle: Math.PI};
    socket.emit(config.APIFunctions.turn, direction);

    setTimeout(function(){
        socket.emit(config.APIFunctions.pstatus);
        setTimeout(function(){
            test.equal(turnData.success, true);
            test.equal(pstatusData.direction.xAngle, Math.PI);
            test.equal(pstatusData.direction.yAngle, Math.PI);
            resetData();
            test.done();
        },config.waitTime);
    }, config.waitTime);
};

exports.Weird_Data_Turn_Test = function(test) {
    test.expect(2);
    var position = {GHB: Math.PI};
    socket.emit(config.APIFunctions.turn, position);

    setTimeout(function(){
        test.equal(turnData.success, false);
        test.equal(turnData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};

exports.Null_Data_Turn_Test = function(test) {
    test.expect(2);
    var position = null;
    socket.emit(config.APIFunctions.turn, position);

    setTimeout(function(){
        test.equal(turnData.success, false);
        test.equal(turnData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};

exports.Empty_Data_Object_Turn_Test = function(test) {
    test.expect(2);
    var position = {};
    socket.emit(config.APIFunctions.turn, position);

    setTimeout(function(){
        test.equal(turnData.success, false);
        test.equal(turnData.message, "Invalid data provided.");
        resetData();
        test.done();
    }, config.waitTime);
};
