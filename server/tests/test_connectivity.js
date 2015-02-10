var io = require('socket.io-client');
var socket = io.connect("http://localhost:3000");

var registrationResults;
var loginResults;

// Event Handlers
socket.on("registerFail", function(data) {
	registrationResults = data.id;
})

socket.on("registerSuccess", function() {
	registrationResults = -1;
})

socket.on("loginFail", function() {
	loginResults = false;
})

socket.on("loginSuccess", function() {
	loginResults = true;
})


// Registration Tests
exports.registerSuccessfully = function(test) {
	test.expect(1);
	var registerEntry = {username: "testun1", password: "testpa1"};
	socket.emit("register", registerEntry);

    setTimeout(function(){
        test.equal(registrationResults, -1);
		registrationResults = null;
		test.done();
    }, 5000); 
};


exports.registerTakenUsernameTest = function(test) {
	test.expect(1);
	var registerEntry = {username: "testun1", password: "testpa1"};
	socket.emit("register", registerEntry);

    setTimeout(function(){
        test.equal(registrationResults, 0);
		registrationResults = null;
		test.done();
    }, 5000); 
};

exports.registerShortPasswordTest = function(test) {
	test.expect(1);
	var registerEntry = {username: "testun2", password: "dc"};
	socket.emit("register", registerEntry);

    setTimeout(function(){
        test.equal(registrationResults, 1);
		registrationResults = null;
		test.done();
    }, 5000); 
};

// Login Tests
exports.loginBadUsernameTest = function(test) {
	test.expect(1);
	var loginEntry = {username: "badUser", password: "testpa1"};
	socket.emit("login", loginEntry);

    setTimeout(function(){
        test.equal(loginResults, false);
		loginResults = null;
		test.done();
    }, 5000); 
};

exports.loginBadPasswordTest = function(test) {
	test.expect(1);
	var loginEntry = {username: "testun1", password: "badPass"};
	socket.emit("login", loginEntry);

    setTimeout(function(){
        test.equal(loginResults, false);
		loginResults = null;
		test.done();
    }, 5000); 
};

exports.loginSuccessfullyTest = function(test) {
	test.expect(1);
	var loginEntry = {username: "testun1", password: "testpa1"};
	socket.emit("login", loginEntry);

    setTimeout(function(){
        test.equal(loginResults, true);
		loginResults = null;
		test.done();
    }, 5000); 
};

// Dissconnect and Reconnect Tests
exports.DissconnectReconnectAndLoginTest = function(test) {
	test.expect(1);
	var loginEntry = {username: "testun1", password: "testpa1"};
	socket.disconnect();

	setTimeout(function() 
	{
		socket.connect("http://localhost:3000");
		setTimeout(function() 
		{
			socket.emit("login", loginEntry);
			setTimeout(function()
			{
        		test.equal(loginResults, true);
				loginResults = null;
				test.done();
    		}, 5000);
		}, 5000)
	}, 2000);
};



