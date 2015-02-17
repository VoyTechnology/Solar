var io = require('socket.io-client');
var socket = io.connect("http://localhost:3000");

var movesuccess;
var turnsuccess;
var username = "testun1";
var password = "testpa1";
var player;

socket.on("loginSuccess", function(data) {
    player = data.player;
});

socket.on("changeDirectionSuccess", function(data) {
    turnsuccess = true;
    player.direction = data;
});

socket.on("changePositionSuccess", function(data) {
    movesuccess = true;
    player.position = data;
});

socket.on("changeDirectionFail", function() {
    turnsuccess = false;
});

socket.on("changePositionFail", function() {
    movesuccess = false;
});

socket.emit("login", {
    username: username,
    password: password
});

exports.tooFarMoveTest = function(test) {
    test.expect(4);
    var position = {x: 100, y: 100, z: 100};
    socket.emit("changePosition", position);

    setTimeout(function(){
        test.equal(movesuccess, false);
        test.equal(player.position.x, 0);
        test.equal(player.position.y, 0);
        test.equal(player.position.z, 0);
        movesuccess = null;
        test.done();
    }, 5000);
};

exports.offTheMapMoveTest = function(test) {
    test.expect(4);
    var position = {x: -1, y: -1, z:-1};
    socket.emit("changePosition", position);

    setTimeout(function(){
        test.equal(movesuccess, false);
        test.equal(player.position.x, 0);
        test.equal(player.position.y, 0);
        test.equal(player.position.z, 0);
        movesuccess = null;
        test.done();
    }, 5000);
};

exports.successfulMoveTest = function(test) {
    test.expect(4);
    var position = {x: 5, y: 5, z: 5};
    socket.emit("changePosition", position);

    setTimeout(function(){
        test.equal(movesuccess, true);
        test.equal(player.position.x, 5);
        test.equal(player.position.y, 5);
        test.equal(player.position.z, 5);
        movesuccess = null;
        test.done();
    }, 5000);
};

exports.badAngleTurnTest = function(test) {
    test.expect(3);
    var direction = {xAngle: 10, yAngle: 10};
    socket.emit("changeDirection", direction);

    setTimeout(function(){
        test.equal(turnsuccess, false);
        test.equal(player.direction.xAngle, 0);
        test.equal(player.direction.yAngle, 0);
        turnsuccess = null;
        test.done();
    }, 5000);
};

exports.successfulTurnTest = function(test) {
    test.expect(3);
    var direction = {xAngle: Math.PI, yAngle: Math.PI};
    socket.emit("changeDirection", direction);

    setTimeout(function(){
        test.equal(turnsuccess, true);
        test.equal(player.direction.xAngle, Math.PI);
        test.equal(player.direction.yAngle, Math.PI);
        turnsuccess = null;
        test.done();
    }, 5000);
};
