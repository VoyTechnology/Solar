// requiring third party modules
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");

// setting up global variables
global.config = require(__dirname + "/config.json");
global.__home = __dirname;
global.db = mongojs(config.database.name, config.database.collections);
global.nodemailer = nodeMailer;
global.pendingRegisters = [];
global.pendingNewPasswords = [];
global.actions = {
    authenticate : require(__dirname + config.paths.authenticate),
    register : require(__dirname + config.paths.register),
    completeRegister : require(__dirname + config.paths.completeRegister),
    newPassword : require(__dirname + config.paths.newPassword),
    completeNewPassword : require(__dirname + config.paths.completeNewPassword),
    parameterAnalyser : require(__dirname + config.paths.parameterAnalyser),
    responseEmitter : require(__dirname + config.paths.responseEmitter),
    mailer : new (require(__dirname + config.paths.emailEmitter))()
};

// initialising server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));

// adding server event handlers
app.get("/authenticate", actions.authenticate);
app.get("/register", actions.register);
app.get("/completeRegister", actions.completeRegister);
app.get("/newPassword", actions.newPassword);
app.get("/completeNewPassword", actions.completeNewPassword);

// starting Server
app.listen(config.port);
console.log("Listening on port : " + config.port.toString());
