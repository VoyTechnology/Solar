// loading config file
var config = require("./config.json");

// establishing connection to server
var io = require('socket.io-client');
var socket1 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString());
var socket2 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString(), {'force new connection': true});
var socket3 = io.connect("http://" + config.serverIp + ":" + config.serverPort.toString(), {'force new connection': true});

var accounts = {
    a1 : {
        username : "testun1",
        id : 1,
        token : "1"
    },
    a2 : {
        username : "testun2",
        id : 2,
        token : "2"
    },
    a3 : {
        username : "testun3",
        id : 3,
        token : "3"
    }
};

socket1.emit("start", accounts.a1);
socket2.emit("start", accounts.a2);
socket3.emit("start", accounts.a3);

var s1ChatData = null;
var s1ChatErrorData = null;
var s2ChatData = null;
var s2ChatErrorData = null;
var s3ChatData = null;
var s3ChatErrorData = null;

function resetData() {
    s1ChatData = null;
    s1ChatErrorData = null;
    s2ChatData = null;
    s2ChatErrorData = null;
    s3ChatData = null;
    s3ChatErrorData = null;
}

function isEquivalent(a, b) {
    if ( a === null && b === null) {
        return true;
    }
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}


socket1.on("chat", function(data) {
    console.log("s1 Chat");
    console.log(data);
    s1ChatData = data;
});
socket1.on("chatError", function(data) {
    console.log("s1 Chat Error");
    console.log(data);
    s1ChatErrorData = data;
});
socket2.on("chat", function(data) {
    console.log("s2 Chat");
    console.log(data);
    s2ChatData = data;
});
socket2.on("chatError", function(data) {
    console.log("s2 Chat Error");
    console.log(data);
    s2ChatErrorData = data;
});
socket3.on("chat", function(data) {
    console.log("s3 Chat");
    console.log(data);
    s3ChatData = data;
});
socket3.on("chatError", function(data) {
    console.log("s3 Chat Error");
    console.log(data);
    s3ChatErrorData = data;
});

exports.Null_Data_Chat_Test = function(test) {
    test.expect(2);

    var message = null;

    socket1.emit("chat", message);

    setTimeout(function() {
        test.equal(isEquivalent(message, s1ChatErrorData.original), true);
        test.equal(s1ChatErrorData.error.code, 101);

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Empty_Object_Chat_Test = function(test) {
    test.expect(2);

    var message = {};

    socket1.emit("chat", message);

    setTimeout(function() {
        test.equal(isEquivalent(message, s1ChatErrorData.original), true);
        test.equal(s1ChatErrorData.error.code, 101);

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Weird_Data_Chat_Test = function(test) {
    test.expect(2);

    var message = {
        p : "HerpDerp",
        timestamp : "DerpHerp"
    };

    socket1.emit("chat", message);

    setTimeout(function() {
        test.equal(isEquivalent(message, s1ChatErrorData.original), true);
        test.equal(s1ChatErrorData.error.code, 101);

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Sucessful_Private_Message = function(test) {
    test.expect(6);

    var message = {
        timestamp : new Date().getTime(),
        originator : accounts.a1.username,
        recipient : [accounts.a2.username],
        text : "Sup brah?"
    };

    socket1.emit("chat", message);

    setTimeout(function() {
        test.equal(s2ChatData.text, message.text);
        test.equal(s1ChatErrorData, null);
        test.equal(s1ChatData, null);
        test.equal(s2ChatErrorData, null);
        test.equal(s3ChatData, null);
        test.equal(s3ChatErrorData, null);

        resetData();
        test.done();
    }, config.waitTime);
};

exports.Sucessful_Global_Message = function(test) {
    test.expect();

    var message = {
        timestamp : new Date().getTime(),
        originator : accounts.a1.username,
        recipient : [],
        text : "Sup brah?"
    };

    socket1.emit("chat", message);

    setTimeout(function() {
        test.equal(s2ChatData.text, message.text);
        test.equal(s1ChatErrorData, null);
        test.equal(s1ChatData, null);
        test.equal(s2ChatErrorData, null);
        test.equal(s3ChatData.text, message.text);
        test.equal(s3ChatErrorData, null);

        resetData();
        test.done();
    }, config.waitTime);
};
