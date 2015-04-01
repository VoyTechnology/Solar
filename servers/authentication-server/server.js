// requiring third party modules
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");
var passwordHash = require('password-hash');
global.args = require("commander");

// setting up command line arguments parser
args.version(1.1);
args.option("-l, --local", "Use this if running all servers locally", false);
args.option("-p, --port [port]", "Port of the server, default 3001", 3001);
args.option("--rth [rth]", "How long a registratin token is valid in hours, default 5", 5);
args.option("--ltm [ltm]", "How long a login token is valid in minutes, default 5", 5);
args.parse(process.argv);

// setting up global variables
global.localhostMode = false;
global.config = require(__dirname + "/config.json");
global.__home = __dirname;
global.db = mongojs(config.database.name, config.database.collections);
global.nodemailer = nodeMailer;
global.passTool = passwordHash;
global.pendingRegisters = [];
global.pendingNewPasswords = [];
global.activeAuthenticateTokens = [];
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

// locating This machines IP address
require(__dirname + config.paths.ipFinder)();

// checking command line arguments to see if in localhostMode


// initialising server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));

// adding server event handlers
if (args.local) {
    app.get("/authenticate", actions.authenticate);
    app.get("/register", actions.register);
    app.get("/completeRegister", actions.completeRegister);
    app.get("/newPassword", actions.newPassword);
    app.get("/completeNewPassword", actions.completeNewPassword);
    app.get("/version", function(req,res){res.json({major:1,minor:1});res.end();});
}
else {
    app.post("/authenticate", actions.authenticate);
    app.post("/register", actions.register);
    app.post("/completeRegister", actions.completeRegister);
    app.post("/newPassword", actions.newPassword);
    app.post("/completeNewPassword", actions.completeNewPassword);
    app.get("/version", function(req,res){res.json({major:1,minor:1});res.end();});
}

// starting Server
app.listen(args.port);
console.log("Listening on port : " + args.port.toString());
