var config = require("./config.json");
var io = require('socket.io-client');
var socket = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());

var registerData = null;
var loginData = null;
var pstatusData = null;

function resetData() {
    registerData = null;
    loginData = null;
    pstatusData = null;
}

socket.on(config.callbacks.register, function(data) {
    registerData = data;
});

socket.on(config.callbacks.login, function(data) {
    loginData = data;
});

socket.on(config.callbacks.pstatus, function(data) {
    pstatusData = data;
});

// Registration tests
exports.Successful_Registration_Test = function(test) {
    test.expect(2);
    socket.emit(config.APIFunctions.register, config.testAccounts.a1);

    setTimeout(function() {
        test.equal(registerData.success, true);
        test.strictEqual(typeof registerData.message, "undefined");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Taken_Username_Registration_Test = function(test) {
    test.expect(2);
    socket.emit(config.APIFunctions.register, config.testAccounts.a1);

    setTimeout(function() {
        test.equal(registerData.success, false);
        test.equal(registerData.message, "Username taken.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Short_Password_Registration_Test = function(test) {
    test.expect(2);
    var registerEntry = {username: "SomethingStupidHere", password: "sht"};
    socket.emit(config.APIFunctions.register, registerEntry);

    setTimeout(function() {
        test.equal(registerData.success, false);
        test.equal(registerData.message, "Password is too short.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Null_Data_Registration_Test = function(test) {
    test.expect(2);
    var registerEntry = null;
    socket.emit(config.APIFunctions.register, registerEntry);

    setTimeout(function() {
        test.equal(registerData.success, false);
        test.equal(registerData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Empty_Data_Object_Registration_Test = function(test) {
    test.expect(2);
    var registerEntry = {};
    socket.emit(config.APIFunctions.register, registerEntry);

    setTimeout(function() {
        test.equal(registerData.success, false);
        test.equal(registerData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Weird_Data_Registration_Test = function(test) {
    test.expect(2);
    var registerEntry = {hrt: "www", password : "coolKids"};
    socket.emit(config.APIFunctions.register, registerEntry);

    setTimeout(function() {
        test.equal(registerData.success, false);
        test.equal(registerData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

// Login tests
exports.Null_Data_Login_Test = function(test) {
    test.expect(2);
    var loginEntry = null;
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, false);
        test.equal(loginData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Wird_Data_Login_Test = function(test) {
    test.expect(2);
    var loginEntry = {ghbb: "fdsfsd"};
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, false);
        test.equal(loginData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Emptry_Data_Object_Login_Test = function(test) {
    test.expect(2);
    var loginEntry = {};
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, false);
        test.equal(loginData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Bad_Username_Login_Test = function(test) {
    test.expect(2);
    var loginEntry = {username: "someWeirdAssUsernameGoesHere", password: config.testAccounts.a1.password};
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, false);
        test.equal(typeof loginData.player, "undefined");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Bad_Password_Login_Test = function(test) {
    test.expect(2);
    var loginEntry = {username: config.testAccounts.a1.username, password: "thisIsABadPassword123"};
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, false);
        test.equal(typeof loginData.player, "undefined");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Successful_Login_Test = function(test) {
    test.expect(6);
    var loginEntry = {username: config.testAccounts.a1.username, password: config.testAccounts.a1.password};
    socket.emit(config.APIFunctions.login, loginEntry);

    setTimeout(function() {
        test.equal(loginData.success, true);
        test.equal(typeof loginData.player.position.x, "number");
        test.equal(typeof loginData.player.position.y, "number");
        test.equal(typeof loginData.player.position.z, "number");
        test.equal(typeof loginData.player.direction.xAngle, "number");
        test.equal(typeof loginData.player.direction.yAngle, "number");
        resetData();
        test.done();
    },config.waitTime);
};

// Pstatus tests
exports.Pstatus_Non_Vunrability_Test = function(test) {
    test.expect(5);
    socket.emit(config.APIFunctions.pstatus, {});

    setTimeout(function() {
        test.equal(pstatusData.username, config.testAccounts.a1.username);
        test.equal(typeof pstatusData.password, "undefined");
        test.equal(typeof pstatusData.socket, "undefined");
        test.equal(typeof pstatusData._id, "undefined");
        test.equal(typeof pstatusData.position.z, "number");
        resetData();
        test.done();
    }, config.waitTime);
};
