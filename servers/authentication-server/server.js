// requiring third party modules
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");

// setting up global variables
global.config = require(__dirname + "/config.json");
global.__home = __dirname;
global.db = mongojs(config.database.name, config.database.collections);
global.actions = {
    authenticate : require(__dirname + config.paths.authenticate),
    register : require(__dirname + config.paths.register),
    completeRegister : require(__dirname + config.paths.completeRegister),
    newPassword : require(__dirname + config.paths.newPassword),
    completeNewPassword : require(__dirname + config.paths.completeNewPassword)
};

// initialising server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// adding server event handlers
app.get("/authenticate", actions.authenticate);
app.post("/register", actions.register);
app.post("/completeRegister", actions.completeRegister);
app.post("/newPassword", actions.newPassword);
app.post("/completeNewPassword", actions.completeNewPassword);

// starting Server
app.listen(config.port);
