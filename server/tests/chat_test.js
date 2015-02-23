var config = require("./config.json");

var io = require('socket.io-client');
var socket1 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());
var socket2 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString(), {'force new connection': true});

socket1.emit(config.APIFunctions.login, config.testAccounts.a1);
socket2.emit(config.APIFunctions.login, config.testAccounts.a2);
var user1 = config.testAccounts.a1.username;
var user2 = config.testAccounts.a2.username;

var socket1ChatData = null;
var socket2ChatData = null;

function resetData() {
    socket1ChatData = null;
    socket2ChatData = null;
}

socket1.on(config.callbacks.chat, function (data) {
    socket1ChatData = data;
});

socket2.on(config.callbacks.chat, function (data) {
    socket2ChatData = data;
});

exports.Socket1_Global_Message_Test = function(test) {
    test.expect(5);

    var chatMessageData = {
        type : "global",
        message : "1234"
    };

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket1ChatData.success, true);
        test.equal(socket2ChatData.type, "global");
        test.equal(socket2ChatData.message, chatMessageData.message);
        test.equal(socket2ChatData.from, user1);
        test.equal(typeof socket2ChatData.time, "string");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Socket2_Global_Message_Test = function(test) {
    test.expect(5);

    var chatMessageData = {
        type : "global",
        message : "1234"
    };

    socket2.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket2ChatData.success, true);
        test.equal(socket1ChatData.type, "global");
        test.equal(socket1ChatData.message, chatMessageData.message);
        test.equal(socket1ChatData.from, user2);
        test.equal(typeof socket1ChatData.time, "string");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Socket1_To_Socket2_Private_Message_Test = function(test) {
    test.expect(5);
    var chatMessageData = {
        type: "private",
        to : user2,
        message : "Hey, what's up?!?!?!"
    };

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket1ChatData.success, true);
        test.equal(socket2ChatData.type, "private");
        test.equal(socket2ChatData.from, user1);
        test.equal(socket2ChatData.message, chatMessageData.message);
        test.equal(typeof socket2ChatData.time, "string");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Socket2_To_Socket1_Private_Message_Test = function(test) {
    test.expect(5);
    var chatMessageData = {
        type: "private",
        to : user1,
        message : "Nothing much, and you?"
    };

    socket2.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket2ChatData.success, true);
        test.equal(socket1ChatData.type, "private");
        test.equal(socket1ChatData.from, user2);
        test.equal(socket1ChatData.message, chatMessageData.message);
        test.equal(typeof socket1ChatData.time, "string");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Invalid_Message_Type_Test = function(test) {
    test.expect(3);
    var chatMessageData = {
        type: "privote",
        to : user2,
        message : "Chillen."
    };

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket2ChatData, null);
        test.equal(socket1ChatData.success, false);
        test.equal(socket1ChatData.message, "Invalid type.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Null_Data_Chat_Test = function(test) {
    test.expect(2);
    var chatMessageData = null;

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket1ChatData.success, false);
        test.equal(socket1ChatData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Empty_Data_Object_Chat_Test = function(test) {
    test.expect(2);
    var chatMessageData = {};

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket1ChatData.success, false);
        test.equal(socket1ChatData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};

exports.Weird_Data_Chat_Test = function(test) {
    test.expect(2);
    var chatMessageData = {message : 34};

    socket1.emit(config.APIFunctions.chat, chatMessageData);

    setTimeout(function() {
        test.equal(socket1ChatData.success, false);
        test.equal(socket1ChatData.message, "Invalid data provided.");
        resetData();
        test.done();
    },config.waitTime);
};
